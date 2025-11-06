import requests

url = "https://hackathon25k.app.n8n.cloud/webhook-test/fb936f07-b536-409f-a281-7f339f606bd6"
data = {"id": "199d52248a3239b5", "message": "ok, can you please contact the providers. thanks! and find the best deals"}

response = requests.get(url, json=data)
print(response.status_code)
print(response.text)