const Greeting = () => {
  let greet = ''
  const chHr = new Date().getHours()

  if (chHr < 12) {
    greet = '🌅 Good Morning'
  } else if (chHr < 18) {
    greet = '☀️ Good Afternoon'
  } else {
    greet = '🌕 Good Evening'
  }

  return <>{greet}</>
}

export default Greeting
