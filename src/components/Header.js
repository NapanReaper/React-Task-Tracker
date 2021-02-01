import Button from './Button'
const Header = ({ title, toggleAdd, displayAdd }) => {
 return (
  <header className='header'>
   <h1>{title}</h1>
   <Button color={displayAdd ? 'red' : 'green'} text={displayAdd ? 'Close' : 'Add'} handleClick={toggleAdd} />
  </header>
 )
}

export default Header
