import React from 'react';
import { UserAvatar } from 'components/user';
import {PageActions, Paper} from 'components/common';
import { Button } from '@react-md/button';

const UserProfile = () => {
  return (
    <div className="user-profile-page">
      <PageActions
        Actions={() => [
          <Button
            key="save-btn"
            theme="primary"
            themeType="contained"
          >
            Save
          </Button>
        ]}
        Image={() => <UserAvatar />}
        subTitle="Edit your user profile here"
        title="Ted Sczelecki"
      />
      <Paper>
        @TODO add some forms
      </Paper>
    </div>
  );
};

export default UserProfile;
