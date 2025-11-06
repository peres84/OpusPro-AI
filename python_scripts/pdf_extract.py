import requests
import json

url = 'https://api.va.landing.ai/v1/tools/agentic-document-analysis'

# Upload a PDF file
files = {'pdf': open('document_test.pdf', 'rb')}
print(files)
# Form data
data = {
    'include_marginalia': 'true',
    'include_metadata_in_markdown': 'true',
    'enable_rotation_detection': 'false',
    'fields_schema': json.dumps({
        'type': 'object',
        'properties': {
            'field1': {'type': 'string'},
            'field2': {'type': 'string'}
        },
        'required': ['field1', 'field2']
    })
}

headers = {
    'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
}

response = requests.post(url, files=files, data=data, headers=headers)
print(response.json())
