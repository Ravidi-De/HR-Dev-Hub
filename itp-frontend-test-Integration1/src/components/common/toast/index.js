import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = (text, type, config) => {
  switch (type) {
    case 'success':
      return toast.success(text, { config })

    case 'error':
      return toast.error(text, { config })

    case 'warning':
      return toast.warning(text, { config })

    case 'info':
      return toast.info(text, { config })
  }
}

export default Toast
