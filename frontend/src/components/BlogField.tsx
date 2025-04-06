import React,{useState,useEffect} from 'react'
import { Blog } from '../types/blog'
import Dropdown from './Dropdown'
import { postBlog } from '../api/blog'

type Props = {
    closeForm?:() => void
}

const BlogField = (props: Props) => {
    const [blog, setBlog] = useState<Blog>({
        blogAuthor:1,
        blogTag:"",
        blogTitle:"",
        blogCoverImage:"",
        blogContent:"",
        imageFile: null
    })
    const [fileContent, setFileContent] = useState<File|null>(null)
    const [blogTag, setBlogTag] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value, files } = event.target as HTMLInputElement;

        if (files && files.length > 0) {
          // Handle file input
          const file = files[0]
          let fileName:string = file.name.split(/(\\|\/)/g).pop() || ""
          console.log("file names::",fileName)
          setFileContent(file);
          setBlog((prevBlog) => ({...prevBlog,"blogCoverImage":fileName}))
          return
        } else {
          // Handle text input
          setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
        //   return
        }

        console.log("changed blog contents",blog)
        console.log("changed file contents",fileContent)

    }

    const createBlog = async() => {
        let tag:string = ""
        switch (blogTag) {
            case "1":
              tag = "Medicine";
              break;
            case "2":
              tag = "Medical Research";
              break;
            case "3":
              tag = "Neurosurgery";
              break;
            case "4":
              tag = "AI in Medicine";
              break;
            case "5":
              tag = "Life Experiences";
              break;
            case "6":
              tag = "Radiology";
              break;
            default:
              tag = "Unknown Tag";
              break;
          }
        
        setBlog((prevBlog)=>({...prevBlog,"blogTag":tag,"imageFile":fileContent}))
        console.log("passed blog",blog)
        
    }

    useEffect(() => {
        async function createBlog() {
            const response = await postBlog(blog)
        }
        createBlog()
    }, [blog.blogTag])
    
    

    if (isLoading) {
        setIsLoading(false)
        return <p>Loading....</p>
    }
    return (
    <>
    <div className='flex flex-col bg-[#D5DBF9] p-4 m-1'>
        <div className='flex flex-row justify-between items-center bg-[#AAB6F2] m-1 p-2'>
            <input type='text' className='flex-[0.75] p-2 border-none outline-none w-full' placeholder='Title of the Blog' name='blogTitle' onChange={handleChange}/>
            {/* <p className='flex-[0.2] bg-gray-300 text-black-2 font-bold'>Tag-Drop</p> */}
            <Dropdown label='Blog Tag' options={[{id:"1",label:"Medicine"},{id:"2",label:"Medical Research"},{id:"3",label:"Neurosurgery"},{id:"4",label:"AI in Medicine"},{id:"5",label:"Life Experiences"},{id:"6",label:"Radiology"}]} styles='flex-[0.2] ml-auto' onChange={setBlogTag} value={blogTag}/>
        </div>
        <div className='m-1'>
            <textarea name='blogContent' onChange={handleChange} className='block p-2.5 h-115 w-full text-sm text-white  border-none outline-none bg-[#AAB6F2] rounded-lg border border-gray-300'></textarea>
            <input type='file' className='' onChange={handleChange} name='blogCoverImage'/>
        </div>
        <div className='flex flex-row items-center justify-between m-1'>
            <button className='p-2 rounded-md w-full bg-blue-300 text-white font-bold flex-[0.45]' onClick={()=>{
                createBlog()
            }}>Publish</button>
            <button className='p-2 rounded-md w-full bg-blue-300 text-white font-bold flex-[0.45]' onClick={props.closeForm}>Discard</button>
        </div>
    </div>
    </>
  )
}

export default BlogField