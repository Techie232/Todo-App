import { useState } from 'react';
import './App.css';
import { CiCirclePlus } from "react-icons/ci";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Toaster } from 'react-hot-toast';
import UpdateModal from './components/UpdateModal';
import toast from 'react-hot-toast';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


function App() {

   const [task, setTask] = useState("");
   const [list, setList] = useState([]);
   const [isUpdate, setIsUpdate] = useState(-1);
   const [checked, setChecked] = useState([]);

   const [collapse, setCollapse] = useState(false);

   const handleAdditionHandler = (e) => {
      if (task.length === 0) {
         toast.error("INPUT CAN't be EMPTY", {
            position: 'bottom-right'
         });
         return;
      }

      if (list.includes(task)) {
         toast.error("You can't have duplicate task", {
            position: 'top-left'
         });
         return;
      }
      let newList = [...list, task];
      setList(newList);
      setTask("");
   }

   const deleteHandler = (index) => {
      let nayaList = [...list];
      nayaList.splice(index, 1);
      setList(nayaList);
   }

   function insertWithEnter(e) {
      if (e.key === 'Enter') {
         handleAdditionHandler();
      }
   }

   const clickedOnBox = (index) => {
      if (checked.includes(index)) {
         setChecked(checked.filter(item => item !== index))
         return;
      }
      let nayaArray = [...checked, index]
      setChecked(nayaArray);
   }

   const toggleCollapse = () => {
      setCollapse(!collapse);
   }


   return (
      <div className="h-[100vh] w-[100vw] bg-blue-500 flex flex-col items-center relative">
         <Toaster />
         <div className='text-2xl font-semibold py-4 ml-10'>Todo App</div>

         {/* search bar with + operator */}
         <div className='flex justify-center items-center gap-x-3 w-[70%]'>
            <input
               placeholder='🔍  Enter a Task '
               className='py-1 px-2 w-[60%] placeholder:text-zinc-950 rounded-md text-lg outline-none bg-slate-400
               shadow-xl'
               onChange={(e) => setTask(e.target.value)}
               value={task}
               onKeyDown={insertWithEnter}
               autoFocus
            />
            <div
            >
               <CiCirclePlus
                  onClick={handleAdditionHandler}
                  fontSize={30}
                  className='cursor-pointer hover:text-yellow-800 hover:scale-150 transition-all duration-150'
               />
            </div>
         </div>

         <div className='w-[100%] flex justify-center items-center'>
            {
               list.length > 0 ? (
                  <div className='ml-20 mt-4 w-[50%] flex flex-col justify-center items-center'>

                     <div
                        className='flex items-center mb-4 bg-teal-900 rounded-md py-3 pl-3 px-3'
                        onClick={toggleCollapse}
                     >
                        <p className='text-2xl font-bold  mr-10'>No. of Task(s) are : <span className='text-yellow-500'>{list.length}</span></p>
                        {
                           collapse ? (<IoIosArrowUp />) : (<IoIosArrowDown />)
                        }
                     </div>
                     {
                        collapse ? (<div
                           className='text-lg font-semibold text-white animate-bounce'
                        >
                           You have Closed the Tab 😅
                        </div>) :

                           list.map((item, index) => (
                              <div
                                 key={index}
                                 className='flex justify-between  gap-x-2 cursor-pointer w-[100%]'>
                                 <div className='flex items-center'>
                                    <input
                                       type='checkbox'
                                       id={'in' + index}
                                       onClick={() => clickedOnBox(index)}
                                    />
                                    <label htmlFor={'in' + index} className={`${checked.includes(index) ? 'line-through' : ''} text-lg ml-5 font-medium text-slate-700`}>{item}</label>
                                 </div>

                                 <div className='mr-20 flex text-xl'>

                                    <HiOutlinePencilAlt onClick={() => setIsUpdate(index)} className='mr-4' />
                                    <MdDelete onClick={() => deleteHandler(index)} />
                                 </div>
                              </div>
                           ))}
                  </div>
               ) : (
                  <div className='mt-5 mx-auto border border-yellow-500 rounded-lg p-4 bg-zinc-500 animate-pulse  text-2xl font-semibold leading-5 text-slate-700'>No Task(s) Found</div>
               )
            }
         </div>
         {isUpdate !== -1 && <UpdateModal setIsUpdate={setIsUpdate} index={isUpdate} value={list[isUpdate]} setList={setList} list={list} />}
      </div >
   );
}

export default App;