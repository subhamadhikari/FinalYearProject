import { API } from "../backend";
import { RecentPatient } from "../types/user";

export const getALLPatientsByHospital = async(hospitalID: number) =>{
    const url = API + `/user/getAllPatients/${hospitalID}`
    console.log("url",url)
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    console.log(data)
    return data
}

export const getAgeDistribution = async(doctorID:number) => {
    const url = API + `/user/getPatientAgeDistribution/${doctorID}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    console.log("distribution of age::",data)
    return data
}

export const getRecentPatients = async(doctorID:number):Promise<RecentPatient[]> => {
    const url =API + `/user/getDoctorsPatient/${doctorID}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()

    const patients:RecentPatient[] = []
    data.forEach((patient:RecentPatient) => {
        const p = {
            fullName: patient.fullName,
            userID: patient.userID,
            tumorSeverity: patient.tumorSeverity,
            segmentationMRI: patient.segmentationMRI,
            feedbackID: patient.feedbackID,
            age: patient.age,
            email: patient.email,
            hospitalName: patient.hospitalName
        }
        patients.push(p)
    });

    return patients
}