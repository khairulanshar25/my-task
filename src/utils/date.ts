/**
 * Formats a given date as a string in 'MM/DD/YYYY, HH:MM:SS' format using the 'en-US' locale.
 *
 * @param date - The date to format, as a `Date` object or an ISO date string.
 * @returns The formatted date string, or an empty string if the input is falsy.
 */
export const formatDate = (date: Date | string): string => {
  if (!date) {
    return ''
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}
