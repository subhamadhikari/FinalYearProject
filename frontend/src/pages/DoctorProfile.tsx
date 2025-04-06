import React,{useEffect,useState} from 'react'
import docuser from "./../assets/doctor.png"
import TableTwo from '../components/Tables/TableTwo'
import { getAffiliatedHospitals } from '../api/hospital'
import { AuthUser } from '../types/user'
import { HospitalDetails } from '../types/hospital'

type Props = {
  user:AuthUser|null
}

const DoctorProfile = ({user}: Props) => {

  const [hospitalDetails, setHospitalDetails] = useState<HospitalDetails[]|null>(null)



  useEffect(() => {
    async function fetchAllHospitals(id:number) {
      const hospitals = await getAffiliatedHospitals(id)
      setHospitalDetails(hospitals)
    }
    if (user?.id) {
      fetchAllHospitals(user.id)
    }
    
  }, [])
  
  return (
    <>
    <div className='flex flex-col items-center  justify-center'>
        <img src={docuser} height={100} width={100} className=''/>
        <p className='text-xl tracking-wider font-bold mt-2'>Subham Adhikari</p>
        <div className='flex flex-row items-center justify-center mt-4'>
            <p>Availability</p>
            <span className='bg-purple-500 text-white p-1 rounded-md ml-1 mr-1'>SUN</span>
            <span className='bg-purple-500 text-white p-1 rounded-md ml-1 mr-1'>TUE</span>
            <span className='bg-purple-500 text-white p-1 rounded-md ml-1 mr-1'>FRI</span>
        </div>

    </div>
    <div className='flex flex-col mt-6'>
        {/* <div className='flex flex-row items-center justify-between'>
            <p className='text-xl font-semibold tracking-wide'>Associated Hospital</p>
            <button className='p-2 bg-green-300 rounded-md cursor-pointer text-white'>Add</button>
        </div> */}
    </div>
    {/* <TableOne recentPatients={null}/> */}
    <TableTwo hospitals={hospitalDetails} user={user}/>
    </>
  )
}

export default DoctorProfile