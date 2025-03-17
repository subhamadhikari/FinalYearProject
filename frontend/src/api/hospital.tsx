import { Hospital } from "lucide-react";
import { API } from "../backend";
import { HospitalDetails, HospitalDropdown,HospitalAssociation } from "../types/hospital";

export const getAllHospital = async ():Promise<HospitalDropdown[]> => {
    const url = API + "/hospital/getAllHospitals"
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    return data
}

export const getHospitalByID = async (id:number):Promise<HospitalDetails> => {
    const url = API + `/hospital/getHospitalByID/${id}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    return data
}

export const getAffiliatedHospitals = async(doctorID:number):Promise<HospitalDetails[]> => {
    const url = API + `/hospital/getAffiliatedHospitals/${doctorID}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    console.log("The associated hospital of the doctor are::",data)
    return data
}

export const deleteAffiliatedHospital = async(hospitalID:number) => {
    const url = API + `/hospital/deleteAssociatedHospital/${hospitalID}`
    const response = await fetch(url,{
        method:"DELETE"
    })
    const data = await response.json()
    console.log(data)
}

export const addHospitalAssociation = async(association:HospitalAssociation) => {
    const url = API + "/hospital/addAffilitiationHospital"
    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(association)
    })
    const data = await response.json()
}