import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header'
import Tasks from './components/Tasks'
function App() {
  const [displayAdd, setDisplayAdd] = useState(false)
  const [tasks, setTasks] = useState([])
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json();
    return data
  }
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json();
    return data
  }
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter(task => task.id !== id))
  }
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateTask),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    setTasks(tasks.map(task => task.id === data.id ? { ...task, reminder: data.reminder } : task))
  }
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks/', {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    setTasks([...tasks, data])
  }
  const toggleAdd = () => {
    setDisplayAdd(!displayAdd)
  }
  return (
    <div className="container">
      <Header title={'Task Tracker'} toggleAdd={toggleAdd} displayAdd={displayAdd} />
      {displayAdd && <AddTask addTask={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} handleDelete={deleteTask} toggleReminder={toggleReminder} /> : 'No task to show'}
    </div>
  );
}

export default App;
