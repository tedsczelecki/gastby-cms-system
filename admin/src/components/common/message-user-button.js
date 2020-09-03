import React from 'react';
import {MessageSVGIcon} from "@react-md/material-icons";
import { useHistory } from 'react-router-dom';
import {Button} from "@react-md/button";
import {useMutation} from "@apollo/client";
import {CREATE_CONVERSATION} from "../../queries/conversation";

const MessageUserButton = ({
  buttonType = 'text',
  children,
  className = '',
  theme = 'primary',
  themeType = 'clear',
  userId
}) => {
  const history = useHistory();
  const [createConversation] = useMutation(CREATE_CONVERSATION);

  const handleClick = async () => {
    if (userId) {
      const { data } = await createConversation({
        variables: {
          input: {
            users: [userId]
          }
        }
      });

      history.push(`/my/messages/${data.createConversation.id}`)
    }
  }

  return (
    <Button
      className={className}
      theme="primary"
      buttonType={buttonType}
      themeType={themeType}
      aria-label="Message"
      onClick={() => handleClick() }
    >
      <MessageSVGIcon />
      {children}
    </Button>
  );
};

export default MessageUserButton;
