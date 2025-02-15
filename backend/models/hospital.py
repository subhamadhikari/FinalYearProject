from sqlalchemy import (
    Column,
    String,
    Integer,
)
from db.configurations import Base

class Hospital(Base):
    __tablename__ = "hospital"
    hospitalID = Column(Integer,primary_key=True,autoincrement=True)
    hospitalName = Column(String(50),nullable=False)
    hospitalContact = Column(Integer,nullable=False)
    hospitalAddress = Column(String(50),nullable=False)