import { format } from 'date-fns';

export default function convertDateToHour(date) {
  return format(date, 'HH:mm:ss');
}
