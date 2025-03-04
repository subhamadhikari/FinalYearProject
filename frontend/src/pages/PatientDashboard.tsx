import React,{useState,useEffect} from 'react'
import hospital from "./../assets/hospital.png"
import doctor from "./../assets/doctor.png"
import { AuthUser } from '../types/user'
import { HospitalDetails } from '../types/hospital'
import { getHospitalByID } from '../api/hospital'
import { getFeedback } from '../api/feedback'
import { FeedbackResponse } from '../types/feedback'

type Props = {
    user: AuthUser
}

const PatientDashboard = ({user}: Props) => {
    const [hospitalInfo, setHospitalInfo] = useState<HospitalDetails|null>(null)
    const [doctorName, setDoctorName] = useState<string>("")
    const [feedback, setFeedback] = useState<FeedbackResponse[]|null>(null)
    // call to hospital details
    // call to composition table to get doctor id, segmentation id's
    // call to feedback

    useEffect(() => {
        const fetchHospital = async () => {
            const data = await getHospitalByID(user.hospitalID)
            setHospitalInfo(data)
        }
        const fetchFeedback = async () => {
            const data = await getFeedback(user.id)
            setFeedback(data)
        }
        fetchHospital()
        fetchFeedback()
    }, [])
    
  return (
    <>
    <div className='grid grid-cols-2 gap-4 p-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <div className='flex flex-col justify-between items-center border-stroke bg-gray-200 col-span-2 p-2 rounded-md'>
            <img src={hospital} height={60} width={60} />
            <p className='mt-1'>{hospitalInfo?.hospitalName}</p>
            <p className='mt-1'>{hospitalInfo?.hospitalAddress}</p>
            <p className='mt-1'>{hospitalInfo?.hospitalContact}</p>
        </div>
        <div className='flex flex-col justify-between items-center border-stroke bg-gray-200 col-span-2 p-2 rounded-md'>
            <img src={doctor} height={60} width={60} />
            <p className='mt-1'>{feedback && feedback.length > 0 && feedback[0].doctorName}</p>
            <p className='mt-1'>
            Availability: 
            <span className='bg-purple-500 text-white p-1 rounded-md ml-1 mr-1'>SUN</span>
            <span className='bg-purple-500 text-white p-1 rounded-md ml-1 mr-1'>TUE</span>
            <span className='bg-purple-500 text-white p-1 rounded-md ml-1 mr-1'>FRI</span>
            </p>
        </div>
    </div>
    <div className='p-4 m-4 flex flex-col justify-center items-start bg-white'>
        <h1 className='font-bold text-2xl '>MRI Result</h1>
        <div className='mt-2 mb-2'>
            The severity condition of your MRI scan is .
        </div>
        <div className='mt-2 mb-2'>
            <h2 className='font-bold text-xl'>Feedback</h2>
            {/* <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nostrum voluptatem quod cumque 
                similique porro tempora sequi vel quisquam adipisci odit aut, consequuntur ratione amet tempore
                 corrupti vero magnam magni?</p> */}
            {
                feedback && 
                (
                    feedback.map(feedback => {
                        return(
                            <p className='bg-gray-50 p-1'>{feedback.feedbackContent}</p>
                        )
                    })
                )
            }
        </div>
    </div>
    </>
  )
}

export default PatientDashboard