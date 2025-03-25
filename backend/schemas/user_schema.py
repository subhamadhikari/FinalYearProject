from pydantic import BaseModel
from models.user import UserRole

class UserSchema(BaseModel):
    userFirstName: str
    userLastName: str
    email: str
    password: str
    phoneNumber: int
    userRole: UserRole
    userDOB: str
    hospitalID: int

    class Config: 
        orm_mode = True

class UserResponseSchema(BaseModel):
    email: str
    id: int
    role: int
    hospitalID: int

class PatientSchema(BaseModel):
    userFirstName: str
    userLastName: str
    userID: int

    class Config:
        orm_mode = True

class RecentPatient(BaseModel):
    email: str
    userID: int
    segmentationMRI: str
    feedbackID: int
    fullName: str
    age: int
    tumorSeverity: str
    hospitalName: str

    class Config:
        orm_mode = True
