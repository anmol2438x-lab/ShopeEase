import React, { memo } from "react";

import HeaderRaw from "./Header";
import HeaderMiddleRaw from "./HeaderMiddle";
import HeaderTopRaw from "./HeaderTop";
import SearchAndLocationRaw from "./SearchAndLocation";

// Memoizing components
const Header = memo(HeaderRaw);
const HeaderMiddle = memo(HeaderMiddleRaw);
const HeaderTop = memo(HeaderTopRaw);
const SearchAndLocation = memo(SearchAndLocationRaw);

export { Header, HeaderMiddle, HeaderTop, SearchAndLocation };
