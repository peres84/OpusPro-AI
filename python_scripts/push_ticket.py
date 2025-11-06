import requests
import datetime

url = "https://hackathon25k.app.n8n.cloud/webhook-test/030cadf5-25de-4ae5-aaf8-12843a021463"
data = {"ticket_id": "1235445", "status": "delete", "time": datetime.datetime.now().isoformat()}

response = requests.get(url, json=data)
print(response.status_code)
print(response.text)