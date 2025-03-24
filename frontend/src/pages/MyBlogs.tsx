import React,{ReactElement, ReactEventHandler, useEffect,useState} from 'react'
import DropdownUser from '../components/Header/DropdownUser'
import logo from "./../assets/icon-brain.png"
import { AuthUser } from '../types/user'
import Post from '../components/Post'
import { Blog, BlogDetails,UpdateBlog } from '../types/blog'
import { getMyBlogs } from '../api/blog'
import { deleteBlogByID , updateBlog} from '../api/blog'

type Props = {
    user?:AuthUser|null
}

const MyBlogs = (props: Props) => {

  const [myBlogs, setMyBlogs] = useState<BlogDetails[]|null>(null)

  const deleteBlog = async(id:number) => {

    if (myBlogs) {
      let newBlogList:BlogDetails[] = myBlogs?.filter(blog => blog.blogID !== id)
      setMyBlogs(newBlogList)
      await deleteBlogByID(id)
    }

    
  }

  const update = (id:number) => {
    console.log("updated content",myBlogs)
    if (myBlogs !== undefined) {
      let updatedBlog:UpdateBlog = {
        blogContent:"",
        blogID:-1,
        blogTitle:""
      }; 

      myBlogs && myBlogs.forEach( blog => {
        if (blog.blogID === id) {
          if (blog.blogID !== undefined) { // Ensure blogID is defined
            updatedBlog = {
              blogContent: blog.blogContent,
              blogID: blog.blogID,
              blogTitle: blog.blogTitle
            };
          } else {
            // Handle the case where blogID is undefined if necessary
            console.error("blogID is undefined for blog:", blog);
          }
        }
      });
      updateBlog(updatedBlog)
    }

  }


  const handleContentChange = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,id:number) => {
    const {name,value} = event.target
    setMyBlogs((prevBlogs) => {
      if (!prevBlogs) {
        return null
      }
      return prevBlogs.map((blog) => blog.blogID===id?{...blog,[name]:value}:blog)
    })
    
  }

  useEffect(() => {
    async function userBlogs(userID:number) {
      const data = await getMyBlogs(userID)
      setMyBlogs(data)
      console.log(data)
    }

    if (props.user) {
      userBlogs(props.user.id)
      
    }
  }, [])
  
  return (
    <>
    <div id='navigationBar' className='flex flex-row p-4 items-center justify-between fixed top-0 w-full bg-white shadow-md z-99'>
        <img src={logo} height={100} width={100} className='flex-[0.1] h-[60px] w-[60px] object-contain'/>
        <div id='top-left' className='flex flex-row items-center justify-around flex-[0.1]'>
            <DropdownUser page='blog' user={props.user}/>
        </div>
    </div>
    <div className='p-4 flex flex-col mt-[110px]'>
      {
        myBlogs && myBlogs.map((blog,key) => (
          <Post fetchedBlogs={blog} key={key} page='myblog' removeBlog={() => {
            if (blog.blogID) {
              deleteBlog(blog?.blogID)
            }
          }}
          handleChange={handleContentChange}
          update={() => {
            update && blog.blogID && update(blog.blogID)
          }}
          />
        ))
      }
        {/* <Post fetchedBlogs={{authorName:"",blogAuthor:-1,blogContent:"",blogCoverImage:"",blogTag:"",blogTitle:""}} page='myblog'/>
        <Post fetchedBlogs={{authorName:"",blogAuthor:-1,blogContent:"",blogCoverImage:"",blogTag:"",blogTitle:""}} page='myblog'/>
        <Post fetchedBlogs={{authorName:"",blogAuthor:-1,blogContent:"",blogCoverImage:"",blogTag:"",blogTitle:""}} page='myblog'/> */}
    </div>
    </>
  )
}

export default MyBlogs