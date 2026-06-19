import type { NavigationItem } from "./types";

type NavigationKeySubItem = {
  key: string;
  href: string;
  icon?: string;
};

type NavigationKeyItem = {
  key: string;
  href: string;
  target?: "_blank";
  subItems?: NavigationKeySubItem[];
};

// These are the navigation keys for translation
export const marketingNavigationKeys: NavigationKeyItem[] = [
  {
    key: "howItWorks",
    href: "/#how-it-works",
  },
  {
    key: "memory",
    href: "/#memory",
  },
  {
    key: "privacy",
    href: "/#privacy",
  },
  {
    key: "tryFirstScene",
    href: "/#try-first-scene",
  },
];

export const appNavigationKeys: NavigationKeyItem[] = [
  {
    key: "dashboard",
    href: "/dashboard",
  },
  {
    key: "settings",
    href: "/settings",
  },
  {
    key: "profile",
    href: "/profile",
  },
];

// Legacy exports for compatibility
export const marketingNavigation: NavigationItem[] = [
  {
    title: "How it works",
    href: "/#how-it-works",
  },
  {
    title: "Memory",
    href: "/#memory",
  },
  {
    title: "Privacy",
    href: "/#privacy",
  },
  {
    title: "Try your first scene",
    href: "/#try-first-scene",
  },
];

export const appNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Settings",
    href: "/settings",
  },
  {
    title: "Profile",
    href: "/profile",
  },
];
