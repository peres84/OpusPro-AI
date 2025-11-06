import requests

url = "https://hackathon25k.app.n8n.cloud/webhook-test/8a0daf5a-6a19-4f4a-b851-a5b9cc138b01"
data = {"id": "199d325c7411df5b", "message": "what we talked about last time"}

response = requests.get(url, json=data)
print(response.status_code)
print(response.text)