import React from 'react'
import error from "./../assets/error-404.png"
type Props = {}

const NoMatch = (props: Props) => {
  return (
    <div className='flex flex-col items-center h-lvh justify-center'>
      <img src={error} height={200} width={200}/>
      <p className='text-4xl font-bold tracking-widest text-black-2'>Page Not Found!</p>
    </div>
  )
}

export default NoMatch