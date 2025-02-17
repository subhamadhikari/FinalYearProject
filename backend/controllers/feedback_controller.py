from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select, insert

from db.configurations import SessionLocal
from models.feedback import Feedback
from schemas.feedback_schema import FeedbackSchema
from schemas.segmentation_schema import SegmentationSchema

from utils.segmentation_utils import save_segmentation_result

from typing import List

router = APIRouter(
    prefix='/api/feedback',
    tags=["Feedback"]
)

def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@router.post("/createFeedback")
async def create_feedback(feedback:FeedbackSchema,session:Session = Depends(db_session)):
    try:
        # new_feedback = Feedback(feedbackContent = feedback.feedbackContent,feedbackTumorSeverity=feedback.feedbackTumorSeverity,feedbackDate="2025-02-16")
        feedback_data = {
            'feedbackContent': feedback.feedbackContent,
            'feedbackTumorSeverity': feedback.feedbackTumorSeverity,
            'feedbackDate': "2025-02-16"  # Consider using datetime.now() for current date
        }

        # Use the insert function with the Feedback model's __table__ attribute
        query = insert(Feedback.__table__).values(feedback_data)
        # compiled_query = query.compile()
        result = session.execute(query)
        session.commit()


        feedbackPK = result.inserted_primary_key[0]
        segmentation = SegmentationSchema(doctorID=feedback.doctorID,patientID=feedback.patientID,segmentationMRI=feedback.segmentationMRI)
        # session.add(new_feedback)
        await save_segmentation_result(segmentation,feedbackPK,session)


    except Exception as e:
        print(f" errorxxx : {e.__dict__['orig']}")
        return {"message":"Feedback creation failed!","status":500,"error":f"{e.__dict__['orig']}"}
    return {"message":"feedback created successfully","status":200}
    
