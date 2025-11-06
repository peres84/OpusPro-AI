import requests
import json

# Your webhook URL
webhook_url = "https://76cdcf1e40f5.ngrok-free.app/webhook"

# Request payload
payload = {
    "query": "motor",
    "limit": 2
}

# Headers
headers = {
    "Content-Type": "application/json"
}

try:
    # Make the POST request
    response = requests.post(webhook_url, json=payload, headers=headers)
    
    # Print status and response details for debugging
    print("Status Code:", response.status_code)
    print("Response Headers:", dict(response.headers))
    print("Response Text:", response.text)
    
    # Check if request was successful
    if response.status_code == 200:
        print("Success! Response:", response.json())
    else:
        print(f"Error: {response.status_code} - {response.text}")
    
except requests.exceptions.RequestException as e:
    print(f"Error making request: {e}")