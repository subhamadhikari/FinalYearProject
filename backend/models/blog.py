from sqlalchemy import (
    Column,
    String,
    Integer,
    ForeignKey
)
from db.configurations import Base

class Blog(Base):
    __tablename__ = "blog"
    blogID = Column(Integer,primary_key=True,autoincrement=True)
    blogTitle = Column(String(50),nullable=False)
    blogContent = Column(String(500),nullable=False)
    blogAuthor = Column(Integer,ForeignKey("user.userID",ondelete="CASCADE"),nullable=False)
    blogTag = Column(String(20),nullable=False)
    blogCoverImage = Column(String(50),nullable=False)