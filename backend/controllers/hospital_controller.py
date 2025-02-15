from fastapi import APIRouter,HTTPException,status,Response,Depends,status
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select

from db.configurations import SessionLocal,engine,Base
from models.hospital import Hospital
from schemas.hospital_schema import HospitalInfo

from typing import List

router = APIRouter(
    prefix='/api/hospital',
    tags=["Hospital"]
)

def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@router.get("/getAllHospitals",response_model=List[HospitalInfo])
async def get_all_hospitals(session:Session = Depends(db_session)):
    query = select(Hospital)
    results = session.execute(query).scalars().all()
    return [HospitalInfo.model_validate(hospital, from_attributes=True) for hospital in results]
    # return [hospital for hospital in results]


