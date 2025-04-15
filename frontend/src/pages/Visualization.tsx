import React, { useState,useEffect,useRef } from 'react'
import MRICanvas from '../components/MRIViewer/MRICanvas'
import { useParams } from 'react-router-dom';
// import mri1 from "./../assets/mri/mri.nii.gz"
// import mri2 from "./../assets/mri/seg.nii.gz"
// import * as nifti from "nifti-reader-js"

type Props = {
  passedURL?: string
}

type Volume = {
  url: string;
  name?: string; // use "name" to indicate the filename (and extension)
  colormap?:any
};

type MRIParams = {
  mri_name: string;
};

const Visualization = ({passedURL}: Props) => {
    const [volume, setVolume] = useState<Volume>({
      url: "",
      colormap: "viridis",
    });

    const {mri_name} = useParams<MRIParams>()
    const [loading, setLoading] = useState<boolean>(true)

    const visualizeRef = useRef<HTMLButtonElement>(null)

    const[mriUrl,setMRIUrl] = useState<string>("");

    const uploadMRI = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      // Prepare the file data
      const formData = new FormData();
      formData.append("file", file);
  
      // Post to FastAPI upload endpoint (adjust the URL/port as needed)
      const res = await fetch("http://127.0.0.1:8000/api/mri/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        console.error("Upload failed");
        return;
      }
      const data = await res.json();
  
      // Build the URL that points to the file in the assets folder.
      // This URL is served by FastAPI’s StaticFiles.
      // setMRIUrl(`http://127.0.0.1:8000/api/mri/assets/${data.filename}`)
      setVolume({url:`http://127.0.0.1:8000/api/mri/assets/${data.filename}`})
      return

      const fileUrl = `http://127.0.0.1:8000/api/mri/assets/${data.filename}`;
  
      // Update the volume with both the URL and the file name (so Niivue knows the extension)
      setVolume({ url: fileUrl, name: data.filename });
    };

    const viewMRI = (url:string) => {
      const fileUrl = url;
      setMRIUrl(fileUrl)
    }

    const clearMRI = () => {
      setVolume({url:""})
      setMRIUrl("")
      
    }

    useEffect(() => {
      if (mri_name) {
        const segmentedURL = `http://127.0.0.1:8000/assets/segmentation/${mri_name}/pred.nii.gz`
        setVolume({url: segmentedURL})
        visualizeRef.current?.click()  
        console.log("inside")
        setLoading(false)
      }
    }, [loading])
    // useEffect(() => {
    //   console.log(mri_name)
    // }, [])
    
  if (loading == true && mri_name !== undefined) {
    console.log("loading....")
    return  <p>Fetching MRI Scan ...</p>

  }

  return (
    <div>
        <MRICanvas
            images={[
              { url: mriUrl,colormap:"viridis" },
              // {url:mri2,colormap:"gray"}
              
            ]}
            nvOpts={{}}
          />{
            !mriUrl && (
              <div
              id="FileUpload"
              className="relative mt-5.5 mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 sm:py-7.5"
            >
              <input
                type="file"
                onChange={uploadMRI}
                accept=".nii, .nii.gz"
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
                <p className="mt-1.5">.nii or .nii.gz</p>
              </div>
            </div>
            )
          }
        {mri_name &&(
        <>
        <p>Tumor Type: Glioma</p>
        <div className='flex flex-row justify-between items-center mt-3' id="LegendContainer">
          <div className='flex flex-row justify-center items-center flex-[1]' id='color-1'>
            <div className='h-6 w-6 bg-[#34a97d]' id='color'></div>
            <p className='ml-4'>Enhancing Tumor</p>
          </div>
          <div className='flex flex-row justify-center items-center flex-[1]' id='color-1'>
            <div className='h-6 w-6 bg-[#337587]' id='color'></div>
            <p className='ml-4'>Peritumoral Edema</p>
          </div>
          <div className='flex flex-row justify-center items-center flex-[1]' id='color-1'>
            <div className='h-6 w-6 bg-[#f9e631]' id='color'></div>
            <p className='ml-4'>Enhancing Tumor </p>
          </div>
          <div className='flex flex-row justify-center items-center flex-[1]' id='color-1'>
            <div className='h-6 w-6 bg-[#440053]' id='color'></div>
            <p className='ml-4'>Background</p>
          </div>
        </div>
        </>
        )
        }
        <div className='flex w-full mt-6'>
            <button className='bg-blue-400 text-white p-4 rounded-md flex-[0.45]' onClick={clearMRI}>Clear</button>
            <button className='bg-blue-500 text-white p-4 rounded-md flex-[0.45] ml-auto' ref={visualizeRef} onClick={()=>{viewMRI(volume.url)}}>Visualize</button>
        </div>
    </div>
    
  )
}

export default Visualization