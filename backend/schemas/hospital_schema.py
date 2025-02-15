from pydantic import BaseModel

class HospitalInfo(BaseModel):
    hospitalID: int
    hospitalName: str

    class Config:
        orm_mode = True


class HospitalSchema(HospitalInfo):
    hospitalContact: int
    hospitalAddress: str

    class Config:
        orm_mode = True
