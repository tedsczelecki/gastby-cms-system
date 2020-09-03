export const linkMatchesPath = ({ currentPath, link }) => {
  return currentPath === link;
}

export const isActive = ({
  currentPath,
  links
}) => {
  const _links = Array.isArray(links)
    ? links.slice(0)
    : [links];
  const recurv = ({ links }) => {
    return links.filter(({ link, children }) => {
      return linkMatchesPath({ currentPath, link }) || (children && recurv({ links: children }).length > 0)
    })
  };

  return recurv({ links: _links }).length > 0
}
