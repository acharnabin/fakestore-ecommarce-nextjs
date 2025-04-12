import React from "react";
import Header from "./Header";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Header />

      <div>{children}</div>

      <footer>This is footer</footer>
    </div>
  );
};

export default Layout;
