import React from 'react'
import ImageViewer from "../components/ImageViewer"
import icon from "./../assets/icon.png"
import coverimage from "./../assets/cover-image.png"
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='p-8 text-white bg-[#546DE5] h-[100vh]'>
      <div id='top menu container' className='flex flex-row justify-between items-center '>
        <div id='icon' className='flex-[0.7]'>
          <img src={icon} height={120} width={120}/>
        </div>
        <div id='icons-contaner' className='flex-[0.3] flex flex-row justify-around items-center'>
          <Link to={"/"} className='tracking-wider leading-10'>HOME</Link>
          <Link to={"/"} className='tracking-wider leading-10'>SEGMENT</Link>
          <Link to={"/"} className='tracking-wider leading-10'>BLOG</Link>
          <Link to={"/"} className='tracking-wider leading-10'>ABOUT</Link>
        </div>
      </div>
      <div id='middle section' className='flex flex-row justify-between items-center'>
        <div id='left-part' className='flex-[0.5] flex flex-col items-start justify-center'>
          <h1 className='font-bold tracking-widest text-4xl uppercase'>Effortless Brain MRI Segmentation</h1>
          <p className='text-xl tracking-wide leading-8 text-justify mt-4'>Streamline the process of brain tumor analysis. 
            With our advanced AI-powered tool, you can segment brain MRI images accurately with just a single click—saving
             time and enhancing precision.</p>
        </div>
        <div id='right-part' className='flex-[0.5] ml-auto '>
          <img src={coverimage} width={612} height={418} className='ml-auto'/>
        </div>
      </div>

      <div id="button-group" className='flex flex-row justify-start items-start w-full'>
            <div className='bg-red-400 w-[20%] rounded-2xl p-4 text-xl text-center'>Login</div>
            <div className='bg-white w-[20%] text-black-2 rounded-2xl p-4 text-xl text-center ml-4'>Create Account</div>
      </div>

    </div>
  )
}

export default Home