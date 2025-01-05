import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
    label:string,
    options:string[],
    onChange:(value:string)=>void,
    value:string | null,
    name?:string
}

const Dropdown = ({ label, options,onChange,value}:Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
  return (
    <>
    <div className="relative w-3/4 m-auto mt-1 mb-1 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-gray-700">
          {selectedOption || label}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                    onChange(option)
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  )
}

export default Dropdown