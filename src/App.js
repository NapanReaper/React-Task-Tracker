import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header'
import Tasks from './components/Tasks'
function App() {
  const [displayAdd, setDisplayAdd] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/tasks')
      setTasks(await response.json())
    }
    fetchData()
  }, [])
  const deleteTask = (id) => {
    console.log('abc');
    setTasks(tasks.filter(task => task.id !== id))
  }
  const toggleReminder = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task, }
    setTasks([...tasks, newTask])
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
