//use  new intl date format
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
