from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from db.configurations import SessionLocal

from models.user import User
from schemas.user_schema import PatientSchema

from typing import List



def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

router = APIRouter(
    prefix='/api/user',
    tags=["User"]
)


@router.get("/getAllPatients/{hospitalID}",response_model = List[PatientSchema])
async def get_all_patients(hospitalID:int,session:Session = Depends(db_session)):
    query = select(User).where(User.userRole==2,User.hospitalID==hospitalID)
    results = session.execute(query).scalars().all()
    return [PatientSchema.model_validate(hospital, from_attributes=True) for hospital in results]