"use client";

import { useTranslations } from "next-intl";

import { Logo } from "./Logo";
import { LocaleLink } from "./locale-link";

export const Footer = () => {
  const t = useTranslations();

  const primaryLinks = [
    {
      name: t("navigation.main.howItWorks"),
      href: "/#how-it-works",
    },
    {
      name: t("navigation.main.memory"),
      href: "/#memory",
    },
    {
      name: t("navigation.main.privacy"),
      href: "/#privacy",
    },
  ];
  const legalLinks = [
    {
      name: t("navigation.footer.legal.terms"),
      href: "/terms",
    },
    {
      name: t("navigation.footer.legal.privacy"),
      href: "/privacy",
    },
    {
      name: t("navigation.footer.legal.cookies"),
      href: "/cookies",
    },
  ];

  return (
    <footer className="border-t border-[#d8c6b8] bg-[#f3eadf] px-5 py-10 text-[#4b3a31] dark:border-[#4c382d] dark:bg-[#120d0a] dark:text-[#decbbb]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <Logo />
          <p className="mt-4 text-sm leading-6 text-[#6e5b50] dark:text-[#c7b09f]">
            {t("landingFooter.description")}
          </p>
          <p className="mt-4 text-xs text-[#7d6a5f] dark:text-[#a99484]">
            {t("common.brand.copyright")}. {t("common.brand.allRightsReserved")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="font-serif text-base font-semibold text-[#2c1d17] dark:text-[#fff4e8]">
              {t("landingFooter.productTitle")}
            </p>
            {primaryLinks.map((link) => (
              <LocaleLink
                key={link.name}
                className="transition-colors hover:text-[#2c1d17] dark:hover:text-[#fff4e8]"
                href={link.href}
              >
                {link.name}
              </LocaleLink>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-serif text-base font-semibold text-[#2c1d17] dark:text-[#fff4e8]">
              {t("landingFooter.trustTitle")}
            </p>
            <span>{t("landingFooter.trust.age")}</span>
            <span>{t("landingFooter.trust.memory")}</span>
            <span>{t("landingFooter.trust.training")}</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-serif text-base font-semibold text-[#2c1d17] dark:text-[#fff4e8]">
              {t("landingFooter.legalTitle")}
            </p>
            {legalLinks.map((link) => (
              <LocaleLink
                key={link.name}
                className="transition-colors hover:text-[#2c1d17] dark:hover:text-[#fff4e8]"
                href={link.href}
              >
                {link.name}
              </LocaleLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
