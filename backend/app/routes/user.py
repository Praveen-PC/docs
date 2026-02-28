from fastapi import APIRouter,Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
from typing import List
from ..security import hash_password ,verify_password,create_access_token,create_refresh_token,decode_token

from ..schemas import UserBase,UserCreate,UserLogin,UserResponse


router=APIRouter(prefix='/user',tags=["User"])

# post apidb.
@router.post("/signup",response_model=UserResponse)
def create_User(user:UserCreate,db:Session=Depends(get_db)):
    
    checkUser=db.query(models.Users).filter(models.Users.email==user.email).first()
     
    if checkUser:
        raise HTTPException(status_code=400, detail="User already present")
    
    else:
        new_user=models.Users(
            name=user.name,
            email=user.email,
            password=hash_password(user.password),  
            )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    
    return new_user

# getall data api

@router.get("/",response_model=List[UserResponse])
def all_data(db:Session=Depends(get_db)):
    
    data=db.query(models.Users).all()
    return data




# delete api
@router.delete('/{user_id}')
def remove_user(user_id:int,db:Session=Depends(get_db)):
    
    isUser=db.query(models.Users).filter(models.Users.id==user_id).first()
    
    if not isUser:
        raise HTTPException(status_code=404,detail="user not found")
    
    db.delete(isUser)
    db.commit()
    
    return {"message":"user deleted"}


# login api

@router.post('/login')
def login(user:UserLogin, db:Session=Depends(get_db)):

    isUser = db.query(models.Users).filter(models.Users.email==user.email).first()

    if not isUser or not verify_password(user.password, isUser.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(isUser.id)
    refresh_token = create_refresh_token(isUser.id)

    isUser.refresh_token = refresh_token
    db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "name":isUser.name,
        "email":isUser.email,
        "id":isUser.id,
        "is_active":isUser.is_active
        
    }


@router.post("/refresh")
def refresh_token(refresh_token: str, db: Session = Depends(get_db)):

    payload = decode_token(refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user_id = int(payload.get("sub"))

    user = db.query(models.Users).filter(models.Users.id == user_id).first()

    if not user or user.refresh_token != refresh_token:
        raise HTTPException(status_code=401, detail="Token revoked")

    new_access = create_access_token(user.id)

    return {"access_token": new_access}



