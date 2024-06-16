import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  Truck,
  User2,
  Download,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Trips",
          active: pathname.includes("/trips"),
          icon: SquarePen,
          submenus: [
            {
              href: "/trips",
              label: "All Trips",
              active: pathname === "/trips",
            },
            {
              href: "/trips/new",
              label: "New Trip",
              active: pathname === "/trips/new",
            },
          ],
        },
        {
          href: "/vehicles",
          label: "Vehicles",
          active: pathname.includes("/vehicles"),
          icon: Truck,
          submenus: [
            {
              href: "/vehicles",
              label: "All Vehicles",
              active: pathname === "/vehicles",
            },
            {
              href: "/vehicles/new",
              label: "New Vehicle",
              active: pathname === "/vehicles/new",
            },
          ],
        },
        {
          href: "/drivers",
          label: "Drivers",
          active: pathname.includes("/drivers"),
          icon: Users,
          submenus: [
            {
              href: "/drivers",
              label: "All Drivers",
              active: pathname === "/drivers",
            },
            {
              href: "/drivers/new",
              label: "New Driver",
              active: pathname === "/drivers/new",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        // {
        //   href: "/users",
        //   label: "Users",
        //   active: pathname.includes("/users"),
        //   icon: Users,
        //   submenus: [],
        // },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
        {
          href: "/download",
          label: "Download",
          active: pathname.includes("/download"),
          icon: Download,
          submenus: [],
        },
      ],
    },
  ];
}
