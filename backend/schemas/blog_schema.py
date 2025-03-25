from pydantic import BaseModel

class BlogSchema(BaseModel):
    blogID: int
    blogTitle: str
    blogContent: str
    blogTag: str
    blogCoverImage: str
    blogAuthor: int 
    
    class Config: 
        orm_mode = True

class BlogDetails(BlogSchema):
    authorName: str

    class Config:
        orm_mode = True

class BlogUpdate(BaseModel):
    blogTitle: str
    blogContent: str


    class Config: 
        orm_mode = True