import weaviate  # Changed from vector_emb_test
from weaviate.classes.init import Auth
from weaviate.classes.config import Configure
import os

# Best practice: store your credentials in environment variables
weaviate_url = "xxxxxxxxxx.europe-west3.gcp.weaviate.cloud"
weaviate_api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

client = weaviate.connect_to_weaviate_cloud(  # Changed from vector_emb_test
    cluster_url=weaviate_url,  # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(weaviate_api_key),  # Replace with your Weaviate Cloud key
)

questions = client.collections.create(
    name="Question",
    vector_config=Configure.Vectors.text2vec_weaviate(),  # Configure the Weaviate Embeddings integration
)

print("Collection created:", questions)

client.close()  # Free up resources