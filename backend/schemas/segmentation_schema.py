from pydantic import BaseModel

class SegmentationSchema(BaseModel):
    doctorID: int
    patientID: int
    segmentationMRI: str


    class Config:
        orm_mode = True