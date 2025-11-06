import requests

url = "https://hackathon25k.app.n8n.cloud/webhook/d61b018f-06e4-428d-accf-ffc0d43dcc46"
data = {"ticket_id": "199d52248a3239b5"}

response = requests.post(url, json=data)
print(response.status_code)
print(response.text)
