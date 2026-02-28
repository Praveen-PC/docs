from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Shared fields
class UserBase(BaseModel):
    name: str
    email: EmailStr


# Client sends during signup
class UserCreate(UserBase):
    password: str


# Client sends during login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Response returned to frontend (SAFE)
class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# Response returned to llm chat
# class chatRequest(BaseModel):
#     message:str
#     model:str
    


class chatRequest(BaseModel):
    mode:str
    
class chatResponse(chatRequest):
    id:int
    
    class Config:
        from_attributes=True
    
    
class promptResquest(BaseModel):
    chat_id:int |None =None
    content:str
    mode: str | None = "normal"
    
class promptResponse(promptResquest):
    id:int
    chat_id:int
    role:str
    content:str
    created_at:datetime
    class Config:
        from_attributes=True