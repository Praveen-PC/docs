from app.services.llm_services import generate_response
from app.schemas import chatRequest ,promptResquest
from fastapi import APIRouter,Depends, HTTPException
from ..database import get_db
from .. import models
from ..security import get_current_user
from sqlalchemy.orm import Session
from typing import List
from ..schemas import promptResponse,promptResquest, UserBase,UserCreate,UserLogin,UserResponse

router = APIRouter(prefix="/model", tags=["Model"])


@router.post("/getdata")
def get_model_data(
    data: promptResquest,
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(get_current_user),
):
    
    
    
    
    print("current_user",current_user)
    # 1️⃣ Create chat if not exists
    if not data.chat_id:
        new_chat = models.Chat(
            user_id=current_user.id,
            mode=data.mode
        )
        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)
        chat_id = new_chat.id
    else:
        chat_id = data.chat_id

    # 2️⃣ Save user message
    user_message = models.Message(
        chat_id=chat_id,
        role="user",
        content=data.content
    )
    db.add(user_message)
    db.commit()
    
    messages=(db.query(models.Message)
              .filter(models.Message.chat_id==chat_id)
              .order_by(models.Message.created_at.asc())
              .all())
    
    conversation=[]
    
    for msg in messages:
        conversation.append({
             "role": msg.role,
            "content":msg.content
        })

    # 3️⃣ Call LLM
    try:
        llm_reply = generate_response(conversation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # 4️⃣ Save assistant message
    assistant_message = models.Message(
        chat_id=chat_id,
        role="assistant",
        content=llm_reply
    )
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)

    # 5️⃣ Return response to frontend
    return {
        "chat_id": chat_id,
        "role": "assistant",
        "content": llm_reply
    }
    
    
# @router.get('/gethistory',response_model=List[promptResponse])
# def chat_history(db:Session=Depends(get_db)):
    
#     data=db.query(models.Message).all()
#     return data





@router.get("/gethistory")
def chat_history(
    db: Session = Depends(get_db),
    current_user: models.Users = Depends(get_current_user),
):

    chats = (
        db.query(models.Chat)
        .filter(models.Chat.user_id == current_user.id)
        .order_by(models.Chat.created_at.desc())
        .all()
    )

    result = []

    for chat in chats:
        # First user message
        first_user = (
            db.query(models.Message)
            .filter(
                models.Message.chat_id == chat.id,
                models.Message.role == "user"
            )
            .order_by(models.Message.created_at.asc())
            .first()
        )

        # First assistant message
        first_assistant = (
            db.query(models.Message)
            .filter(
                models.Message.chat_id == chat.id,
                models.Message.role == "assistant"
            )
            .order_by(models.Message.created_at.asc())
            .first()
        )

        result.append({
            "chat_id": chat.id,
            "mode": chat.mode,
            "first_question": first_user.content if first_user else None,
            "first_answer": first_assistant.content if first_assistant else None,
            "created_at": chat.created_at
        })

    return result


@router.get('/getchat/{chat_id}')
async def get_specificChat(chat_id: int, db: Session = Depends(get_db)):
    data = db.query(models.Message).filter(models.Message.chat_id == chat_id).all()
    return data


@router.delete("/delete/{chat_id}")
def delete_chat(chat_id: int, db: Session = Depends(get_db)):

    chat = db.query(models.Chat).filter(models.Chat.id == chat_id).first()

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    db.query(models.Message).filter(models.Message.chat_id == chat_id).delete()
    db.delete(chat)

    db.commit()

    return {"message": "Chat deleted successfully"}