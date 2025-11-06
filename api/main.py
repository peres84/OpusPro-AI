from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import weaviate
from weaviate.classes.init import Auth

app = FastAPI()

# Weaviate configuration
weaviate_url = "xxxxxxxxxx.europe-west3.gcp.weaviate.cloud"
weaviate_api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"


@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}

@app.post("/webhook")
async def webhook(request: Request):
    # Try to get data from JSON body first, fall back to query parameters
    try:
        data = await request.json()
        query_text = data.get('query', 'motor')
        limit = int(data.get('limit', 2))
    except:
        # If no JSON body, use query parameters
        query_text = request.query_params.get('query', 'motor')
        limit = int(request.query_params.get('limit', 2))

    client = weaviate.connect_to_weaviate_cloud(
        cluster_url=weaviate_url,
        auth_credentials=Auth.api_key(weaviate_api_key),
    )

    questions = client.collections.use("Inventory_products")
    response = questions.query.near_text(
        query=query_text,
        limit=limit
    )

    results = [obj.properties.get('inv_id') for obj in response.objects]
    client.close()

    return JSONResponse({'inv_ids': results})

# To run: uvicorn webhook_test:app --reload --host 0.0.0.0 --port 5000
