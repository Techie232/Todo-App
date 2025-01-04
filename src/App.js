import { useEffect, useState } from 'react';
import './App.css';
import { CiCirclePlus } from "react-icons/ci";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

function App() {

   const [task, setTask] = useState("");
   const [list, setList] = useState([]);
   const [isUpdate, setIsUpdate] = useState(-1);

   const handleAdditionHandler = (e) => {
      if (task.length === 0)
         return;
      let newList = [...list, task];
      setList(newList);
      setTask("");
   }

   const deleteHandler = (index) => {
      let nayaList = [...list];
      nayaList.splice(index, 1);
      setList(nayaList);
   }

   const updateValue = () => {
      let nayaList = [...list];
      nayaList[isUpdate] = task;
      setTask("");
      setList(nayaList)
      setIsUpdate(-1);
   }

   const updateHandler = (index) => {
      setIsUpdate(index);
      setTask(list[index]);
   }

   function insertWithEnter(e) {
      if (e.key === 'Enter') {
         if (isUpdate === -1)
            handleAdditionHandler();
         else
            updateValue();
      }
   }

   return (
      <div className="h-[100vh] w-[100vw] bg-blue-500 flex flex-col items-center">
         <div className='text-2xl font-semibold py-4'>Todo App</div>

         {/* search bar with + operator */}
         <div className='flex justify-center items-center gap-x-3 w-[70%]'>
            <input
               placeholder='🔍  Enter a Task '
               className='py-1 px-2 w-[60%] placeholder:text-zinc-950 rounded-md text-lg outline-none bg-slate-400
               shadow-xl'
               onChange={(e) => setTask(e.target.value)}
               value={task}
               onKeyDown={insertWithEnter}
            />
            <div
            >
               {
                  isUpdate !== -1 ? (
                     <RxUpdate
                        className='cursor-pointer hover:text-yellow-800 hover:scale-150 transition-all duration-150'
                        onClick={updateValue}
                     />
                  ) : (
                     <CiCirclePlus
                        onClick={handleAdditionHandler}
                        fontSize={30}
                        className='cursor-pointer hover:text-yellow-800 hover:scale-110 transition-all duration-150'
                     />
                  )
               }
            </div>
         </div>

         <div className='mt-5 flex flex-col w-[50%] items-start ml-20 overflow-hidden'>
            {
               list.map((item, index) => (
                  <div
                     key={index}
                     className='flex justify-between  gap-x-2 cursor-pointer w-[100%]'>
                     <div className='flex items-center'>
                        <input
                           type='checkbox'
                           id={'in' + index}
                        />
                        <label htmlFor={'in' + index} className={'text-lg ml-5 font-medium text-slate-700'}>{item}</label>
                     </div>

                     <div className='mr-20 flex text-xl'>

                        <HiOutlinePencilAlt onClick={() => updateHandler(index)} className='mr-4' />
                        <MdDelete onClick={() => deleteHandler(index)} />
                     </div>
                  </div>
               ))
            }
         </div>

      </div>
   );
}

export default App;