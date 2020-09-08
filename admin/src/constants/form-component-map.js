import React from 'react';
import {
  TextField,
} from '@react-md/form';
import FormFile from 'components/form/file';
import Textarea from 'components/form/textarea';
import Code from 'components/form/code';

export default {
  code: {
    component: Code,
  },
  file: {
    component: FormFile,
  },
  text: {
    component: ({ onChange, ...props}) => {
      return (
        <TextField
          {...props}
          onChange={(evt) => onChange(evt.target.value) }
        />
      )
    },
  },
  textarea: {
    component: Textarea,
  }
};
