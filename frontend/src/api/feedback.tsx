import { API } from "../backend";
import { Feedback } from "../types/feedback";
import { FeedbackUpdate } from "../types/feedback";

export const saveFeedback = async (feedback:Feedback) => {
    const url = API + "/feedback/createFeedback"
    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(feedback)
    })
    const data = await response.json()
    console.log(data)
    return data
}

export const getFeedback = async (patientID:number) => {
    const url = API + `/feedback/getFeedback/${patientID}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    console.log(data)
    return data
}

export const updateFeedback = async (feedbackID:number,feedback:FeedbackUpdate) => {
    const url = API + `/feedback/updateFeedback/${feedbackID}`
    const response = await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(feedback)
    })
    const data =  await response.json()
    console.log(data)
}

export const deleteFeedback = async (feedbackID:number,segmentationID:number) => {
    const url = API + `/feedback/deleteFeedback/${feedbackID}/${segmentationID}`
    const response = await fetch(url,{
        method:"DELETE"
    })
    const data = await response.json()
    console.log(data)
}