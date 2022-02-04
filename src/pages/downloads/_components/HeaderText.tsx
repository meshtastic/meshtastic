import React from 'react';

export const HeaderText = ({type, text, link}): JSX.Element => {

  const Header = type;

  return (
    <Header className="anchor anchorWithHideOnScrollNavbar_node_modules-@docusaurus-theme-classic-lib-next-theme-Heading-styles-module">
      {text}
      {link ? <a className="hash-link" href={`#${link}`} title="Direct link to heading"/> : null}
    </Header>
  );

};
