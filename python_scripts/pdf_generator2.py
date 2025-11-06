import requests

url = "https://hackathon25k.app.n8n.cloud/webhook-test/generate-invoice"
payload = {
    "conversation": "Customer wants 2 laptops at $800 each. Ship to John Smith, 123 Main St, New York, NY 10001."
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print("Status code:", response.status_code)
print("Response:", response.text)