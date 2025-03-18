import React from 'react'
import logo from './../assets/icon.png'
import user from "./../assets/user-01.png"
import RelatedBlog from '../components/RelatedBlog'
import coverimage from "./../assets/cover-image.png"

type Props = {}

const DetailBlog = (props: Props) => {
  return (
    <>
    <div id='navigationBar' className='flex flex-row p-4 items-center justify-between fixed top-0 w-full bg-white shadow-md z-50'>
        <img src={logo} height={100} width={100} className='flex-[0.1] h-[60px] w-[60px] object-contain'/>
        <div id='top-left' className='flex flex-row items-center justify-around flex-[0.1]'>
            <img src={user} height={50} width={50}/>
        </div>
    </div>

    <div id='midSection' className='flex flex-row items-start justify-start h-screen mt-[110px]'>
      <div id='blogContents' className='flex-[0.8] flex flex-col items-start justify-start p-4'>
        <h1 className='text-4xl font-extrabold text-black-2 tracking-wider text-center w-full'>The title of blog is here</h1>
        <img src={coverimage} className='ml-auto mr-auto' height={400} width={400}/>
        <p className='text-xl font-medium text-justify'>The details of the blog goes here.</p>
      </div>
      <div id='relatedblog' className='flex-[0.2] flex flex-col items-center justify-start p-4 h-3/4 overflow-auto custom-scrollbar'>
        <h1 className='text-2xl font-bold text-black-2 tracking-wide '>Related Blog</h1>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
        <RelatedBlog/>
      </div>
    </div>
    </>
  )
}

export default DetailBlog