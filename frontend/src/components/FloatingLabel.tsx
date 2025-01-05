import React from 'react'

type Props = {
    fieldLabel: string,
    onInfoChange:(val:any)=>void,
    name:string,
    userInfo:any
}

const FloatingLabel = ({fieldLabel,name,onInfoChange,userInfo}: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    // onInfoChange({...userInfo,userInfo[name]:name})
    onInfoChange(() => ({
      ...userInfo,
      [name]: value,
    }))
  }
  return (
    // <div className="relative w-3/4 bg-red m-auto mt-1 mb-1">
    //     <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full outline-none text-sm text-black rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
    //     <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-8 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
    //         {fieldLabel}
    //     </label>
    // </div>
    <div className="relative w-3/4 bg-red m-auto mt-1 mb-1">
        <input type="text" 
            id="floating_outlined" 
            className="block px-2.5 pb-2.5 pt-4 w-full outline-none text-sm text-black rounded-lg border border-gray-300 appearance-none focus:border-blue-600 peer" 
            placeholder=" " 
            name={name}
            onChange={handleChange}/>
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            {fieldLabel}
        </label>
    </div>
  )
}

export default FloatingLabel