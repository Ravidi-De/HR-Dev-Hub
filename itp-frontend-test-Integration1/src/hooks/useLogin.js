import Swal from 'sweetalert2'
import { axiosInstance } from '../config'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../components/common'

const useLogin = () => {
  const navigate = useNavigate()

  const login = async (values, role, redirectPath) => {
    axiosInstance
      .post('/login', { ...values, role })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.data,
          timer: 2500,
        }).then(() => {
          navigate(redirectPath)
        })
      })
      .catch((error) => {
        if (error.code == 'ERR_NETWORK')
          return Toast('Cannot connect with backend API.', 'error', {})
        Toast(error.response.data.data, 'error', {})
      })
  }

  return { login }
}

export default useLogin
