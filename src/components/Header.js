import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, toggleAdd, displayAdd }) => {
 const location = useLocation();
 return (
  <header className='header'>
   <h1>{title}</h1>
   {
    location.pathname === '/' &&
    <Button color={displayAdd ? 'red' : 'green'} text={displayAdd ? 'Close' : 'Add'} handleClick={toggleAdd} />
   }
  </header>
 )
}

export default Header
