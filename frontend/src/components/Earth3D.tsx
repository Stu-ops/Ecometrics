
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';

const Earth3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ text: string; position: { x: number; y: number } } | null>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 2;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Create Earth
    const textureLoader = new THREE.TextureLoader();
    
    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Placeholder material until texture loads
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
      specular: 0xffffff,
      shininess: 10
    });
    
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);
    
    // Load and apply earth texture
    textureLoader.load(
      'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg',
      (texture) => {
        earthMesh.material = new THREE.MeshPhongMaterial({
          map: texture,
          specular: new THREE.Color(0x333333),
          shininess: 5
        });
      }
    );
    
    // Create cloud layer
    const cloudGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      alphaMap: textureLoader.load('https://threejs.org/examples/textures/earth_clouds.jpg'),
      transparent: true,
      opacity: 0.4
    });
    
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);
    
    // Add emission hotspots with data
    const emissionData = [
      { position: new THREE.Vector3(0.8, 0.6, 0.6), region: "North America", emissions: 5.3, color: 0xff5500 },    
      { position: new THREE.Vector3(-0.7, 0.6, 0.6), region: "Europe", emissions: 6.8, color: 0xff0000 },   
      { position: new THREE.Vector3(-0.2, 0.6, -0.9), region: "Asia", emissions: 7.2, color: 0xff0000 },  
      { position: new THREE.Vector3(-0.3, -0.9, 0.1), region: "Australia", emissions: 4.2, color: 0xff8800 },  
      { position: new THREE.Vector3(0.1, -0.4, -0.9), region: "Africa", emissions: 2.3, color: 0xffcc00 },  
      { position: new THREE.Vector3(0.2, -0.6, 0.8), region: "South America", emissions: 3.1, color: 0xff8800 },  
    ];
    
    const hotspots: THREE.Mesh[] = [];
    
    emissionData.forEach(data => {
      const hotspotGeometry = new THREE.SphereGeometry(0.03, 32, 32);
      const hotspotMaterial = new THREE.MeshBasicMaterial({ 
        color: data.color,
        transparent: true,
        opacity: 0.7
      });
      
      const hotspot = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
      hotspot.position.copy(data.position);
      // Add emission data as a property to the mesh for raycasting
      hotspot.userData = { 
        region: data.region, 
        emissions: data.emissions,
        displayText: `${data.region}: ${data.emissions} tons CO₂ per capita`
      };
      
      earthMesh.add(hotspot);
      hotspots.push(hotspot);
      
      // Add pulse animation
      const pulseAnimation = () => {
        hotspot.scale.set(1, 1, 1);
        new TWEEN.Tween(hotspot.scale)
          .to(new THREE.Vector3(2, 2, 2), 2000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start()
          .onComplete(() => {
            new TWEEN.Tween(hotspot.scale)
              .to(new THREE.Vector3(1, 1, 1), 2000)
              .easing(TWEEN.Easing.Quadratic.In)
              .start()
              .onComplete(pulseAnimation);
          });
      };
      
      pulseAnimation();
    });
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
    
    // Setup raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectedObject: THREE.Mesh | null = null;
    
    const onMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      // Calculate mouse position in normalized device coordinates
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / mountRef.current.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / mountRef.current.clientHeight) * 2 + 1;
      
      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);
      
      // Get intersected objects (hotspots)
      const intersects = raycaster.intersectObjects(hotspots);
      
      // Handle hover state
      if (intersects.length > 0) {
        if (intersectedObject !== intersects[0].object) {
          if (intersectedObject) {
            // Reset previous hover
            const prevMaterial = intersectedObject.material as THREE.MeshBasicMaterial;
            prevMaterial.opacity = 0.7;
          }
          
          // Set new hover
          intersectedObject = intersects[0].object as THREE.Mesh;
          const material = intersectedObject.material as THREE.MeshBasicMaterial;
          material.opacity = 1.0;
          
          // Show tooltip
          setTooltip({
            text: intersectedObject.userData.displayText,
            position: { 
              x: event.clientX, 
              y: event.clientY 
            }
          });
          
          controls.autoRotate = false;
        }
      } else {
        if (intersectedObject) {
          // Reset previous hover when not hovering any hotspot
          const material = intersectedObject.material as THREE.MeshBasicMaterial;
          material.opacity = 0.7;
          intersectedObject = null;
          setTooltip(null);
          controls.autoRotate = true;
        }
      }
    };
    
    const onClick = () => {
      if (intersectedObject) {
        console.log('Clicked on:', intersectedObject.userData);
        // In a real app, this could open a detailed view or perform some action
      }
    };
    
    // Add event listeners
    mountRef.current.addEventListener('mousemove', onMouseMove);
    mountRef.current.addEventListener('click', onClick);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      controls.update();
      
      // Rotate clouds
      cloudMesh.rotation.y += 0.0005;
      
      // Update TWEEN
      TWEEN.update();
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', onMouseMove);
        mountRef.current.removeEventListener('click', onClick);
      }
      
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Dispose resources
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mountRef} className="w-full h-full" />
      {tooltip && (
        <div 
          className="absolute bg-black/80 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-50"
          style={{ 
            left: tooltip.position.x + 10, 
            top: tooltip.position.y - 30,
            transform: 'translateZ(0)'
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default Earth3D;
