from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session
from sqlalchemy import select,update,delete

from typing import List

from db.configurations import SessionLocal
from schemas.blog_schema import BlogSchema,BlogUpdate,BlogDetails
from models.blog import Blog
from models.user import User

router = APIRouter(
    prefix='/api/blog',
    tags=["Blog"]
)

def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@router.post("/createBlog")
async def create_blog(blog:BlogSchema,session:Session = Depends(db_session)):
    try:
        print("passed blog from frontend:::")
        # print(blog)
        # return
        new_blog = Blog(blogTitle = blog.blogTitle,blogContent = blog.blogContent,blogAuthor=blog.blogAuthor,blogCoverImage=blog.blogCoverImage,blogTag=blog.blogTag)
        session.add(new_blog)
        session.commit()
        session.refresh(new_blog)
    except Exception as e:
        print(e)
        return {"message":"Blog creation failed!","status":500}
    
    return {"message":"Blog created successfully","status":200}

@router.get("/getAllBlogs")
async def get_all_blogs(session:Session=Depends(db_session)):
    query = select(Blog.blogID,Blog.blogAuthor,Blog.blogCoverImage,Blog.blogContent,Blog.blogTag,Blog.blogTitle,User.userFirstName,User.userLastName).join(User,User.userID==Blog.blogAuthor)
    results = session.execute(query).all()
    val = [
        {"blogID": blogID, "blogAuthor": blogAuthor,"blogCoverImage":blogCoverImage,\
         "blogContent":blogContent,"blogTitle":blogTitle  ,"blogTag": blogTag,"authorName":userFirstName+" "+userLastName}
        for blogID,blogAuthor,blogCoverImage,blogContent,blogTag,blogTitle,userFirstName,userLastName in results
    ]
    print("val::",val)
    print(results)
    return val



@router.get("/getBlog/{blogID}/{userID}",response_model=BlogSchema)
async def get_a_blog(blogID:int,userID:int,session:Session=Depends(db_session)):
    query = select(Blog).where(Blog.blogID == blogID,Blog.blogAuthor==userID)
    results = session.execute(query).scalars().all()
    blog = [BlogSchema.model_validate(blog, from_attributes=True) for blog in results][0]
    return blog

@router.put("/updateBlog/{blogID}")
async def update_blog(blogID:int,blogUpdate:BlogUpdate,session:Session=Depends(db_session)):
    query = update(Blog.__table__).where(Blog.blogID == blogID)\
            .values(blogContent = blogUpdate.blogContent,blogCoverImage=blogUpdate.blogCoverImage,blogTag=blogUpdate.blogTag,blogTitle=blogUpdate.blogTitle)
    result = session.execute(query)
    session.commit()

    print(result)
    return {"message":"blog updated successfully","status":200}

@router.delete("/deleteBlog/{blogID}")
async def delete_blog(blogID:int,session:Session=Depends(db_session)):
    query = delete(Blog.__table__).where(Blog.blogID == blogID)
    session.execute(query)
    session.commit()
