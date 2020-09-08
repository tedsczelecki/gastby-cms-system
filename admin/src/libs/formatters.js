import {format, isToday, isYesterday} from "date-fns";

export const getFormattedDate = ({
  date,
  dateFormat = 'MMMM do',
  dateJoinStr = 'at',
  timeFormat = 'h:m a',
  simpifiedLabel = true,
}) => {

  const _date = typeof date === 'string'
    ? new Date(date)
    : date;

  const timeFormatted = format(_date, timeFormat);

  if (isToday(_date)) {
    return simpifiedLabel
      ? timeFormatted
      : `Today ${dateJoinStr} ${timeFormatted}`;
  }

  if (isYesterday(_date)) {
    return simpifiedLabel
      ? 'Yesterday'
      : `Yesterday ${dateJoinStr} ${timeFormatted}`
  }

  return format(_date, dateFormat);
}

export const getFormattedSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to   = "aaaaeeeeiiiioooouuuunc------";
  for (let i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
