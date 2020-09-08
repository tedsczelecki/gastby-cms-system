import React from 'react';
import {
  AccountBalanceSVGIcon,
  AddSVGIcon,
  DescriptionSVGIcon,
  DomainSVGIcon,
  WebSVGIcon,
} from "@react-md/material-icons";
export default [
  {
    label: 'Pages',
    link: '/',
    icon: DescriptionSVGIcon,
    children: [
      {
        label: 'All',
        link: '/pages'
      },
      {
        label: () => <div className="sidebar__item--align-center">Create New <AddSVGIcon /></div>,
        link: '/page',
      }
    ]
  },
  {
    label: 'Sites',
    link: '/sites',
    icon: WebSVGIcon,
    children: [
      {
        label: 'All',
        link: '/sites'
      },
      {
        label: () => <div className="sidebar__item--align-center">Create New <AddSVGIcon /></div>,
        link: '/site',
      }
    ]
  },
  {
    label: 'Info',
    link: '/info',
    icon: DomainSVGIcon
  }
];
