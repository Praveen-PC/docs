from fastapi import FastAPI
from .database import engine,Base
from . import models
from .routes import user ,model
from fastapi.middleware.cors import CORSMiddleware

from .services import llm_services

app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],        # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base.metadata.create_all(bind=engine)
app.include_router(user.router)
app.include_router(model.router)

@app.get("/")
def home():
    return {"message":"hello from backend"} 