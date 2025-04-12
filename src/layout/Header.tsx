
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-3 border-b-2 border-b-amber-500">
      <div>
        LOGO
      </div>

      <div className="flex justify-between gap-2">
      <Link href="">Link</Link>
      <Link href="">Link</Link>
      <Link href="">Link</Link>
      <Link href="">Link</Link>
      </div>

      
    </div>
  );
};

export default Header;
