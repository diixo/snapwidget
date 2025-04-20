
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")


class Query(BaseModel):
    query: str

class QueryMsg(BaseModel):
    message: str


@app.post("/api/search")
def search(q: Query):
    print(f"search query: {q.query}")
    return {"results": [f"Result for: {q.query}"]}


@app.post("/api/chat")
def chat(q: QueryMsg):
    print(f"chat query: {q.message}")
    return {"response": f">> {q.message}"}
