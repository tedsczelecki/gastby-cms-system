import PropTypes from 'prop-types';
import React, { cloneElement, useState } from 'react';
import ConfirmDialog from './confirm-dialog';

const DialogButton = ({
  cancelButtonLabel = 'Cancel',
  children,
  confirmButtonLabel = 'Confirm',
  content = 'Are you sure?',
  theme = 'primary',
  title,
  onCancel = () => {},
  onConfirm = () => {},

}) => {
  const [visible, setVisible] = useState(false);

  const handleRequestClose = () => {
    setVisible(false);
    onCancel();
  }

  const handConfirmClick = () => {
    setVisible(false);
    onConfirm();
  }

  const activeButton = cloneElement(children, { onClick: () => setVisible(true) });

  return (
    <div className="dialog-button">
      {activeButton}
      <ConfirmDialog
        cancelButtonLabel={cancelButtonLabel}
        confirmButtonLabel={confirmButtonLabel}
        content={content}
        theme={theme}
        title={title}
        visible={visible}
        onCancel={handleRequestClose}
        onConfirm={handConfirmClick}
      />
    </div>
  );
};

DialogButton.propTypes = {
  cancelButtonLabel: PropTypes.string,
  confirmButtonLabel: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  theme: PropTypes.oneOf(['primary', 'error']),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default DialogButton;
