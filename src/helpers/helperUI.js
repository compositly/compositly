import { getActiveFormattingMask } from 'react-international-phone'
// Allow to get the short version of an account
function accountShort(
  account,
  defaultText = undefined,
  startChars = 6,
  endChars = 4,
) {
  if (!account || account.length <= 0) return defaultText || '0x0000000000'
  return `${account.substring(0, startChars)}...${account.substring(
    account.length - endChars,
    account.length,
  )}`
}

function urlRedirect(newUrl) {
  if (window.location.pathname != newUrl) window.location.href = newUrl
}

const cleanUrl = (url) => {
  let urlFixed = url.toLowerCase()
  if (urlFixed.startsWith('http:')) {
    urlFixed = urlFixed.replace('http:', 'https:')
  } else if (!urlFixed.startsWith('https:')) urlFixed = `https://${urlFixed}`

  return urlFixed
}

const isValidImgUrl = async (url) => {
  let isImgUrlValid = false
  const regex =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
  if (regex.test(url) && url.length < 2048) {
    const img = new Image()
    img.src = url
    try {
      await img.decode()
      isImgUrlValid = true
    } catch (error) {
      isImgUrlValid = false
    }
  }
  return isImgUrlValid
}

// Function to get the time in hours, minutes and seconds from milliseconds
function getTimeBySec(ms) {
  let hours = Math.floor(ms / 3600)
  if (hours < 10) hours = `0${hours}`
  let minutes = Math.floor((ms - hours * 3600) / 60)
  if (minutes < 10) minutes = `0${minutes}`
  let seconds = ms - hours * 3600 - minutes * 60
  if (seconds < 10) seconds = `0${seconds}`
  return `${hours}:${minutes}:${seconds}`
}

// This function receives timeValue '08:45:32' and return the total seconds
function getSecFromTimeValue(timeValue) {
  const timeArray = timeValue.split(':')
  return (
    parseInt(timeArray[0]) * 3600 +
    parseInt(timeArray[1]) * 60 +
    parseInt(timeArray[2])
  )
}

// This function receives the total seconds and returns an object with hours, minutes and seconds
const convertSecondsToTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds }
}

const formatNumberToString = (num) => (num < 10 ? `0${num}` : `${num}`)

// This function receives to dates and returns if the year, month and day are the same
function isSameDay(date1, date2) {
  const firstDate = new Date(date1)
  const secondDate = new Date(date2)
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
}

function isSameMonth(date1, date2) {
  const firstDate = new Date(date1)
  const secondDate = new Date(date2)
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth()
  )
}

function isDateBetween(dateToCheck, date1, date2) {
  const date = new Date(dateToCheck)
  const start = new Date(date1)
  const end = new Date(date2)

  // Determine the earlier and later dates
  const minDate = start < end ? start : end
  const maxDate = start > end ? start : end

  return date >= minDate && date <= maxDate
}

function getWeekDaysName(locale = 'en-US', weekday = 'long') {
  const thu = new Date(1970, 0, 1)
  const fri = new Date(1970, 0, 2)
  const sat = new Date(1970, 0, 3)
  const sun = new Date(1970, 0, 4)
  const mon = new Date(1970, 0, 5)
  const tue = new Date(1970, 0, 6)
  const wed = new Date(1970, 0, 7)

  const { format } = new Intl.DateTimeFormat(locale, {
    weekday,
  })

  return [
    format(mon),
    format(tue),
    format(wed),
    format(thu),
    format(fri),
    format(sat),
    format(sun),
  ]
}

const months = {
  1: { es: 'Enero', en: 'January' },
  2: { es: 'Febrero', en: 'February' },
  3: { es: 'Marzo', en: 'March' },
  4: { es: 'Abril', en: 'April' },
  5: { es: 'Mayo', en: 'May' },
  6: { es: 'Junio', en: 'June' },
  7: { es: 'Julio', en: 'July' },
  8: { es: 'Agosto', en: 'August' },
  9: { es: 'Septiembre', en: 'September' },
  10: { es: 'Octubre', en: 'October' },
  11: { es: 'Noviembre', en: 'November' },
  12: { es: 'Diciembre', en: 'December' },
}
// Function to get month by passing the monthIndex and the language
function getMonth(monthIndex = 1, lang = 'es') {
  return months[monthIndex][lang]
}

// Function to get the name of the months
// Month format must be of types 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined
function getMonthsName(local = 'en-GB', monthFormat = 'long', year = 2024) {
  const { format } = new Intl.DateTimeFormat(local, { month: monthFormat })
  return Array(12)
    .fill(null)
    .map((_, index) => format(new Date(year, index, 1)))
}

// This function will return an array of arrays of dates.
// It will be an array of length 6 that contains 6 arrays of
// length 7 each, representing 6 weeks with 7 days in each week.
// This will showcase the days in the month
function getMonthDays(date) {
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()
  // Get the date of the first day of the month
  const startOfMonth = new Date(currentYear, currentMonth, 1)
  // Get the date of the last day of the month
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0) // When day is cero, then it returns the last day of the currentMonth
  // Get the date of the first day of the week
  const startDate = getStartOfWeek(startOfMonth)
  // Get the date of the last day of the week
  const endDate = getEndOfWeek(endOfMonth)

  const weeks = [] // IT will be an array of arrays of dates
  // While endDate is bigger than startDate, it generates weeks and pushes them to the weeks array
  // To generate a week we need to pass it the startDate, which is the date of the last day of the previous week
  while (!isBiggerDate(startDate, endDate)) {
    let week = []
    if (weeks.length === 0) {
      const prevDate = startDate
      prevDate.setDate(startDate.getDate() - 1)
      week = generateWeek(prevDate)
    } else {
      const prevWeek = weeks[weeks.length - 1]
      week = generateWeek(prevWeek[prevWeek.length - 1])
    }
    startDate.setDate(startDate.getDate() + 7)
    weeks.push(week)
  }
  return weeks.slice(0, 6)
}
// Function to generate an array of dates of the week
// after the startDate.
// The startDate is the sunday *NOT included in the array*
function generateWeek(startDate) {
  const week = []

  for (let i = 1; i < 8; i += 1) {
    const day = new Date(startDate)

    day.setDate(day.getDate() + i)
    week.push(new Date(day))
  }

  return week
}

// Function to get the date of the first day of the week
function getStartOfWeek(date) {
  if (!date) throw new Error('Date is required')
  const value = new Date(date)
  const day = value.getDay()
  const differenceToFirstDay = day - 1
  value.setDate(value.getDate() - differenceToFirstDay)
  return value
}

// Function to get the date of the last day of the week
function getEndOfWeek(date) {
  const value = new Date(date)
  const day = value.getDay()
  const differenceToLastDay = 7 - day
  value.setDate(value.getDate() + differenceToLastDay)
  return value
}
// Function to know if date 1 is bigger than date 2
function isBiggerDate(firstDate, secondDate) {
  if (!firstDate || !secondDate) {
    console.log('[helper] isBiggerDate: error, Both dates are required')
    return false
  }
  const date1 = new Date(firstDate)
  const date2 = new Date(secondDate)

  const year1 = date1.getFullYear()
  const month1 = date1.getMonth()
  const day1 = date1.getDate()

  const year2 = date2.getFullYear()
  const month2 = date2.getMonth()
  const day2 = date2.getDate()

  if (year1 > year2) {
    return true
  } else if (year1 === year2 && month1 > month2) {
    return true
  } else if (year1 === year2 && month1 === month2 && day1 > day2) {
    return true
  }

  return false
}

// Given a year, this will return the range of years (12 years)
// For example if the year is 2012, it will return [2010, 2022]
// If it is 2023, it will return [2022, 2034]
function getYearsRange(year) {
  let firstBreakPointYear = 1902
  let breakPointFound = false
  while (!breakPointFound) {
    if (year - firstBreakPointYear < 12) {
      breakPointFound = true
    } else {
      firstBreakPointYear += 12
    }
  }
  return [firstBreakPointYear, firstBreakPointYear + 12]
}

// This function receives a starting date and an ending date and returns an array of years
// The difference between the starting and ending date must be 12 years
function getYearsFromRange(startYear, endYear) {
  const years = []
  for (let i = startYear; i < endYear; i++) {
    years.push(i)
  }
  return years
}

function getUTCDateString(date = new Date()) {
  const newDate = new Date(date)
  const year = newDate.getUTCFullYear()
  const month = String(newDate.getUTCMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(newDate.getUTCDate()).padStart(2, '0')
  const hours = String(newDate.getUTCHours()).padStart(2, '0')
  const minutes = String(newDate.getUTCMinutes()).padStart(2, '0')
  const seconds = String(newDate.getUTCSeconds()).padStart(2, '0')
  const milliseconds = String(newDate.getUTCMilliseconds()).padStart(3, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`
}

function formatLocalizedDateTime(dateStr, language = null) {
  // Parse the date string into a Date object, assuming the input date is in UTC.
  const date = new Date(dateStr)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return {
      date: 'Invalid Date',
      time: 'Invalid Date',
    }
  }

  // Automatically detect the user's locale and time zone
  const userLocale = language || navigator.language || 'en-US' // Fallback to 'en-US' if locale detection fails
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Define formatting options for date and time separately
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: userTimeZone,
  }

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // timeZoneName: 'short', // Removed to exclude the time zone name
    timeZone: userTimeZone,
  }

  // Format the date and time separately
  const formattedDate = new Intl.DateTimeFormat(userLocale, dateOptions).format(
    date,
  )
  const formattedTime = new Intl.DateTimeFormat(userLocale, timeOptions).format(
    date,
  )

  return {
    date: formattedDate,
    time: formattedTime,
  }
}

// // Example usage:
// const dateStr = '2024-08-29 06:26:50';
// const result = formatLocalizedDateTime(dateStr);
// console.log(result); // { date: 'August 29, 2024', time: '6:26:50 AM EDT' }

function formatTimeFromUnix(unixTimestamp) {
  // Convert the Unix timestamp from seconds to milliseconds
  const date = new Date(parseInt(unixTimestamp, 10) * 1000)

  // Extract local hours and minutes, and format them with leading zeros
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // Return the formatted time as HH:MM
  return `${hours}:${minutes}`
}

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (Array.isArray(obj)) {
    const arrCopy = []
    obj.forEach((_, i) => {
      arrCopy[i] = deepClone(obj[i])
    })
    return arrCopy
  }

  const objCopy = {}
  Object.keys(obj).forEach((key) => {
    objCopy[key] = deepClone(obj[key])
  })

  return objCopy
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

function dropdownContainerVariantsTopCenterCircle(height = 1000) {
  return {
    open: {
      clipPath: `circle(${height * 2 + 200}px at 50% 0%)`,
      top: 0,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
        duration: 1,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: 'circle(0px at 50% 0%)',
      top: '-100%', // Move the dropdown off-screen when closed
      transition: {
        delay: 0,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }
}

function dropdownContainerVariantsLeftCenterCircle(
  height = 1000,
  left = 28,
  duration = 0.1,
) {
  return {
    open: {
      clipPath: `circle(${height * 2 + 200}px at 0% 50%)`,
      left,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
        duration,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: 'circle(0px at 0% 50%)',
      left, // Move the dropdown off-screen when closed
      transition: {
        delay: 0,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }
}

function dropdownContainerVariantsTopLeft(
  height = 1000,
  left = 28,
  duration = 0.1,
) {
  return {
    open: {
      clipPath: `circle(${height * 2 + 200}px at 0% 0%)`,
      left,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
        duration,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: 'circle(0px at 0% 0%)',
      left, // Move the dropdown off-screen when closed
      transition: {
        delay: 0,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }
}

function dropdownContainerUpwardsVariants(top = -288, height = 1000) {
  return {
    open: {
      clipPath: `circle(${height * 2 + 200}px at 50% 100%)`,
      top,
      transition: {
        type: 'tween',
        stiffness: 20,
        restDelta: 2,
        duration: 2,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: 'circle(0px at 50% 100%)',
      top, // Move the dropdown off-screen when closed
      transition: {
        delay: 0,
        type: 'tween',
        stiffness: 400,
        damping: 40,
      },
    },
  }
}

function dropdownContainerVariantsFromTopRight(height = 1000, left = 'auto') {
  return {
    open: {
      clipPath: `circle(${height * 2 + 200}px at 100% 0%)`,
      bottom: '-100%',
      left,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
        duration: 1,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: 'circle(0px at 100% 0%)',
      bottom: 0, // Move the dropdown off-screen when closed
      left,
      transition: {
        delay: 0,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }
}

function dropdownContainerVariantsRightCenterCircle(
  height = 1000,
  left = 28, // New property to control the right positioning
  duration = 0.1,
) {
  return {
    open: {
      clipPath: `circle(${height * 2 + 200}px at 100% 50%)`,
      left, // Using right to position from the right side
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
        duration,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: 'circle(0px at 100% 50%)',
      left, // Move the dropdown off-screen when closed
      transition: {
        delay: 0,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }
}

function fadeInVariants(y = 20, duration = 0.2, delay = 0.05) {
  return {
    initial: { y, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, delay },
    },
    hidden: {
      y,
      opacity: 0,
      transition: { duration },
    },
  }
}

function fadeInAfterLoaderVariants(fadeInDuration = 0.75) {
  return {
    show: {
      opacity: 1,
      transition: {
        duration: 0,
        type: 'tween',
      },
    },
    fadeIn: {
      opacity: 0,
      transition: {
        duration: fadeInDuration,
        type: 'tween',
      },
    },
  }
}

function appearFromBelowVariants(height = 1000) {
  return {
    initial: {
      bottom: -height,
    },
    show: {
      bottom: 0,
      transition: {
        duration: 0.5,
        type: 'tween',
      },
    },
    hide: {
      bottom: -height,
      transition: {
        duration: 0.5,
        type: 'tween',
      },
    },
  }
}

function arrowVariants() {
  return {
    open: { rotate: 180, transition: { duration: 0.25 } },
    closed: { rotate: 0, transition: { duration: 0.25 } },
  }
}

function divContainerVariants(height = 1000) {
  return {
    open: {
      clipPath: `circle(${height * 2 + 200}px at 0px 0px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
        duration: 1,
      },
    },
    closed: {
      clipPath: 'circle(0px at 0px 0px)',
      transition: {
        delay: 0,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }
}

function shakingVariants(
  rotate = [-1, 1.3, 0],
  delay = 0,
  repeat = Infinity,
  duration = 0.2,
  stopRotate = 0,
) {
  return {
    start: {
      rotate,
      transition: {
        delay,
        repeat,
        duration,
      },
    },
    stop: {
      rotate: stopRotate,
    },
  }
}
function liItemVariants(openOpacity = 1) {
  return {
    open: {
      opacity: openOpacity,
      y: 0,
      transition: { duration: 0.2 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }
}

// Function to apply formatting mask to the phone number
function applyFormattingMask(stringValue, mask, maskedChar = '.') {
  let result = '' // result variable
  let stringValueIndex = 0 // index for the string
  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i]
    // If the maskChar is the maskedChar, then add the next character
    // of hte stringValue to the result
    // If not, then add the maskChar
    if (maskChar === maskedChar) {
      result += stringValue[stringValueIndex] || ''
      stringValueIndex++
    } else {
      result += maskChar
    }
  }
  return result
}

// data = { phone: string, country: {dialCode, ...} }
function getPhoneWithMask(data) {
  // If the phone number is shorter than the dial code, it means that it does
  // not need formatting and the value can be set directly
  if (data.phone.length - 1 <= data.country.dialCode.length) {
    return data.phone
  } else {
    // Get the mask for the country and apply it to the phone number
    const mask = getActiveFormattingMask({
      phone: data.phone,
      country: data.country,
      prefix: '+',
    })
    // Remove the dial code from the phone number to apply formatting properly
    let slicingIndex = data.country.dialCode.length
    if (data.phone[0] === '+') slicingIndex = data.country.dialCode.length + 1

    const phoneWithoutDialCode = data.phone.slice(
      slicingIndex,
      data.phone.length,
    )
    // Apply formatting to the phone number and add dialCode
    const phoneWithMask = `+${data.country.dialCode} ${applyFormattingMask(
      phoneWithoutDialCode,
      mask,
    )}`
    return phoneWithMask
  }
}

function cleanPhoneNumber(phoneNumber, cleanPrefix = false, prefix = '+') {
  let userDetailsPhone = phoneNumber
  if (userDetailsPhone.includes(' ')) {
    userDetailsPhone = userDetailsPhone.replaceAll(' ', '')
  }
  if (userDetailsPhone.includes('-')) {
    userDetailsPhone = userDetailsPhone.replaceAll('-', '')
  }
  if (userDetailsPhone.includes('(')) {
    userDetailsPhone = userDetailsPhone.replaceAll('(', '')
  }
  if (userDetailsPhone.includes(')')) {
    userDetailsPhone = userDetailsPhone.replaceAll(')', '')
  }
  if (cleanPrefix) {
    userDetailsPhone = userDetailsPhone.replace(prefix, '')
  }
  return userDetailsPhone
}

function insertCharacter(originalString, index, character) {
  if (index > originalString.length) {
    // If the index is greater than the length of the string, append the character at the end
    return originalString + character
  } else {
    // Insert the character at the specified index
    return (
      originalString.slice(0, index) + character + originalString.slice(index)
    )
  }
}

// Format phone to be 34-654456654 instead of +34 654 456 654
function formatPhoneToUpdate(phoneString, dialCode, countryCode) {
  const phoneWithoutPrefix = cleanPhoneNumber(phoneString, true, '+')
  const phoneCleaned = insertCharacter(phoneWithoutPrefix, dialCode.length, '_')
  // Crear phoneWithCountryCode 34_456456456_es
  const phoneWithCountryCode = `${phoneCleaned}_${countryCode}`
  return phoneWithCountryCode
}

function getCalendarHeight(view, isMobile) {
  const heights = {
    days: isMobile ? 370 : 360,
    others: isMobile ? 370 : 325,
  }
  return heights[view === 'days' ? 'days' : 'others']
}

export {
  accountShort,
  urlRedirect,
  cleanUrl,
  isValidImgUrl,
  getTimeBySec,
  getSecFromTimeValue,
  convertSecondsToTime,
  formatNumberToString,
  isSameDay,
  isSameMonth,
  isDateBetween,
  getWeekDaysName,
  getMonth,
  getMonthsName,
  getMonthDays,
  generateWeek,
  getStartOfWeek,
  getEndOfWeek,
  isBiggerDate,
  getYearsRange,
  getYearsFromRange,
  getUTCDateString,
  formatLocalizedDateTime,
  formatTimeFromUnix,
  deepClone,
  deepEqual,
  dropdownContainerVariantsTopCenterCircle,
  dropdownContainerVariantsLeftCenterCircle,
  dropdownContainerVariantsTopLeft,
  dropdownContainerUpwardsVariants,
  dropdownContainerVariantsFromTopRight,
  dropdownContainerVariantsRightCenterCircle,
  fadeInVariants,
  fadeInAfterLoaderVariants,
  appearFromBelowVariants,
  arrowVariants,
  divContainerVariants,
  shakingVariants,
  liItemVariants,
  applyFormattingMask,
  getPhoneWithMask,
  cleanPhoneNumber,
  insertCharacter,
  formatPhoneToUpdate,
  getCalendarHeight,
}
