import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isActive, linkMatchesPath } from 'libs/nav';
import { SidebarUserProfile } from 'components/user';
import logo from 'images/logo-white.svg';

import './sidebar.scss';

const SidebarItem = ({
  currentPath,
  icon: Icon,
  isActive = false,
  label: Label,
  link,
}) => {
  const itemClasses = classNames('sidebar__item', {
    'sidebar__item--active': isActive || linkMatchesPath({ currentPath, link }),
  })
  return (
    <Link to={link} className={itemClasses}>
      {Icon && <Icon /> }
      <span>
      {typeof Label === 'function'
        ? <Label />
        : Label}
    </span>
    </Link>
  )
}

const SideBarList = ({
  currentPath,
  links
}) => {

  return links.map((item) => {
        const navActive = isActive({ currentPath, links: item });
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const listClasses = classNames('sidebar__list', {
          'sidebar__list--has-children': hasChildren,
          'sidebar__list--active': navActive,
        });

        return (
          <div className={listClasses} key={item.link}>
            <SidebarItem {...item} currentPath={currentPath} isActive={navActive} />
            {hasChildren && (
              <div className="sidebar__list__children">
                {item.children.map((childItem, i) => {
                  const hasSubChildren = Array.isArray(childItem.children) && childItem.children.length > 0;
                  return (
                    <Fragment key={i} >
                      <SidebarItem {...childItem} currentPath={currentPath} />
                      {hasSubChildren && <SideBarList currentPath={currentPath} links={childItem.children} />}
                    </Fragment>
                  )
                })}
              </div>
            )}
          </div>
        )
      })
}

const Sidebar = ({
  location: {
    pathname,
  },
  navigation,
  userRole,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="Amped Framework"/>
      </div>
      <nav className="sidebar__nav">
        <SideBarList currentPath={pathname} links={navigation} />
      </nav>
      <div className="sidebar__user-info">
        <SidebarUserProfile />
      </div>
    </aside>
  );
};

export default withRouter(Sidebar);

