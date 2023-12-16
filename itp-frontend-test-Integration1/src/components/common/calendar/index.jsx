import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
import { ThemeProvider, createTheme } from '@mui/material'
import './styles.scss'

const Calendar = () => {
  const color = '#c44242'
  const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          sizeMedium: {
            color,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color,
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs(new Date())}
          disabled={true}
          className="Tester"
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default Calendar
