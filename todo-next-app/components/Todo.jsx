import React from "react";

const Todo = ({id, title, description, mongoId, complete, deleteTodo, completeTodo}) => {
  return (
   
      <tr className="border-b border-gray-200">
        <td className="px-6 py-4 font-medium text-gray-900">{id+1}</td>
        <td className={`px-6 py-4 ${complete? "line-through":""}`}> {title} </td>
        <td className={`px-6 py-4 ${complete? "line-through":""}`}> {description}</td>
        <td className="px-6 py-4">{complete ? "Completed": "Pending"}</td>
        <td className="px-6 py-4 gap-1 flex">
          <button onClick={()=>deleteTodo(mongoId)} className="cursor-pointer px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">Delete</button>
    {
    complete? ""
    :
    <button onClick={()=>completeTodo(mongoId)} className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer">Done</button>
    }
        </td>
      </tr>
     
  );
};

export default Todo;
