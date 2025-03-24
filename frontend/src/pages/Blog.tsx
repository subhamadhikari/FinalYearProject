import React,{useState,useEffect} from 'react'
import logo from "./../assets/icon-brain.png"
import write from "./../assets/edit (1).png"
import user from "./../assets/user-01.png"
import search from "./../assets/search (1).png"
import Post from '../components/Post'
import BlogField from '../components/BlogField'
import { BlogDetails } from '../types/blog'
import { getAllBlogs } from '../api/blog'
import DropdownUser from '../components/Header/DropdownUser'
import { AuthUser } from '../types/user'

type Props = {
    user?:AuthUser|null
}

const Blog = (props: Props) => {
    const [createForm, setCreateForm] = useState<boolean>(false)
    const [blogList, setBlogList] = useState<BlogDetails[]|null>(null)

    const toggleForm = () => {
        setCreateForm((state) => !state)
    }

    const closeForm = () => {
        setCreateForm(false)
    }

    useEffect(() => {
        async function fetchAllBlogs() {
            const blogs:BlogDetails[] = await getAllBlogs()
            setBlogList(blogs)
            console.log("all blogs",blogs)
        }
        fetchAllBlogs()
        
    }, [])
    

    return (
    <>
    <div id='navigationBar' className='flex flex-row p-4 items-center justify-between fixed top-0 w-full bg-white shadow-md z-99'>
        <img src={logo} height={100} width={100} className='flex-[0.1] h-[60px] w-[60px] object-contain'/>
        <div id='searchBar' className='flex flex-row bg-[#D5DBF9] p-2 items-center justify-center w-full flex-[0.7] rounded-md text-white'>
            <input type='text' className='bg-[#D5DBF9] flex-[0.9] p-2 border-none outline-none w-full' placeholder='Search'/>
            <img src={search} height={20} width={20} className=''/>
        </div>
        <div id='top-left' className='flex flex-row items-center justify-around flex-[0.1]'>
            <img src={write} height={30} width={30} onClick={toggleForm} className='cursor-pointer transition-all delay-100 duration-100 hover:-translate-y-1 hover:scale-110'/>
            {/* <img src={user} height={50} width={50}/> */}
            <DropdownUser page='blog' user={props.user}/>
        </div>
    </div>

    <div className='p-4 flex flex-col mt-[110px]' id='Post container'>
        {
            createForm && 
            (
                <BlogField closeForm={closeForm}/>
            )
        }
        {
            blogList &&
            blogList.map((blog,key) => {
                return(
                    <>
                    <Post fetchedBlogs={blog} key={key} />
                    </>
                )
            })
        }
        {/* <Post/>
        <Post/>
        <Post/> */}
    </div>

    
    </>
  )
}

export default Blog