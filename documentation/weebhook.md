# **Webhook Endpoint Documentation**

## **Overview**

This webhook endpoint allows a manager to send messages into an active conversation thread. The system retrieves conversation history from Redis, processes the manager's request using an AI agent, and returns an intelligent response with recommended actions.

---

## **Endpoint Details**

**URL:** `https://your-n8n-instance.com/webhook/fb936f07-b536-409f-a281-7f339f606bd6`

**Method:** `POST`

**Content-Type:** `application/json`

---

## **Request**

### **Headers**

Content-Type: application/json

### **Body Parameters**

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| `id` | string | Yes | The conversation thread ID (used to retrieve conversation from Redis) |
| `message` | string | Yes | The manager's message or instruction |

### **Example Request**

bash  
curl \-X POST https://your-n8n-instance.com/webhook/fb936f07-b536-409f-a281-7f339f606bd6 \\  
  \-H "Content-Type: application/json" \\  
  \-d '{  
    "id": "thread\_12345",  
    "message": "Please check which providers have the product and confirm if we can order."

  }'

json  
{  
  "id": "thread\_12345",  
  "message": "Please check which providers have the product and confirm if we can order."

}

---

## **What It Does**

1. **Receives Manager Input** \- Accepts the manager's message and thread ID  
2. **Saves to Redis** \- Stores the manager's message with role `manager` in the conversation history  
3. **Retrieves Context** \- Fetches the last 5-8 messages from the conversation using Redis  
4. **AI Processing** \- An AI agent analyzes the request and determines the appropriate action using available tools:  
   * `get_conversation` \- Retrieves conversation history  
   * `deal_with_providers` \- Handles supplier/logistics tasks  
   * `respond_to_customer` \- Creates customer responses  
   * `generate_invoice` \- Manages invoicing tasks  
5. **Generates Response** \- Creates a professional summary of actions taken  
6. **Saves AI Response** \- Stores the AI agent's response with role `ai_agent` in Redis  
7. **Returns Result** \- Sends back a clear message to the manager

---

## **Response**

### **Success Response**

**Status Code:** `200 OK`

**Content-Type:** `text/plain`

**Body:** Plain text message from the AI agent

### **Example Response**

I contacted the providers. Only Provider X has the stock available at 410€. Do you want me to proceed with the purchase?

### **Other Example Responses**

I've sent a follow-up email to the customer explaining the delay and providing an ETA of October 28th. They should receive it within the next few minutes.

The invoice \#INV-2025-1011 has been generated for 2,450€ and sent to the customer's email. Payment terms: Net 30 days.

I checked the stock levels. We have 15 units available but the customer requested 30\. Should I contact the supplier for the remaining 15 units or offer a partial shipment?

---

## **Response Format (Internal)**

The AI agent internally processes the request and returns a JSON structure (which is then converted to plain text for the webhook response):

json  
{  
  "message\_to\_manager": "Clear summary of what was done and next step suggestion"

}

---

## **Error Responses**

### **Missing Required Fields**

**Status Code:** `400 Bad Request`

json  
{  
  "error": "Missing required field: id or message"

}

### **Invalid Thread ID**

**Status Code:** `404 Not Found`

json  
{  
  "error": "Conversation thread not found"

}

---

## **Conversation Flow**

Manager sends message  
    ↓  
Message saved to Redis (role: manager)  
    ↓  
AI Agent retrieves conversation history  
    ↓  
AI Agent analyzes request and uses appropriate tools  
    ↓  
AI Agent generates response  
    ↓  
Response saved to Redis (role: ai\_agent)  
    ↓

Plain text response returned to manager

---

## **Use Cases**

### **1\. Check Provider Availability**

**Request:**

json  
{  
  "id": "thread\_12345",  
  "message": "Do we have any suppliers for Steel Rod DIN 2391?"

}

**Response:**

I found 2 suppliers with Steel Rod DIN 2391 in stock. Supplier A has 50 units at 12€/unit, Supplier B has 80 units at 11.50€/unit. Should I place an order?

### **2\. Send Customer Follow-up**

**Request:**

json  
{  
  "id": "thread\_12345",  
  "message": "Send a follow-up email to the customer about their order status"

}

**Response:**

I've sent a professional follow-up email to the customer explaining that their order is being processed and will ship by October 20th. They were also informed about the tracking number.

### **3\. Generate Invoice**

**Request:**

json  
{  
  "id": "thread\_12345",  
  "message": "Create an invoice for this order"

}

**Response:**

Invoice \#INV-2025-1011 has been generated for 3,250€ including all items discussed. The invoice has been sent to customer@example.com with payment terms Net 30\.

---

## **Notes**

* The endpoint uses **Redis** to store and retrieve conversation history  
* Each message is timestamped in ISO format  
* The AI agent has access to the conversation context and can make autonomous decisions  
* The system uses **Google Gemini** as the language model  
* Responses are professional and action-oriented

---

## **Integration Example (JavaScript/Frontend)**

javascript  
async function sendManagerMessage(threadId, message) {  
  const response \= await fetch('https://your-n8n-instance.com/webhook/fb936f07-b536-409f-a281-7f339f606bd6', {  
    method: 'POST',  
    headers: {  
      'Content-Type': 'application/json'  
    },  
    body: JSON.stringify({  
      id: threadId,  
      message: message  
    })  
  });  
    
  const aiResponse \= await response.text();  
  return aiResponse;  
}

*// Usage*  
const result \= await sendManagerMessage('thread\_12345', 'Check stock levels for product X');

console.log(result);

---

## **Rate Limiting**

* No explicit rate limits are configured  
* Recommended: Max 10 requests per minute per thread ID

---

## **Security Considerations**

* The webhook URL contains a unique identifier for security  
* Consider adding authentication headers in production  
* Validate thread IDs to prevent unauthorized access  
* Sanitize user input to prevent injection attacks

