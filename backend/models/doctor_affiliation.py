from sqlalchemy import (
    Column,
    Integer,
    PrimaryKeyConstraint,
    ForeignKey
)
from db.configurations import Base

class DoctorAffiliation(Base):
    __tablename__ = "doctor_affiliation"
    doctorID = Column(Integer,ForeignKey("user.userID",ondelete="CASCADE"),nullable=False)
    hospitalID = Column(Integer,ForeignKey("hospital.hospitalID",ondelete="CASCADE"),nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('doctorID','hospitalID'),
    )
