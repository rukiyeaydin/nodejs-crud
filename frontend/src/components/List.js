import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import axios from 'axios'
import { baseURL } from '../utils/constants'

const List = ({ id, task, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`)
    .then((res) => {
      console.log(res)
      setUpdateUI((prevState) => !prevState)
    })
  };

  return (
    <li className='list'>
        {task}
        <div className="icon_holder">
            <BiEditAlt className='editicon' onClick={() => updateMode(id,task)}/>
            <BsTrash className='deleteicon' onClick={removeTask}/>
        </div>
    </li>
  )
}

export default List
