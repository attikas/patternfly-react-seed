import React, { FunctionComponent } from 'react'; // importing FunctionComponent

type MenuProps = {
  title: string;
  paragraph: string;
};

export const Menu: FunctionComponent<MenuProps> = ({ title, paragraph }) => (
  <aside>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </aside>
);
export default Menu;
