import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { FaUser, FaBell, FaFolder } from "react-icons/fa";

interface NavbarItem {
  name: string;
  icon: IconType;
  href: string;
}

export default function Navbar(props: { active: string }) {
  const items: NavbarItem[] = [
    {
      name: "รายการ",
      icon: FaFolder,
      href: "/",
    },
    {
      name: "แจ้งเตือน",
      icon: FaBell,
      href: "/notification",
    },
    {
      name: "บัญชีของฉัน",
      icon: FaUser,
      href: "/user",
    },
  ];

  return (
    <div className="navbar flex items-center justify-around">
      {items.map((icon) => {
        if (props.active == icon.href) {
            return (
                <Link
                  key={icon.name}
                  href={icon.href}
                  className="flex flex-col justify-end items-center gap-1 cursor-pointer"
                >
                  <div>
                    <icon.icon className="text-xl fill-black" />
                  </div>
                  <div className="text-sm font-bold text-black">{icon.name}</div>
                </Link>
              );
        }
        return (
            <Link
              key={icon.name}
              href={icon.href}
              className="flex flex-col justify-end items-center gap-1 cursor-pointer"
            >
              <div>
                <icon.icon className="text-xl fill-gray" />
              </div>
              <div className="text-sm font-bold text-gray">{icon.name}</div>
            </Link>
          );
      })}
    </div>
  );
}
