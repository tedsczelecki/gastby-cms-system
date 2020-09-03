import React from 'react';
import {
  AccountBalanceSVGIcon,
  AddSVGIcon,
  DomainSVGIcon,
} from "@react-md/material-icons";
export default [
  {
    label: 'Venues',
    link: '/',
    icon: AccountBalanceSVGIcon,
    children: [
      {
        label: 'All',
        link: '/venues'
      },
      {
        label: () => <div className="sidebar__item--align-center">Create New <AddSVGIcon /></div>,
        link: '/venue',
      }
    ]
  },
  {
    label: 'Info',
    link: '/info',
    icon: DomainSVGIcon
  }
];
