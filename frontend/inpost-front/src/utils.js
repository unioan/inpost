import { parseISO, format } from 'date-fns';

export const formatTime = (timeISO) => {
 if (!timeISO) return ''

 try {
  const date = parseISO(timeISO);
  return format(date, 'd MMM H:mm');
 } catch (err) {
  console.error('Invalid date in formatTime:', timeISO, err);
  return '';
 }
}