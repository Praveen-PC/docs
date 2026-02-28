from passlib.context import CryptContext
from jose import jwt,JWTError
from datetime import datetime,timedelta
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app import models



SECRET_KEY="HH3893894uhgurgu39398988f8u48U998393JRYEREIRE3849jiefi"
ALGORITHM="HS256"


ACCESS_EXPIRE_MINUTES=15
REFRESH_EXPIRE_DAYS=7


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")


pwd_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__rounds=10,  # slightly faster
    deprecated="auto"
)


def hash_password(password:str):
    password = password.encode("utf-8")[:72]
    return pwd_context.hash(password)

def verify_password(plain_password:str,hashed_password:str):
    plain_password = plain_password.encode("utf-8")[:72]
    return pwd_context.verify(plain_password,hashed_password)

def create_access_token(user_id:int):
    playload={
        "sub":str(user_id),
        "type":"access",
        "exp":datetime.utcnow()+timedelta(minutes=ACCESS_EXPIRE_MINUTES)
    }
    return jwt.encode(playload,SECRET_KEY,algorithm=ALGORITHM)

def create_refresh_token(user_id:int):
    payload={
        "sub":str(user_id),
        "type":"refresh",
        "exp":datetime.utcnow()+timedelta(days=REFRESH_EXPIRE_DAYS)
    }
    return jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)

def decode_token(token:str):
    try:
        return jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
    except JWTError:
        return None
    
    


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = decode_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token type")

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(models.Users).filter(models.Users.id == int(user_id)).first()

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user