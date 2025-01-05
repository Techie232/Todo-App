import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";


const UpdateModal = ({ index, value, setList, list, setIsUpdate }) => {

   const [inputValue, setInputValue] = useState(value);

   const updateValue = () => {
      if (inputValue.length === 0) {
         toast.error("It Shouldn't be EMPTY", {
            position: 'top-right'
         });
         return;
      }

      if (value === inputValue) {
         toast.error('No Changes made.', {
            position: 'bottom-left'
         });
         return;
      }

      let nayaArray = [...list];
      nayaArray[index] = inputValue;
      setList(nayaArray);
      setIsUpdate(-1);
      toast.success('Value Updated');
   }

   const handleEnter = (e) => {
      if (e.key === 'Enter') {
         updateValue();
      }
   }

   return (
      <div className='w-[100vw] h-[100vh] absolute flex flex-col items-center justify-center backdrop-blur'>
         <div className='w-[50%] flex justify-between '>
            <p className='text-xl font-serif text-lime-300'>Update Value Modal</p>
            <MdCancel
               className='text-2xl text-yellow-50 cursor-pointer border rounded-md hover:scale-110 transition-all duration-100'
               onClick={() => setIsUpdate(-1)}
            />
         </div>
         <div className='w-[50%] h-[50%] flex flex-col items-center justify-center border-2 rounded-md border-lime-400 text-2xl'>
            <input
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleEnter}
               className='outline-none rounded-md pl-3 bg-orange-400' />
            <div
               className='rounded bg-red-400 w-fit p-1 mt-2 cursor-pointer hover:scale-90 transition-all duration-100'
               onClick={updateValue}
            >
               Update
            </div>
         </div>
      </div>
   )
}

export default UpdateModal