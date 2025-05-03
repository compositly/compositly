/**
 * @jest-environment jsdom
 */
import { describe, it, expect } from '@jest/globals'

import {
  accountShort,
  urlRedirect,
  getTimeBySec,
  getSecFromTimeValue,
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
  formatLocalizedDateTime,
  formatTimeFromUnix,
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
  cleanUrl,
  isValidImgUrl,
  convertSecondsToTime,
  formatNumberToString,
} from '../src/helpers/helperUI'

global.Image = class {
  constructor() {
    this.src = ''
  }

  async decode() {
    if (this.src === 'https://valid-image.com/image.png') {
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('Invalid image URL'))
    }
  }
}

describe('services: [/helperUI], with local document', () => {
  it('[method]: accountShort, should return a short account', () => {
    const account = '0xc8B54eC37c35F622C7a23a54d21d8a8c8b2C72f5'
    const r1 = accountShort(account, undefined)
    expect(r1).toBe('0xc8B5...72f5')
    const r2 = accountShort(account, undefined, 4, 10).replace('0x', 'did:')
    expect(r2).toBe('did:c8...8c8b2C72f5')
    const r3 = accountShort(account, undefined, 6, 9) // metamask
    expect(r3).toBe('0xc8B5...c8b2C72f5')
    const r4 = accountShort(account, undefined, 7, 7) // phantom
    expect(r4).toBe('0xc8B54...b2C72f5')
    const r5 = accountShort(account, undefined, 7, 5)
    expect(r5).toBe('0xc8B54...C72f5')
    const r6 = accountShort(undefined, undefined, 7, 3)
    expect(r6).toBe('0x0000000000')
  })
  it('[method]: urlRedirect, should redirect to a new url', () => {
    urlRedirect('https://compositly.com')
  })
  it('[method]: getTimeBySec, should return a time string', () => {
    const r1 = getTimeBySec(0)
    expect(r1).toBe('00:00:00')
    const r2 = getTimeBySec(1)
    expect(r2).toBe('00:00:01')
    const r3 = getTimeBySec(60)
    expect(r3).toBe('00:01:00')
    const r4 = getTimeBySec(3600)
    expect(r4).toBe('01:00:00')
    const r5 = getTimeBySec(86400)
    expect(r5).toBe('24:00:00')
    const r6 = getTimeBySec(86401)
    expect(r6).toBe('24:00:01')
    const r7 = getTimeBySec(90061)
    expect(r7).toBe('25:01:01')
  })
  it('[method]: cleanUrl, ', () => {
    expect(cleanUrl('http://example.com')).toBe('https://example.com')
    expect(cleanUrl('https://example.com')).toBe('https://example.com')
    expect(cleanUrl('example.com')).toBe('https://example.com')
    expect(cleanUrl('HTTP://EXAMPLE.COM')).toBe('https://example.com')
    expect(cleanUrl('http://example.com')).toBe('https://example.com')
    expect(cleanUrl('Example.COM')).toBe('https://example.com')
  })

  it('returns true for a valid image URL', async () => {
    let url = 'https://valid-image.com/image.png'
    await expect(isValidImgUrl(url)).resolves.toBe(true)
    url = 'https://invalid-image.com/image.png'
    await expect(isValidImgUrl(url)).resolves.toBe(false)
    url = 'https://example.com'
    await expect(isValidImgUrl(url)).resolves.toBe(false)
    url = 'ftp://example.com/image.png'
    await expect(isValidImgUrl(url)).resolves.toBe(false)
    const longUrl = 'https://example.com/' + 'a'.repeat(2032) + '.png'
    await expect(isValidImgUrl(longUrl)).resolves.toBe(false)
  })

  it('[method]: getSecFromTimeValue, should return total seconds', () => {
    const r1 = getSecFromTimeValue('00:00:00')
    expect(r1).toBe(0)
    const r2 = getSecFromTimeValue('00:00:01')
    expect(r2).toBe(1)
    const r3 = getSecFromTimeValue('00:01:00')
    expect(r3).toBe(60)
    const r4 = getSecFromTimeValue('01:00:00')
    expect(r4).toBe(3600)
    const r5 = getSecFromTimeValue('24:00:00')
    expect(r5).toBe(86400)
    const r6 = getSecFromTimeValue('24:00:01')
    expect(r6).toBe(86401)
    const r7 = getSecFromTimeValue('25:01:01')
    expect(r7).toBe(90061)
  })
  it('[method]: convertSecondsToTime, should return total seconds', () => {
    expect(convertSecondsToTime(0)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    expect(convertSecondsToTime(120)).toEqual({
      hours: 0,
      minutes: 2,
      seconds: 0,
    })
    expect(convertSecondsToTime(3600)).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 0,
    })
    expect(convertSecondsToTime(7322)).toEqual({
      hours: 2,
      minutes: 2,
      seconds: 2,
    })
  })
  it('[method]: formatNumberToString, should return total seconds', () => {
    expect(formatNumberToString(0)).toBe('00')
    expect(formatNumberToString(1)).toBe('01')
    expect(formatNumberToString(10)).toBe('10')
    expect(formatNumberToString(15)).toBe('15')
    expect(formatNumberToString(100)).toBe('100')
  })
  it('[method]: isSameDay, should return a boolean', () => {
    const r1 = isSameDay('2022-03-01', '2022-03-01')
    expect(r1).toBe(true)
    const r2 = isSameDay('2022-03-01', '2022-03-02')
    expect(r2).toBe(false)
    const r3 = isSameDay('2022-03-01', '2022-02-01')
    expect(r3).toBe(false)
    const r4 = isSameDay('2022-03-01', '2021-03-01')
    expect(r4).toBe(false)
  })
  it('[method]: isSameMonth, should return a boolean', () => {
    const r1 = isSameMonth('2022-03-01', '2022-03-01')
    expect(r1).toBe(true)
    const r2 = isSameMonth('2022-03-01', '2022-03-02')
    expect(r2).toBe(true)
    const r3 = isSameMonth('2022-03-01', '2022-02-01')
    expect(r3).toBe(false)
    const r4 = isSameMonth('2022-03-01', '2021-03-01')
    expect(r4).toBe(false)
  })
  it('[method]: isDateBetween, should cover all use cases', () => {
    // Case 1: dateToCheck is between date1 and date2
    expect(isDateBetween('2024-09-15', '2024-09-10', '2024-09-20')).toBe(true)

    // Case 2: dateToCheck is before date1
    expect(isDateBetween('2024-09-05', '2024-09-10', '2024-09-20')).toBe(false)

    // Case 3: dateToCheck is after date2
    expect(isDateBetween('2024-09-25', '2024-09-10', '2024-09-20')).toBe(false)

    // Case 4: dateToCheck is exactly on date1
    expect(isDateBetween('2024-09-10', '2024-09-10', '2024-09-20')).toBe(true)

    // Case 5: dateToCheck is exactly on date2
    expect(isDateBetween('2024-09-20', '2024-09-10', '2024-09-20')).toBe(true)

    // Case 6: date1 and date2 are reversed
    expect(isDateBetween('2024-09-15', '2024-09-20', '2024-09-10')).toBe(true)
  })
  it('[method]: getWeekDaysName, should return an array of week day names', () => {
    const r1 = getWeekDaysName()
    expect(r1).toStrictEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ])
    const r2 = getWeekDaysName('es-ES', 'short')
    expect(r2).toStrictEqual(['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'])
  })
  it('[method]: getMonth, should return a string', () => {
    const r1 = getMonth(1, 'en')
    expect(r1).toBe('January')
    const r2 = getMonth(2, 'es')
    expect(r2).toBe('Febrero')
    const r3 = getMonth()
    expect(r3).toBe('Enero')
  })
  it('[method]: getMonthsName, should return an array of month names', () => {
    const r1 = getMonthsName()
    expect(r1).toStrictEqual([
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
    ])
    const r2 = getMonthsName('es-ES')
    expect(r2).toStrictEqual([
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ])
  })
  it('[method]: getMonthDays, should return an array of arrays of days', () => {
    const r1 = getMonthDays(new Date('2022-03-01'))
    expect(r1.length).toBe(6) // 6 weeks
    expect(r1[0].length).toBe(7) // 7 days per week
  })
  it('[method]: generateWeek, should return an array of 7 days', () => {
    const startDate = new Date('2022-03-01')
    const week = generateWeek(startDate)
    expect(week.length).toBe(7)
    expect(week[0].getDate()).toBe(2) // Day after startDate
    expect(week[6].getDate()).toBe(8) // 7 days after startDate
  })
  it('[method]: getStartOfWeek, should return the start of the week', () => {
    const date = new Date('2022-03-03') // Thursday
    const startOfWeek = getStartOfWeek(date)
    expect(startOfWeek.getDate()).toBe(28) // Previous Monday
    expect(startOfWeek.getMonth()).toBe(1) // February (month index 1)
    const date2 = undefined
    expect(() => getStartOfWeek(date2)).toThrow('Date is required')
  })
  it('[method]: getEndOfWeek, should return the end of the week', () => {
    const date = new Date('2022-03-03') // Thursday
    const endOfWeek = getEndOfWeek(date)
    expect(endOfWeek.getDate()).toBe(6) // Next Sunday
    expect(endOfWeek.getMonth()).toBe(2) // March (month index 2)
  })
  it('[method]: isBiggerDate, should return a boolean', () => {
    expect(isBiggerDate(undefined, undefined)).toBe(false)
    const date1 = new Date('2022-03-01')
    const date2 = new Date('2022-03-02')
    expect(isBiggerDate(date1, date2)).toBe(false)
    expect(isBiggerDate(date2, date1)).toBe(true)
    // when year1 > year2
    const date3 = new Date('2023-03-01')
    expect(isBiggerDate(date3, date1)).toBe(true)
    // when year1 === year2 && month1 > month2
    const date4 = new Date('2022-04-01')
    expect(isBiggerDate(date4, date1)).toBe(true)
  })
  it('[method]: getYearsRange, should return a range of years', () => {
    const year = 2012
    const range = getYearsRange(year)
    expect(range).toStrictEqual([2010, 2022])
  })
  it('[method]: getYearsFromRange, should return an array of years', () => {
    const startYear = 2020
    const endYear = 2032
    const years = getYearsFromRange(startYear, endYear)
    expect(years).toStrictEqual([
      2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031,
    ])
  })
  it('[method]: getUTCDateString, should return the correct UTC date string', () => {
    const date = new Date(Date.UTC(2020, 0, 1, 12, 0, 0, 0))
    const result = getUTCDateString(date)
    expect(result).toBe('2020-01-01T12:00:00.000')
  })
  it('[method]: getUTCDateString, should return the correct UTC date string when no date is given', () => {
    const result = getUTCDateString()
    const now = new Date()
    const expectedYear = now.getUTCFullYear()
    const expectedMonth = String(now.getUTCMonth() + 1).padStart(2, '0')
    const expectedDay = String(now.getUTCDate()).padStart(2, '0')
    const expectedHours = String(now.getUTCHours()).padStart(2, '0')
    const expectedMinutes = String(now.getUTCMinutes()).padStart(2, '0')
    const expectedSeconds = String(now.getUTCSeconds()).padStart(2, '0')
    const expectedMilliseconds = String(now.getUTCMilliseconds()).padStart(
      3,
      '0',
    )

    const expectedDate = `${expectedYear}-${expectedMonth}-${expectedDay}T${expectedHours}:${expectedMinutes}:${expectedSeconds}.${expectedMilliseconds}`

    // Compare up to seconds to avoid milliseconds mismatch due to test execution time
    expect(result.substring(0, 19)).toBe(expectedDate.substring(0, 19))
  })
  it('[method]: deepClone, should clone an object', () => {
    // TODO: deepClone test
    const object = {
      entry1: 'value1',
      entry2: {
        value1: 'value1',
        value2: 'value2',
      },
      entry3: ['value1', 'value2'],
      entry4: new Date('2022-03-01'),
    }
    const clonedObject = deepClone(object)
    console.log('clonedObject', clonedObject)
    expect(clonedObject).toStrictEqual(object)
  })
  it('[method]: deepEqual, should clone an object', () => {
    // TODO: deepEqual test
    const object = {
      entry1: 'value1',
      entry2: {
        value1: 'value1',
        value2: 'value2',
      },
      entry3: ['value1', 'value2'],
      entry4: new Date('2022-03-01'),
      entry5: {
        entry51: {
          value1: 'value1',
          value2: 'value2',
          value3: null,
        },
      },
    }
    const object2 = {
      entry1: 'value1',
      entry2: {
        value1: 'value1',
        value2: 'value2',
      },
      entry3: ['value1', 'value2'],
      entry4: new Date('2022-03-01'),
      entry5: {
        entry51: {
          value1: 'value1',
          value2: 'value2',
          value3: null,
        },
      },
    }
    const object3 = {
      entry1: 'value1',
      entry2: {
        value1: 'value1',
      },
      entry3: ['value1', 'value2'],
      entry4: new Date('2022-03-01'),
    }
    const array1 = ['value1', 'value2']
    const array2 = ['value1', 'value2']
    const array3 = ['value1', 'value3']
    const isEqual1 = deepEqual(array1, array2)
    expect(isEqual1).toBe(true)
    const isEqual2 = deepEqual(array1, array3)
    expect(isEqual2).toBe(false)
    const isEqual3 = deepEqual(object, object2)
    expect(isEqual3).toBe(true)
    const isEqual4 = deepEqual(object, object3)
    expect(isEqual4).toBe(false)
  })
  it('[method]: dropdownContainerVariantsTopCenterCircle', () => {
    const variants = JSON.stringify(dropdownContainerVariantsTopCenterCircle())
    const height = 1000
    expect(variants).toBe(
      JSON.stringify({
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
      }),
    )
  })
  it('[method]: dropdownContainerVariantsLeftCenterCircle', () => {
    const variants = JSON.stringify(dropdownContainerVariantsLeftCenterCircle())
    expect(variants).toBe(
      JSON.stringify({
        open: {
          clipPath: `circle(2200px at 0% 50%)`,
          left: 28,
          transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
            duration: 0.1,
            delayChildren: 0.3,
            staggerChildren: 0.05,
          },
        },
        closed: {
          clipPath: 'circle(0px at 0% 50%)',
          left: 28,
          transition: {
            delay: 0,
            type: 'spring',
            stiffness: 400,
            damping: 40,
          },
        },
      }),
    )
  })
  it('[method]: dropdownContainerVariantsTopLeft', () => {
    const variants = JSON.stringify(dropdownContainerVariantsTopLeft())
    expect(variants).toBe(
      JSON.stringify({
        open: {
          clipPath: `circle(2200px at 0% 0%)`,
          left: 28,
          transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
            duration: 0.1,
            delayChildren: 0.3,
            staggerChildren: 0.05,
          },
        },
        closed: {
          clipPath: 'circle(0px at 0% 0%)',
          left: 28,
          transition: {
            delay: 0,
            type: 'spring',
            stiffness: 400,
            damping: 40,
          },
        },
      }),
    )
  })
  it('[method]: dropdownContainerUpwardsVariants', () => {
    const variants = JSON.stringify(dropdownContainerUpwardsVariants())
    const top = -288
    const height = 1000
    expect(variants).toBe(
      JSON.stringify({
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
      }),
    )
  })
  it('[method]: dropdownContainerVariantsFromTopRight', () => {
    const variants = JSON.stringify(dropdownContainerVariantsFromTopRight())
    const height = 1000
    const left = 'auto'
    expect(variants).toBe(
      JSON.stringify({
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
      }),
    )
  })
  it('[method]: dropdownContainerVariantsRightCenterCircle', () => {
    const variants = JSON.stringify(
      dropdownContainerVariantsRightCenterCircle(),
    )
    expect(variants).toBe(
      JSON.stringify({
        open: {
          clipPath: `circle(2200px at 100% 50%)`,
          left: 28,
          transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
            duration: 0.1,
            delayChildren: 0.3,
            staggerChildren: 0.05,
          },
        },
        closed: {
          clipPath: 'circle(0px at 100% 50%)',
          left: 28,
          transition: {
            delay: 0,
            type: 'spring',
            stiffness: 400,
            damping: 40,
          },
        },
      }),
    )
  })
  it('[method]: fadeInVariants', () => {
    const variants = JSON.stringify(fadeInVariants())
    const y = 20
    const duration = 0.2
    const delay = 0.05
    expect(variants).toBe(
      JSON.stringify({
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
      }),
    )
  })
  it('[method]: fadeInAfterLoaderVariants', () => {
    const variants = JSON.stringify(fadeInAfterLoaderVariants())
    const fadeInDuration = 0.75
    expect(variants).toBe(
      JSON.stringify({
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
      }),
    )
  })
  it('[method]: formatLocalizedDateTime', () => {
    // Specific setup for this test
    Object.defineProperty(navigator, 'language', {
      value: 'es-ES',
      configurable: true,
    })
    jest
      .spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')
      .mockReturnValue({
        timeZone: 'Europe/Madrid',
      })

    // Test logic
    const result = formatLocalizedDateTime('2024-09-04T12:34:56Z')
    expect(result).toEqual({
      date: '4 de septiembre de 2024',
      time: '14:34:56',
    })

    const result1 = formatLocalizedDateTime('invalid-date')
    expect(result1).toEqual({
      date: 'Invalid Date',
      time: 'Invalid Date',
    })

    // Clean up (if necessary)
    jest.restoreAllMocks()
  })
  it('should correctly format a Unix timestamp to HH:MM', () => {
    // Example Unix timestamp: 1629988800 corresponds to 2021-08-26 14:40:00 UTC
    const unixTimestamp = 1629988800
    const date = new Date(unixTimestamp * 1000)

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    const result = formatTimeFromUnix(unixTimestamp)
    expect(result).toBe(`${hours}:${minutes}`)
  })

  it('should return 00:00 for midnight', () => {
    const unixTimestamp = 1609459200 // 2021-01-01 00:00:00 UTC
    const expectedTime = new Date(unixTimestamp * 1000)

    const localTime = expectedTime.toLocaleString()
    const date = new Date(localTime)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    const result = formatTimeFromUnix(unixTimestamp)
    expect(result).toBe(`${hours}:${minutes}`)
  })

  it('should correctly handle single-digit hours and minutes', () => {
    const unixTimestamp = 1617270000 // 2021-04-01 03:06:00 UTC
    const expectedTime = new Date(unixTimestamp * 1000)

    const localTime = expectedTime.toLocaleString()
    const date = new Date(localTime)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    const result = formatTimeFromUnix(unixTimestamp)
    expect(result).toBe(`${hours}:${minutes}`)
  })
  it('[method]: appearFromBelowVariants', () => {
    const variants = JSON.stringify(appearFromBelowVariants())
    const height = 1000
    expect(variants).toBe(
      JSON.stringify({
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
      }),
    )
  })
  it('[method]: arrowVariants', () => {
    const variants = JSON.stringify(arrowVariants())
    expect(variants).toBe(
      JSON.stringify({
        open: { rotate: 180, transition: { duration: 0.25 } },
        closed: { rotate: 0, transition: { duration: 0.25 } },
      }),
    )
  })
  it('[method]: divContainerVariants', () => {
    const variants = JSON.stringify(divContainerVariants())
    const height = 1000
    expect(variants).toBe(
      JSON.stringify({
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
      }),
    )
  })

  it('[method]: shakingVariants', () => {
    const variants = JSON.stringify(shakingVariants())
    expect(variants).toBe(
      JSON.stringify({
        start: {
          rotate: [-1, 1.3, 0],
          transition: {
            delay: 0,
            repeat: Infinity,
            duration: 0.2,
          },
        },
        stop: {
          rotate: 0,
        },
      }),
    )
  })
  it('[method]: liItemVariants', () => {
    const variants = JSON.stringify(liItemVariants())
    expect(variants).toBe(
      JSON.stringify({
        open: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.2 },
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
      }),
    )
  })
  it('[method]: applyFormattingMask, should return a formatted string', () => {
    // TODO: make a better test
    const phoneWithoutDialCode = '665656565'
    const mask = '000.000.000'
    const r1 = applyFormattingMask(phoneWithoutDialCode, mask)
    expect(r1).toBe('00060006000')
  })

  /**
   * getPhoneWithMask,
   * */
  it('[method]: getPhoneWithMask, should return a formatted phone number', () => {
    const data = {
      phone: '+34665665665',
      country: {
        dialCode: '34',
      },
    }
    const r1 = getPhoneWithMask(data)
    expect(r1).toBe('+34 665665665')
    const data2 = {
      phone: '+34',
      country: {
        dialCode: '34',
      },
    }
    const r2 = getPhoneWithMask(data2)
    expect(r2).toBe('+34')
  })

  it('[method]: cleanPhoneNumber, should clean and format phone number', () => {
    const cleanedPhoneNumber1 = cleanPhoneNumber('+34 665 65 65 65')
    expect(cleanedPhoneNumber1).toBe('+34665656565')
    const cleanedPhoneNumber2 = cleanPhoneNumber('+1 (555) 123-4567', true, '+')
    expect(cleanedPhoneNumber2).toBe('15551234567')
  })

  it('[method]: insertCharacter, should insert character in a specific place', () => {
    const insertCharacter1 = insertCharacter('34665656565', 2, '_')
    expect(insertCharacter1).toBe('34_665656565')
    const insertCharacter2 = insertCharacter('34665656565', 12, '_')
    expect(insertCharacter2).toBe('34665656565_')
  })

  it('[method]: formatPhoneToUpdate, ', () => {
    const formatPhoneToUpdate1 = formatPhoneToUpdate('34665656565', '34', 'es')
    expect(formatPhoneToUpdate1).toBe('34_665656565_es')
  })

  it('[method]: getCalendarHeight, should return a number', () => {
    const r1 = getCalendarHeight('days', false)
    expect(r1).toBe(360)
    const r2 = getCalendarHeight('days', true)
    expect(r2).toBe(370)
    const r3 = getCalendarHeight('months', false)
    expect(r3).toBe(325)
    const r4 = getCalendarHeight('months', true)
    expect(r4).toBe(370)
    const r5 = getCalendarHeight('years', false)
    expect(r5).toBe(325)
    const r6 = getCalendarHeight('years', true)
    expect(r6).toBe(370)
  })
})
