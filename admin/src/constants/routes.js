import React from 'react';
import Home from 'pages/info';
import Pages from 'pages/pages';
import Page from 'pages/page';
import Site from 'pages/site';
import Sites from 'pages/sites';
import { UserProfilePage } from 'pages/user';
import { TextIconSpacing } from "@react-md/icon";
import { AddSVGIcon } from '@react-md/material-icons';
import { Button } from "@react-md/button";
import { useHistory } from 'react-router-dom';

const venuesProps = {
  pageActions: {
    title: 'Pages',
    subTitle: 'All of your created pages are below',
    Actions: () => {
      const history = useHistory();

      return (
        <Button
          theme="primary"
          themeType="contained"
          onClick={() => history.push('/page') }
        >
          <TextIconSpacing icon={<AddSVGIcon />} iconAfter>
            New page
          </TextIconSpacing>
        </Button>
      )
    }
  }
}

export default [
  {
    path: '/',
    Component: Pages,
    props: venuesProps
  },
  {
    path: '/pages',
    Component: Pages,
    props: venuesProps
  },
  {
    path: '/page',
    Component: Page,
  },
  {
    path: '/page/:id',
    Component: Page,
  },
  {
    path: '/sites',
    Component: Sites,
  },
  {
    path: '/site',
    Component: Site,
  },
  {
    path: '/site/:id',
    Component: Site,
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
