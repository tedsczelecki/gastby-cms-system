import React from 'react';
import './code.scss';

const Code = ({
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className="rp-code">
      <div className="rp-code__label">
        {label}
      </div>
      <textarea className="rp-code__textarea" onChange={(evt) => onChange(evt.target.value) }>{value}</textarea>
    </div>
  );
};

export default Code;
