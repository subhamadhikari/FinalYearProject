from sqlalchemy import (
    Column,
    Integer,
    PrimaryKeyConstraint,
    ForeignKey,
    String,
    Date
)
from db.configurations import Base

class Feedback(Base):
    __tablename__ = "feedback"
    feedbackID = Column(Integer,primary_key=True,autoincrement=True)
    feedbackContent = Column(String(200),nullable=False)
    feedbackTumorSeverity = Column(String(200),nullable=False)
    feedbackDate = Column(Date,nullable=True)
