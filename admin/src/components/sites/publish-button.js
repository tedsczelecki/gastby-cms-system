import React, { useState } from 'react';
import { Button } from '@react-md/button';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const PUBLISH_SITE = gql`
    mutation PublishSite($id: Int) {
        publishSite(id: $id) {
            status
        }
    }
`

const PublishButton = () => {
  const [publishSite] = useMutation(PUBLISH_SITE);
  const handleClick = async () => {
    await publishSite();
  }
  return (
    <Button
      className="publish-button"
      themeType="contained"
      theme="secondary"
      onClick={handleClick}
    >
      Publish
    </Button>
  );
};

export default PublishButton;
