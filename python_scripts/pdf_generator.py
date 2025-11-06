import requests, json

def main():
    api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    template_id = "a2977b23e032eb24"

    data = {
  "receiver_name": "John Smith",
  "receiver_address1": "123 Main St",
  "receiver_address2": "New York, NY 10001",
  "latlong": "N/A",
  "invoice_no": "INV-54821",
  "date": "10/12/2025",
  "items": [
    {
      "item_name": "Laptop",
      "unit_price": 800,
      "unit": 2,
      "total": 1600
    },
    {
      "item_name": "Mouse",
      "unit_price": 20,
      "unit": 3,
      "total": 60
    }
  ],
  "account_no": "N/A",
  "account_name": "Tech Store",
  "bnk_name": "N/A",
  "terms": "Payment due within 30 days",
  "conditions": "Standard terms and conditions apply"
}

    response = requests.post(
        F"https://rest.apitemplate.io/v2/create-pdf?template_id={template_id}",
        headers = {"X-API-KEY": F"{api_key}"},
        json= data
    )

    print(response.status_code)
    print(response.text)

if __name__ == "__main__":
    main()
