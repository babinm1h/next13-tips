import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.extend(weekday)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

export function getWeakShort(): string[] {
  return dayjs.weekdaysShort()
}

export function getMonths(): string[] {
  return dayjs.months()
}

export function getMonthByDate(date: string): number {
  return dayjs(date).get('month')
}

export function getYearByDate(date: string): number {
  return dayjs(date).get('year')
}

export function isToday(date: string): boolean {
  const d = dayjs(date)
  const now = dayjs()
  return d.year() === now.year() && d.month() === now.month() && d.date() === now.date()
}

export function getNextMonthDate(date: string): string {
  const currentMonth = getMonthByDate(date)
  return dayjs()
    .set('month', currentMonth === 11 ? 0 : currentMonth + 1)
    .toISOString()
}

export function getPrevMonthDate(date: string): string {
  const currentMonth = getMonthByDate(date)
  return dayjs()
    .set('month', currentMonth === 0 ? 11 : currentMonth - 1)
    .toISOString()
}

export function isSameMonth(d1: string, d2: string): boolean {
  const m1 = getMonthByDate(d1)
  const m2 = getMonthByDate(d2)
  return m1 === m2
}

export type TimeAccuracy = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

export function isBefore(date1: string, date2: string, accuracy: TimeAccuracy = 'millisecond'): boolean {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  return d1.isBefore(d2, accuracy)
}

export function isAfter(date1: string, date2: string, accuracy: TimeAccuracy = 'millisecond'): boolean {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  return d1.isAfter(d2, accuracy)
}

export function isSame(date1: string, date2: string, accuracy: TimeAccuracy = 'millisecond'): boolean {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  return d1.isSame(d2, accuracy)
}

export function formatDate(date: string, format?: string): string {
  return dayjs(date).format(format)
}

export function monthFirstDayOfWeek(month: number, year: number): number {
  const firstMonthDate = dayjs(new Date(year, month, 1))
  return firstMonthDate.weekday()
}

export function daysInMonth(month: number, year: number): number {
  const firstMonthDate = dayjs(new Date(year, month, 1))
  return firstMonthDate.daysInMonth()
}

export function addDate(date: string, value: number): string {
  return dayjs(date).date(value).format()
}

export function replaceFormat(date: string, fromFormat: string | undefined, toFormat: string | undefined): string {
  return dayjs(date, fromFormat, true).format(toFormat)
}

export function toISO(date: string, format?: string): string {
  return replaceFormat(date, format, undefined)
}

export function isValidDate(date: string, format?: string): boolean {
  return dayjs(date, format, true).isValid()
}

export function isValidTime(time: string): boolean {
  return new RegExp(/^([01]\d|2[0-3]):[0-5][0-9]$/).test(time)
}

export function getTime(date: string, dateFormat?: string): string {
  const d = dayjs(date, dateFormat, true)
  if (d.isValid()) {
    return d.format('HH:mm')
  }

  return ''
}

export function setTime(date: string, time: string, dateFormat?: string, timeFallback?: string): string {
  if (!isValidTime(time)) {
    if (timeFallback) {
      return setTime(date, timeFallback, dateFormat)
    }

    return date
  }
  const [h, m] = time.split(':').map(Number)
  return dayjs(date, dateFormat, true).set('hours', h).set('minutes', m).format(dateFormat)
}

export function formatInput(date: string, inputDateFormat: string | undefined, dateFormat: string | undefined) {
  return isValidDate(date, inputDateFormat)
    ? date
    : isValidDate(date, dateFormat)
    ? replaceFormat(date, dateFormat, inputDateFormat)
    : isValidDate(date)
    ? replaceFormat(date, undefined, inputDateFormat)
    : date
}

export type DayInfo = {
  day: number
  date: string
}

export function getMonthDays(month: number, year: number): DayInfo[][] {
  const firstMonthDate = new Date(year, month, 1).toISOString()
  const firstDayOfWeek = monthFirstDayOfWeek(month, year)
  const daysCount = daysInMonth(month, year)

  const days = Array.from({length: 6}).map(() =>
    Array.from({length: 7}).map(() => ({
      day: 0,
      date: '',
    })),
  )

  for (let i = 0; i < 42; i++) {
    const week = Math.floor(i / 7)
    const day = i % 7
    if (i < firstDayOfWeek || i - firstDayOfWeek + 1 > daysCount) continue

    days[week][day] = {
      day: i - firstDayOfWeek + 1,
      date: addDate(firstMonthDate, i - firstDayOfWeek + 1),
    }
  }

  return days
}

export function geyYears(): number[] {
  const currentYear = new Date().getFullYear()
  const years = [currentYear]

  for (let i = 1; i <= 100; i++) {
    years.push(currentYear - i)
  }

  for (let i = 1; i <= 10; i++) {
    years.unshift(currentYear + i)
  }

  return years
}
