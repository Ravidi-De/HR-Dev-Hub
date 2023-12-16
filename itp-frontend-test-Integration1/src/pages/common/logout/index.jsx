import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    navigate('/')
  }, [])
}

export default Logout
