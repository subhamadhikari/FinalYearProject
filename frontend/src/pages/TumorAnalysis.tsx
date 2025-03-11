import React,{useState} from 'react'
import warning from "./../assets/close.png"
import { segmentAndClassify } from '../api/mri'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch,RootState } from '../redux/store'
import {setLoading} from "./../redux/slices/segmentSlice"

type Props = {}

const TumorAnalysis = (props: Props) => {

    const [mri, setMRI] = useState<File|null>(null)
    const [preview, setPreview] = useState<string|null>(null)
    const [label, setLabel] = useState<string>("")
    const [predictedMRI, setPredictedMRI] = useState<string|null>(null)
    const [thresholdedMRI, setThresholdedMRI] = useState<string|null>(null)

    const [toggleThreshold, setToggleThreshold] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()

    const makeInference = async() => {
        console.log(mri,"inference")
        dispatch(setLoading(true))
        if (mri) {
            const result = await segmentAndClassify(mri)  
            // if(result){
            //     console.log("result after",result.replace("blob:",""))    
            //      setPredictedMRI((prev)=>result.replace("blob:",""))
            // }
            console.log(result["segmentation_image"])
            setPredictedMRI(`data:image/png;base64,${result["segmentation_image"]}`)
            setThresholdedMRI(`data:image/png;base64,${result["thresholded_image"]}`)
            setLabel(result["label"])
        }
        dispatch(setLoading(false))

    }

    const uploadMRI = (event:React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const mriImage = files[0] 
            console.log(mriImage,"--MRI Image--")
            setMRI(mriImage) 
            setPreview(URL.createObjectURL(mriImage))
        }

    }

    const clearStates = () => {
        setToggleThreshold(false)
        setPredictedMRI(null)
        setThresholdedMRI(null)
        setMRI(null)
    }

    return (
        <div>
            {!predictedMRI && (
            <>
            <div className="flex w-full border-l-6 bg-red bg-opacity-[15%] px-7 py-8 shadow-md md:p-9">
                <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-red bg-opacity-30">
                    <img src={warning} height={20} width={20}/>
                </div>
                <div className="w-full ">
                    <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    Upload MRI 
                    </h5>
                    <p className="leading-relaxed text-[#D0915C]">
                    {"Please upload MRI in jpg format to perform tumor classification and segmentation"}
                    </p>
                </div>
            </div>
            <div
                id="FileUpload"
                className="relative mt-5.5 mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 sm:py-7.5"
                >
                <input
                    type="file"
                    onChange={uploadMRI}
                    accept=".jpg , .jpeg"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="#3C50E0"
                        />
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="#3C50E0"
                        />
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="#3C50E0"
                        />
                    </svg>
                    </span>
                    <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                    </p>
                    <p className="mt-1.5">.jpg or .jpeg</p>
                </div>
                </div>
                <div className='flex w-full mt-6'>
                    <button className='bg-blue-500 text-white p-4 rounded-md flex-[1] ml-auto' onClick={()=>{makeInference()}}>Perform Analysis</button>
                </div>
                </>
                )
                }
                {
                    predictedMRI && thresholdedMRI && (
                        <>
                        <div className='flex flex-row w-full items-center justify-between'>
                            {
                                preview && 
                                (
                                    <div className='flex-[0.46] flex flex-col items-center justify-center bg-gray-300 rounded-md p-2' id='imgcontainer'>
                                        <img src={preview} height={200} width={200}/>
                                    <p className='bg-gray-100 p-2 m-2 rounded-md text-black-2'>MRI Scan</p>
                                </div>
                                )
                            }
                            {
                                !toggleThreshold ? 
                                (
                                    <div className='flex-[0.46] flex flex-col items-center justify-center bg-gray-300 rounded-md p-2' id='imgcontainer'>
                                        <img src={predictedMRI} height={200} width={200}/>
                                        <p  className='bg-gray-100 p-2 m-2 rounded-md text-black-2'>Tumor Type: {label}</p>
                                    </div>
                                ):
                                (
                                    <div className='flex-[0.46] flex flex-col items-center justify-center bg-gray-300 rounded-md p-2' id='imgcontainer'>
                                        <img src={thresholdedMRI} height={200} width={200}/>
                                        <p  className='bg-gray-100 p-2 m-2 rounded-md text-black-2'>Tumor Type: {label}</p>
                                    </div>
                                )
                            }

                        </div>
                        <div className='flex w-full mt-6'>
                            <button className='bg-blue-500 mt-6 text-white p-4 rounded-md flex-[0.46]' onClick={clearStates}>Clear</button>
                            <button className='bg-blue-500 mt-6 text-white p-4 rounded-md flex-[0.46] ml-auto' onClick={()=>{
                                setToggleThreshold((prev) => !prev)
                            }}>
                                {!toggleThreshold ? "Apply Threshold" : "Revert Image"}
                            </button>
                        </div>
                        </>
                    )
                }
        </div>
  )
}

export default TumorAnalysis