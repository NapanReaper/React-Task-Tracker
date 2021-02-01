const Button = ({ color, text, handleClick }) => {
 return (
  <button className='btn' onClick={handleClick} style={{ backgroundColor: color }}>{text}</button>
 )
}

export default Button
