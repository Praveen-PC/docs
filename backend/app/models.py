from sqlalchemy import Column , Integer , String , Boolean ,DateTime
from .database import Base ,engine
from datetime import datetime

from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import relationship


class Users(Base):
    
    __tablename__="users"
    
    id = Column(Integer,index=True, primary_key=True)
    name =Column(String,nullable=False)
    email =Column (String , unique =True ,nullable=False)
    password= Column(String,nullable=False)
    
    refresh_token = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    
    created_at=Column(DateTime,default=datetime.utcnow)
    

class Document(Base):

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    user = relationship("Users", backref="documents")
    


class Chat(Base):

    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mode = Column(String, nullable=False)  
    created_at = Column(DateTime, default=datetime.utcnow)
    
    
    user = relationship("Users", backref="chats")
    
    
class Message(Base):

    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id", ondelete="CASCADE"))
    role = Column(String, nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    chat = relationship("Chat", backref="messages")