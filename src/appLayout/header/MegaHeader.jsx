import React, { useState } from "react";

import { Header, HeaderMiddle, HeaderTop } from "./index";

function MegaHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <HeaderTop />
      <HeaderMiddle mobileMenu={{ mobileMenuOpen, setMobileMenuOpen }} />
      <Header mobileMenuOpen={mobileMenuOpen} />
    </>
  );
}

export default MegaHeader;
