import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  // Handle undefined or null dateString
  if (!dateString) {
    return <time>No date</time>
  }
  
  try {
    const date = parseISO(dateString)
    if (dateString.length === 4) {
      return <time dateTime={dateString}>{format(date, 'yyyy')}</time>
    }
    if (dateString.length === 7) {
      return <time dateTime={dateString}>{format(date,  'LLLL yyyy')}</time>
    }
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
  } catch (error) {
    console.error('Date formatting error:', error)
    return <time>{dateString}</time>
  }
}

export default DateFormatter
