import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

export default function StarRating({ value }) {
  return (
    <Stack spacing={1}>
      <Rating
        name="read-only"
        value={value}
        size="large"
        precision={0.5}
        readOnly
      />
    </Stack>
  )
}
