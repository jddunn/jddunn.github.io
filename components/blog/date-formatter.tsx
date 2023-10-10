import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  if (dateString.length === 4) {
    return <time dateTime={dateString}>{format(date, 'yyyy')}</time>
  }
  if (dateString.length === 7) {
    return <time dateTime={dateString}>{format(date,  'LLLL yyyy')}</time>
  }
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default DateFormatter
