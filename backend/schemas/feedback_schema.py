from pydantic import BaseModel
from .segmentation_schema import SegmentationSchema

class FeedbackSchema(SegmentationSchema):
    feedbackContent: str
    feedbackTumorSeverity: str
    mriType: str
    tumorLabel: str
    thresholdedMRI: str
    originalMRI: str


    class Config:
        orm_mode = True

class FeedbackUpdate(BaseModel):
    feedbackContent: str
    feedbackTumorSeverity: str

    class Config:
        orm_mode = True    

