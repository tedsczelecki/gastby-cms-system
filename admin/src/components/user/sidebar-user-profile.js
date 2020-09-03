import React from 'react';
import { UserAvatarWithName } from 'components/user';
import { DropdownMenu, MenuItemLink } from "@react-md/menu";
import { useMe } from 'hooks';
import {
  MoreVertSVGIcon,
} from "@react-md/material-icons";
import { removeUserToken } from 'services/storage';
import './sidebar-user-profile.scss';

const menuItems = [
  <MenuItemLink href="/user/profile">Profile</MenuItemLink>,
  "separator",
  <MenuItemLink onClick={() => { removeUserToken(); window.location.href = '/login' } }>Logout</MenuItemLink>
]

const SidebarUserProfile = () => {
  const { me } = useMe();

  return (
    <div className="sidebar-user-profile">
      <div className="sidebar-user-profile__avatar">
        <UserAvatarWithName {...me} />
      </div>
      <div className="sidebar-user-profile__menu">
        <DropdownMenu
          id="profile-dropdown"
          items={menuItems}
          buttonType="icon"
          aria-label="Options..."
        >
          <MoreVertSVGIcon />
        </DropdownMenu>
      </div>

    </div>
  );
}

export default SidebarUserProfile;
