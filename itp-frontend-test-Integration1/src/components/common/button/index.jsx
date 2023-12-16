const Button = ({ type, children, className }) => {
  return (
    <button type={type ? type : 'button'} className={className}>
      {children}
    </button>
  )
}

export default Button
