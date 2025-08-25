"use client"
import Todo from "@/components/Todo";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [tododata, setTodoData] =useState([])

  const fetchTodos = async()=>{
    const response = await axios('/api');
    setTodoData(response.data.todos)
  }

   const deleteTodo = async(id)=>{
    const response = await axios.delete('/api',{
      params:{
        mongoId:id
      }
    });
     toast.success(response.data.msg);
     fetchTodos();
  }
     const completeTodo = async(id)=>{
    const response = await axios.put('/api',{},{
      params:{
        mongoId:id
      }
    });
     toast.success(response.data.msg);
     fetchTodos();
  }



  useEffect(()=>{
       fetchTodos();
  },[])

  const onChangeHandler = (e)=>{
       const name = e.target.name;
       const value = e.target.value;
       setFormData(form =>({...form,[name]:value}));
       console.log(formData);
       
  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      //api code
      const response = await axios.post('/api',formData)
     
      toast.success(response.data.msg);
      setFormData({
           title: "",
    description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error('Error')
    }
  }
  return (
    <>
    <ToastContainer theme="dark"/>
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input onChange={onChangeHandler}
        value={formData.title}
          type="text"
          name="title"
          placeholder="Enter title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea onChange={onChangeHandler}
        value={formData.description}
          name="description"
          placeholder="Enter description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>
        <button
          type="submit"
          className="cursor-pointer px-10 py-2 bg-red-700 text-white rounded-sm"
        >
          Add ToDo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
       <table className="w-full text-sm text-left border border-gray-300 bg-white rounded-lg">
  <thead>
    <tr className="border-b border-gray-300">
      <th className="px-6 py-3">ID</th>
      <th className="px-6 py-3">Title</th>
      <th className="px-6 py-3">Description</th>
      <th className="px-6 py-3">Status</th>
      <th className="px-6 py-3">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      tododata.map((item,index)=>{
          return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
      })
    }
   
  
  </tbody>
</table>

      </div>
    </>
  );
}
