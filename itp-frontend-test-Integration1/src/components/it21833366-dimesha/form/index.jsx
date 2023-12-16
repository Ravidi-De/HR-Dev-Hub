const Form = ({ children, className }) => {
    return (
      <table  className={className}>
        {children}
      </table>
    )
  }
  
  export default Form