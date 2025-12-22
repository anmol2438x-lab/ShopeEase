import React, { memo } from "react";

import FooterRaw from "./Footer";
import FooterCopyrightRaw from "./FooterCopyright";
import NewsLetterSectionRaw from "./NewsLetterSection";
import ShippingBenefitsRaw from "./ShippingBenefits";

// Memoizing components
const Footer = memo(FooterRaw);
const FooterCopyright = memo(FooterCopyrightRaw);
const NewsLetterSection = memo(NewsLetterSectionRaw);
const ShippingBenefits = memo(ShippingBenefitsRaw);

export { Footer, FooterCopyright, ShippingBenefits, NewsLetterSection };
