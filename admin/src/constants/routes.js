import React from 'react';
import Home from 'pages/info';
import Venues from 'pages/venues';
import Venue from 'pages/venue';
import { UserProfilePage } from 'pages/user';
import { TextIconSpacing } from "@react-md/icon";
import { AddSVGIcon } from '@react-md/material-icons';
import { Button } from "@react-md/button";
import { useHistory } from 'react-router-dom';

const venuesProps = {
  pageActions: {
    title: 'Venues',
    subTitle: 'All of your created venues are below',
    Actions: () => {
      const history = useHistory();

      return (
        <Button
          theme="primary"
          themeType="contained"
          onClick={() => history.push('/venue') }
        >
          <TextIconSpacing icon={<AddSVGIcon />} iconAfter>
            Create new
          </TextIconSpacing>
        </Button>
      )
    }
  }
}

export default [
  {
    path: '/',
    Component: Venues,
    props: venuesProps
  },
  {
    path: '/venues',
    Component: Venues,
    props: venuesProps
  },
  {
    path: '/venue/:id',
    Component: Venue,
  },
  {
    path: '/venue',
    Component: Venue,
  },
  {
    path: '/user/profile',
    Component: UserProfilePage,
  },
  {
    path: '/info',
    Component: Home,
    props: {
      pageActions: {
        title: 'Info',
        subTitle: 'The is the page actions bar'
      }
    }
  },
];

export const unAuthedPaths = [
  '/google-auth',
  '/register',
  '/login',
  '/forgot-password',
  '/reset-password'
]
