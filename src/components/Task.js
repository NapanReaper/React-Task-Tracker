import { FaTimes } from 'react-icons/fa'
const Task = ({ task, handleDelete, toggleReminder }) => {
 return (
  <div className='task' onDoubleClick={() => { toggleReminder(task.id) }} className={`task ${task.reminder ? 'reminder' : ''}`}>
   <h3>{task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(task.id)} /></h3>
   <p>{task.day}</p>
  </div>
 )
}

export default Task
