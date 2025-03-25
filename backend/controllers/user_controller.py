from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select, distinct

from db.configurations import SessionLocal

from models.user import User
from models.doc_patient_segmentation import SegmentationAssociation
from models.hospital import Hospital
from models.feedback import Feedback
from models.segmentation import Segmentation
from schemas.user_schema import PatientSchema,RecentPatient
from models.doctor_affiliation import DoctorAffiliation

from typing import List, Dict
import datetime as dt



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

# get all patients from all hospitals for a doctor
# @router.get("/getallpatients/{doctorID}",response_model = List[PatientSchema])
@router.get("/getallpatients/{doctorID}",response_model=List[PatientSchema])
async def get_all_patients(doctorID:int,session:Session = Depends(db_session)):
    # query = select(User).where(User.userRole==2,User.hospitalID==hospitalID)
    query = select(DoctorAffiliation.hospitalID).where(DoctorAffiliation.doctorID==doctorID)
    results = session.execute(query).scalars().all()
    ids_to_select = results
    patients = session.query(User).filter(User.userID.in_(ids_to_select)).all()
    print(type(patients))
    return patients

@router.get("/getPatientAgeDistribution/{doctorID}",response_model = Dict[str,int] )
async def get_patient_age_dist(doctorID:int,session:Session = Depends(db_session)):
    query = select(distinct(SegmentationAssociation.patientID),User.userDOB).where(SegmentationAssociation.doctorID == doctorID)\
            .join(User,User.userID == SegmentationAssociation.patientID)
    results = session.execute(query).all()
    ages = []
    for _,dob in results:
        age = dt.datetime.now().year - dob.year
        ages.append(age)
    
    age_distribution = {
        "below_20":0,
        "above_60":0,
        "bet_20_40":0,
        "bet_40_60":0
    }
    for age in ages:
        if age < 20:
            age_distribution["below_20"] += 1
        elif age >= 20 and age < 40:
            age_distribution["bet_20_40"] += 1
        elif age >= 40 and age < 60:
            age_distribution["bet_40_60"] += 1
        else:
            age_distribution["above_60"] += 1
    
    age_distribution = {key:(value/len(ages))*100 for key,value in age_distribution.items()}
    print(age_distribution)
    return age_distribution


@router.get("/getDoctorsPatient/{doctorID}",response_model=List[RecentPatient])
async def get_doctors_patient(doctorID:int,session:Session = Depends(db_session)):
    query = select(distinct(User.email),User.userID,Segmentation.segmentationMRI,Feedback.feedbackID,User.userFirstName,User.userLastName,User.userDOB,Feedback.feedbackTumorSeverity,Hospital.hospitalName)\
            .select_from(SegmentationAssociation)\
            .join(Segmentation,Segmentation.segmentationID==SegmentationAssociation.segmentationID)\
            .join(Feedback,Feedback.feedbackID==Segmentation.feedbackID)\
            .join(User,User.userID==SegmentationAssociation.patientID)\
            .join(Hospital,User.hospitalID==Hospital.hospitalID)\
            .where(SegmentationAssociation.doctorID==doctorID)
    results = session.execute(query).all()

    patients = [
        {
            "email": row[0],
            "userID": row[1],
            "segmentationMRI": row[2],
            "feedbackID": row[3],
            "fullName": row[4] + " "+ row[5],
            "age": dt.datetime.now().year - row[6].year,
            "tumorSeverity": row[7],
            "hospitalName":row[8]
        }
        for row in results
    ]
    print(patients)
    print(results)
    return patients
    