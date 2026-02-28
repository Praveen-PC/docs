

# import requests
# import os

# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# def generate_response(message: list):

#     url = "https://api.groq.com/openai/v1/chat/completions"

#     headers = {
#         "Authorization": f"Bearer {GROQ_API_KEY}",
#         "Content-Type": "application/json"
#     }

#     payload = {
#         "model": "llama-3.1-8b-instant",
#         "messages": [
#             {"role": "user", "content": message}
#         ]
#     }

#     response = requests.post(url, headers=headers, json=payload)

#     # print("Status Code:", response.status_code)
#     # print("Response:", response.text)

#     if response.status_code != 200:
#         return f"Groq Error: {response.text}"

#     data = response.json()

#     if "choices" not in data:
#         return f"Unexpected Response: {data}"

#     return data["choices"][0]["message"]["content"]








# # import requests
# # import os
# # from dotenv import load_dotenv

# # load_dotenv()

# # OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
# # MODEL = os.getenv("OPENROUTER_MODEL")
# # APP_URL = os.getenv("APP_URL")


# # def generate_response(user_message: str):

# #     url = "https://openrouter.ai/api/v1/chat/completions"

# #     headers = {
# #         "Authorization": f"Bearer {OPENROUTER_API_KEY}",
# #         "Content-Type": "application/json",
# #         "HTTP-Referer": APP_URL,
# #         "X-Title": "My FastAPI App"
# #     }

# #     payload = {
# #         "model": MODEL,
# #         "messages": [
# #             {"role": "system", "content": "You are a helpful AI assistant."},
# #             {"role": "user", "content": user_message}
# #         ]
# #     }

# #     response = requests.post(url, headers=headers, json=payload)

# #     if response.status_code != 200:
# #         return f"Error: {response.text}"

# #     data = response.json()

# #     return data["choices"][0]["message"]["content"]




import requests
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def generate_response(messages: list):

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": messages
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        return f"Groq Error: {response.text}"

    data = response.json()

    return data["choices"][0]["message"]["content"]