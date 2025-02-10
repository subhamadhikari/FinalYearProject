from fastapi import APIRouter,HTTPException,status,Response,Depends
from fastapi.responses import JSONResponse
from fastapi.requests import Request

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from schemas.user_schema import UserSchema

from db.configurations import SessionLocal,engine,Base

from models.user import User

def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

router = APIRouter(
    prefix='/api/auth',
    tags=["Authentication"]
)

@router.post("/register")
def register(user:UserSchema,session:Session = Depends(db_session)):
    # hash_password,salt = encrypt_pass(user.password)
    print("new?")
    try:
        new_user = User(salt="s",encryptPassword=user.password,email = user.email,
                        phoneNumber=user.phoneNumber,userFirstName=user.userFirstName,userLastName=user.userLastName)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
    except SQLAlchemyError as e:
        print(f" errorxxx : {e.__dict__['orig']}")
        return {"message":"User creation failed!","status":500,"error":f"{e.__dict__['orig']}"}
    return {"message":"user created successfully","status":200}