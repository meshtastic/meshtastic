import React from 'react';

export const HeaderText = ({type, text, link}): JSX.Element => {

  const anchor = React.createElement(
    'a',
    {className: "hash-link", href: `#${link}`, title: "Direct link to heading"}
  )

  const heading = React.createElement(
    type || 'h1',
    link ? {className: "anchor anchorWithHideOnScrollNavbar_node_modules-@docusaurus-theme-classic-lib-next-theme-Heading-styles-module"} : null,
    text, link ? anchor : null
  )

  return heading

};
