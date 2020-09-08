import classNames from 'classnames';
import React, { useEffect } from 'react';
import { UPLOAD_FILE } from 'queries/file';
import { useMutation } from '@apollo/react-hooks';

import './file.scss';

const FormFileComponent = ({
  label,
  componentProps = {},
  value,
  onChange,
  ...props
}) => {

  const [uploadFile, { data }] = useMutation(UPLOAD_FILE);

  const handleChange = ({
    target: {
      validity,
      files: [file],
    },
  }) =>
    validity.valid &&
    uploadFile({ variables: { file } }).then(() => {
      // apolloClient.resetStore();
    });

    useEffect(() => {
      if (data && data.uploadFile && data.uploadFile) {
        onChange(data.uploadFile);
      }
    }, [data, onChange])

  const fileData = value || (data && data.uploadFile);
  const containerClasses = classNames('form-file__container', {
    'form-file__container--creating': !fileData,
  })

  return (
    <div className="form-file">
      {label && (
        <div className="form-file__label">
          {label}
        </div>
      )}
      <div className={containerClasses}>
        {fileData && fileData.url && (
          <div className="form-file__image">
            <img src={fileData.url} alt=""/>
          </div>
        )}
        <input className="form-file__input" type="file" onChange={handleChange}/>

        <div className="form-file__cta">
          {fileData ? 'Change' : 'Upload'}
        </div>
      </div>
      {/*<FileInput*/}
      {/*  theme="clear"*/}
      {/*  themeType="outline"*/}
      {/*  buttonType="text"*/}
      {/*  {...componentProps}*/}
      {/*  {...props}*/}
      {/*  onChange={handleChange}*/}
      {/*>*/}
      {/*  Upload*/}
      {/*</FileInput>*/}
    </div>
  );
};

export default FormFileComponent;
