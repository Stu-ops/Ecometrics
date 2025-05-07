from flask import Flask, request, jsonify
from flask_cors import CORS
import groq
import os
import requests

app = Flask(__name__)
CORS(app)

groq_client = groq.Client(api_key="[YOUR_API_KEY]")
def fetch_predicted_emission():
    try:
        response = requests.get("http://127.0.0.1:8000/predict", timeout=5)  
        if response.status_code == 200:
            data = response.json()
            prediction = data.get("prediction", [None])[0]  # Extract the first value from "prediction"
            return prediction
        else:
            return {"error": f"Failed to fetch predicted emission. Status code: {response.status_code}"}
    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to connect to the system: {str(e)}"}

def generate_chatbot_response(user_input, total_emission):
    if isinstance(total_emission, dict) and "error" in total_emission:
        return f"Sorry, I couldn't fetch your carbon footprint data. {total_emission['error']}"

    prompt = f"""
    You are a sustainability assistant helping a business reduce its carbon footprint. Here is the predicted total carbon emission:
    - Predicted Carbon Footprint: {total_emission} kg CO2

    The user asks: "{user_input}"

    Provide a detailed response with suggestions to reduce their carbon footprint.
    """

    response = groq_client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[{"role": "system", "content": prompt}],
        max_tokens=500
    )

    return response.choices[0].message.content.strip()

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    total_emission = fetch_predicted_emission()
    chatbot_response = generate_chatbot_response(user_input, total_emission)

    return jsonify({
        "response": chatbot_response,
    })

if __name__ == '__main__':
    app.run(debug=True)
