import React,{useState} from 'react'
import postImage from "./../assets/cover-image.png"
import { BlogDetails } from '../types/blog'
import { getBlogByID } from '../api/blog'
import { useNavigate } from 'react-router-dom'
import { IMAGE } from '../backend'


type Props = {
  fetchedBlogs:BlogDetails,
  page?:string,
  removeBlog?:() => void,
  handleChange?:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => void,
  update?: () => void
}

const Post = ({fetchedBlogs,page,removeBlog,handleChange,update}: Props) => {

  const navigate = useNavigate()
  const [showUpdatwField, setShowUpdatwField] = useState<boolean>(false)

  const fetchDetailView = async (blogID:number) => {
    navigate(`/detailblog/${blogID}`)
  }



  return (
    <>
    <div className='flex flex-row justify-between bg-[#546DE5] m-1'>
        <div className='flex-[0.8] flex flex-col p-4'>
            <h1 className='text-white tracking-widest text-2xl font-bold'>{fetchedBlogs.blogTitle}</h1>
            <div className='flex flex-row mt-auto'>
              {
                page !== "myblog" ? 
                (
                  <>
                    <span className='bg-[#D5DBF9] p-2 rounded-sm m-2 font-bold text-black-2'>{fetchedBlogs.authorName}</span>
                    <span className='bg-[#D5DBF9] p-2 rounded-sm m-2 font-bold text-black-2'>{fetchedBlogs.blogTag}</span>
                  </>
                ) :
                (
                <>
                  <span className='bg-green-600 p-2 rounded-md m-2 font-bold text-white cursor-pointer' onClick={() =>{
                    setShowUpdatwField(true)
                  }}>Update</span>
                  <span className='bg-red-600 p-2 rounded-md m-2 font-bold text-white cursor-pointer'   onClick={() => {
                      if (removeBlog) {
                        removeBlog();
                      }
                  }}>Delete</span>
                </>
                )
              }
                <span className='bg-[#D5DBF9] p-2 rounded-sm m-2 font-bold text-black-2 ml-auto' onClick={()=>{
                if(fetchedBlogs.blogID) fetchDetailView(fetchedBlogs.blogID)
                }}>Detail View</span>
            </div>
        </div>
        <div className='flex-[0.2] bg-red'>
            <img src={`${IMAGE}/blogs/${fetchedBlogs.blogCoverImage}`} className='w-full object-fill'/>
        </div>
    </div>
    {
      page === "myblog" &&
      showUpdatwField &&
      (
        <div className='flex flex-col bg-[#D5DBF9] p-4 m-1'>
        <div className='flex flex-row justify-between items-center bg-[#AAB6F2] m-1 p-2'>
            <input type='text' className='p-2 border-none outline-none w-full' value={fetchedBlogs.blogTitle} placeholder='Title of the Blog' name='blogTitle' onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              if (handleChange && fetchedBlogs.blogID !== undefined) {
                handleChange(event, fetchedBlogs.blogID);
              }
            }}/>
            {/* <p className='flex-[0.2] bg-gray-300 text-black-2 font-bold'>Tag-Drop</p> */}
            {/* <Dropdown label='Blog Tag' options={[{id:"1",label:"Medicine"},{id:"2",label:"Medical Research"},{id:"3",label:"Neurosurgery"},{id:"4",label:"AI in Medicine"},{id:"5",label:"Life Experiences"},{id:"6",label:"Radiology"}]} styles='flex-[0.2] ml-auto' onChange={setBlogTag} value={blogTag}/> */}
        </div>
        <div className='m-1'>
            <textarea name='blogContent' className='block p-2.5 h-60 w-full text-sm text-white  border-none outline-none bg-[#AAB6F2] rounded-lg border border-gray-300' onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                if (handleChange && fetchedBlogs.blogID !== undefined) {
                  handleChange(event, fetchedBlogs.blogID);
                }
              }}>{fetchedBlogs.blogContent}</textarea>
        </div>
        <div className='flex flex-row items-center justify-between m-1'>
            <button className='p-2 rounded-md w-full bg-blue-300 text-white font-bold flex-[0.45]' onClick={()=>{
                update && update()
            }}>Save Changes</button>
            <button className='p-2 rounded-md w-full bg-blue-300 text-white font-bold flex-[0.45]' onClick={()=>{
              setShowUpdatwField(false)
            }}>Discard</button>
        </div>
    </div>
      ) 
    }

    </>
  )
}

export default Post