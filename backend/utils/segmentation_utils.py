
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import insert

from db.configurations import SessionLocal
from models.segmentation import Segmentation
from models.doc_patient_segmentation import SegmentationAssociation
from schemas.segmentation_schema import SegmentationSchema


async def save_segmentation_result(segmentation:SegmentationSchema,id:int,session:Session):
    try:
        segmentation_data = {
            'segmentationMRI':segmentation.segmentationMRI,
            'feedbackID': id
        }
        # new_segmentation = Segmentation(segmentationMRI=segmentation.segmentationMRI,feedbackID=id)
        query = insert(Segmentation.__table__).values(segmentation_data)
        # compiled_query = query.compile()
        result = session.execute(query)
        session.commit()

        segmentationPK = result.inserted_primary_key[0]

        new_association = SegmentationAssociation(doctorID=segmentation.doctorID,patientID=segmentation.patientID,segmentationID=segmentationPK)
        session.add(new_association)
        session.commit()
        session.refresh(new_association)
    except Exception as e:
        print("Could not save segmentation and its association. please check your code")