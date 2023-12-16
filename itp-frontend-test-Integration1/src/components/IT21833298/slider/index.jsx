import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const CustomSlider = ({ type, value, handleChange, isDisabled }) => {
  return (
    <Box sx={{ width: 600 }}>
      <Slider
        aria-label="Mark"
        value={value}
        step={20}
        marks
        min={0}
        max={100}
        sx={{ color: ' #D22B2B' }}
        disabled={isDisabled ? true : false}
        onChange={(e) =>
          handleChange((prevState) => ({
            ...prevState,
            [type]: e.target.value,
          }))
        }
      />
    </Box>
  )
}

export default CustomSlider
