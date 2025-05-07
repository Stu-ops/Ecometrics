import requests
# --- Step 1: Process User Input ---
def process_user_input(raw_input):
    return raw_input.strip().lower()
# --- Step 2: Define the Additional Context ---
def get_additional_context(No_of_recommendations="5"):
    text="""You are an environmental consultant specializing in sustainability and carbon footprint reduction. Your task is to generate {NO_of_recommendation} personalized recommendations to help the user lower their carbon footprint.please generate a ranked list of recommendations.
Guidelines:
            Consider key areas such as transportation, energy use, diet, consumption habits, and waste management.
            Prioritize practical, impactful, and achievable suggestions based on the user's footprint level.
            Provide a brief explanation for each recommendation, including estimated CO₂ savings when possible.
            Ensure that the advice is actionable and realistic for different lifestyles and budgets.
            Keep the tone encouraging and informative rather than judgmental."""
    return text
# --- Step 3: Build the Structured Query ---
def build_query(user_input, additional_text):
    query = (f"The user has an annual carbon footprint of {user_input} metric tons of CO₂. \n"
             f"{additional_text}")
    return query
API_ENDPOINT = "https://api.groq.com/v1/generate" 
API_KEY = "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" 

def call_llm_api(prompt):
    payload = {
        "model": "mistral-saba-24b",
        "prompt": prompt,
        "max_tokens": 150,
        "temperature": 0.6
    }
    headers = {"Authorization": f"Bearer {API_KEY}"}
    response = requests.post(API_ENDPOINT, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API call failed: {response.status_code} {response.text}")

def recommendation_workflow(raw_user_input, times):
    user_input = process_user_input(raw_user_input)
    additional_text = get_additional_context(times)
    prompt = build_query(user_input, additional_text)
    print("Generated Prompt:")
    print(prompt)
    response = call_llm_api(prompt)
    return response

if __name__ == "__main__":
    user_query = "" #  please make sure to enter here co2 emission by the user in metric tons.
    times = ""  # please make sure to enter here the number of recommendations you want.
    try:
        if int(times) <= 0:
            raise ValueError("Please enter a valid number of recommendations.")
        
        # Call the workflow function with the validated integer.
        recommendation_response = recommendation_workflow(user_query, times)
        print("\nRecommendation Response:")
        print(recommendation_response)
    except ValueError as ve:
        print("Error:", ve)
    except Exception as e:
        print("Error:", e)

