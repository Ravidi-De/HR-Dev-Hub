export const timeAdjust = (timestamp) => {
  // Output: 9:00AM
  const sessionStartTimestamp = new Date(timestamp)

  const hours = new Date(sessionStartTimestamp).getHours()
  const minutes = new Date(sessionStartTimestamp).getMinutes()

  let timeOfDay
  let formattedHours = hours

  if (hours >= 12) {
    timeOfDay = 'PM'
    if (hours > 12) {
      formattedHours = hours - 12
    }
  } else {
    timeOfDay = 'AM'
    if (hours === 0) {
      formattedHours = 12
    }
  }

  const formattedMinutes = minutes === 0 ? '00' : minutes

  const formattedTime = `${formattedHours}:${formattedMinutes} ${timeOfDay}`
  return formattedTime
}

export const time24hAdjust = (timestamp) => {
  // Output: 16:00
  const date = new Date(timestamp)

  const hours = date.getHours().toString().padStart(2, '0') // Ensure two-digit hours
  const minutes = date.getMinutes().toString().padStart(2, '0') // Ensure two-digit minutes

  const formattedTime = `${hours}:${minutes}`

  return formattedTime
}

export function formatDateFromTimestamp(timestamp) {
  // Create a Date object from the provided timestamp
  const date = new Date(timestamp)

  // Get the year, month, and day components
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Note that months are zero-indexed, so we add 1
  const day = 1 // Set the day to 1

  // Create a string with the desired format "1st October 2023"
  const formattedDate = `${day}${getOrdinalSuffix(day)} ${getMonthName(
    month
  )} ${year}`

  return formattedDate
}

// Helper function to get the month name
function getMonthName(month) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return monthNames[month - 1]
}

// Helper function to get the ordinal suffix for the day (e.g., 1st, 2nd, 3rd)
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th'
  }
  const lastDigit = day % 10
  if (lastDigit === 1) {
    return 'st'
  } else if (lastDigit === 2) {
    return 'nd'
  } else if (lastDigit === 3) {
    return 'rd'
  } else {
    return 'th'
  }
}
