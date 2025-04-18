import { API } from "../backend"
export const predictSegmentation = async(mri:string) => {
    const url = API + "/mri/segment-test"
    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"mri_path":mri})
    })
    const data = await response.json()
    console.log(data)
    return data
}

export const segmentAndClassify = async(files:File) => {

    const url = API + "/mri/classify&segment"
    const formdata = new FormData()
    formdata.append("MRI",files)
    const response = await fetch(url,{
        method:"POST",
        body:formdata
    })
    // if (response.ok) {
    //     const blob = await response.blob();
    //     const imageObjectURL = URL.createObjectURL(blob);
    //     console.log(imageObjectURL)
    //     return imageObjectURL
    // } else {
    //     console.error('Failed to fetch image');
    // }
    const data = await response.json()
    console.log(data)
    // const data = await response.json()
    // console.log(data)
    return data
}