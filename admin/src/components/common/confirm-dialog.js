import React from 'react';
import {Dialog, DialogContent, DialogFooter, DialogTitle} from "@react-md/dialog";
import {Text} from "@react-md/typography";
import {Button} from "@react-md/button";

const DialogComponent = ({
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel = 'Confirm',
  content = '',
  title = '',
  theme = 'primary',
  themeType = 'contained',
  visible = false,
  onClose = () => {},
  onConfirm = () => {},
}) => {
  return (
    <Dialog
      overlayClassName="confirm-dialog__overlay"
      id="draft-dialog"
      role="alertdialog"
      visible={visible}
      onRequestClose={onClose}
      aria-labelledby="dialog-title"
    >
      { title && (
        <DialogTitle>
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        <Text
          id="dialog-title"
          type="subtitle-1"
          margin="none"
          color="secondary"
        >
          {content}
        </Text>
      </DialogContent>
      <DialogFooter>
        <Button id="dialog-cancel" onClick={onClose}>
          {cancelButtonLabel}
        </Button>
        <Button
          id="dialog-discard"
          onClick={onConfirm}
          theme={theme}
          themeType={themeType}
        >
          {confirmButtonLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DialogComponent;
