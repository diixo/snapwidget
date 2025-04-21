
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import uuid


app = FastAPI()

def is_valid_key(hostname: str, key: str) -> True:
    #UUID4 = (8,4,4,4,12)
    my_secret_namespace = uuid.UUID("12345678-1234-5678-1234-567812345678")
    client_id = uuid.uuid5(my_secret_namespace, hostname)
    print(hostname, str(client_id))
    return (str(client_id) == key)


origins = [
    "http://localhost:3400",
    "http://127.0.0.1:3400",
    "null",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/static", StaticFiles(directory="static"), name="static")


class Query(BaseModel):
    query: str


class QueryMsg(BaseModel):
    message: str


@app.post("/api/search")
async def search(q: Query):
    print(f"search query: {q.query}")
    return {"results": [f"Result for: {q.query}"]}


@app.post("/api/chat")
async def chat_endpoint(request: Request, payload: QueryMsg):

    api_key = request.headers.get("pub-api-key")
    origin = request.headers.get("origin")

    msg_text = payload.message
    client_ip = request.client.host

    if origin is None or origin == "null":
        origin = "localhost"

    is_valid = is_valid_key(hostname=origin, key=api_key)

    if is_valid:
        print(f"api_key={api_key}, msg={msg_text}, origin={origin}, ip={client_ip}")

        return {"response": [
            f">> {msg_text}. Talk is cheap. Show me the code.",
            f"key-authorization={str(is_valid)}"
            ]}
