from sqlalchemy import (
    Column,
    Integer,
    PrimaryKeyConstraint,
    ForeignKey
)
from db.configurations import Base

class SegmentationAssociation(Base):
    __tablename__ = "segmentation_association"
    doctorID = Column(Integer,ForeignKey("user.userID",ondelete="CASCADE"),nullable=False)
    patientID = Column(Integer,ForeignKey("user.userID",ondelete="CASCADE"),nullable=False)
    segmentationID = Column(Integer,ForeignKey("segmentation.segmentationID",ondelete="CASCADE"),nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('doctorID','patientID','segmentationID'),
    )
