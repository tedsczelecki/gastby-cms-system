import React from 'react';
import {getFormattedDate} from "../../libs/formatters";

const FormatDate = ({
  date,
  dateFormat = 'MMMM do',
  dateJoinStr = 'at',
  timeFormat = 'h:m a',
  simpifiedLabel = false,
}) => {
  const commentDateFormatted = getFormattedDate({
    date,
    dateFormat,
    dateJoinStr,
    timeFormat,
    simpifiedLabel
  });

  return (
    <div className="formatted-date">
      {commentDateFormatted}
    </div>
  )
};

export default FormatDate;
