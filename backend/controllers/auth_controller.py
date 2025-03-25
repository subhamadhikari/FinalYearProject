from fastapi import APIRouter,HTTPException,status,Response,Depends,status
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from schemas.user_schema import UserSchema,UserResponseSchema

from db.configurations import SessionLocal,engine,Base

from models.user import User

from utils.auth_utils import encrypt_pass,create_access_token,verify_pass,GetCurrentUser

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

db_gen = db_session()
db = next(db_gen)
current_user = GetCurrentUser(db)

@router.post("/register")
def register(user:UserSchema,session:Session = Depends(db_session)):
    # hash_password,salt = encrypt_pass(user.password)
    print("new?")
    try:
        hash_password,salt = encrypt_pass(user.password)
        new_user = User(salt=salt,encryptPassword=hash_password,email = user.email,
                        phoneNumber=user.phoneNumber,userFirstName=user.userFirstName,userLastName=user.userLastName,
                        userRole=user.userRole,userDOB=user.userDOB,hospitalID=user.hospitalID)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
    except SQLAlchemyError as e:
        print(f" errorxxx : {e.__dict__['orig']}")
        return {"message":"User creation failed!","status":500,"error":f"{e.__dict__['orig']}"}
    return {"message":"user created successfully","status":200}

@router.post("/login")
def login(user:OAuth2PasswordRequestForm = Depends(),session:Session = Depends(db_session)):
    statement = select(User).filter_by(email=user.username)
    db_user = session.scalars(statement).all()

    if(len(db_user) == 0) :
        print("User does not exist")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User could not be found !"
        )
    else:
        db_user = db_user[0]
    isValidUser = verify_pass(db_user.encryptPassword,user.password,db_user.salt)

    if not isValidUser:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email or password is incorrect"
        )
    
    return {
        "status_code":status.HTTP_200_OK,
        "access_token":create_access_token(db_user.email),
        "token_type":"Bearer",
        "role":db_user.userRole
    }

@router.get('/getCurrentUser', summary='Get details of currently logged in user',response_model=UserResponseSchema)
async def get_current_user(user:UserResponseSchema = Depends(current_user)):
    if user:
        
        return user
    else:
        print("hello")
        raise HTTPException(status_code=404, detail="User not found")