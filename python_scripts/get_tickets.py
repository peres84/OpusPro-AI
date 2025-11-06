import requests

url = "https://hackathon25k.app.n8n.cloud/webhook/41fb634a-1e20-496e-8664-6105b05ae638"

response = requests.get(url)
print(response.status_code)
print(response.text)
