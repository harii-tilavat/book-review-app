import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import Button from "./comman/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

interface NavigationModel {
  name: string;
  href: string;
  current: boolean;
  isProtected: boolean;
}

const navigation: Array<NavigationModel> = [
  { name: "Dashboard", href: "/", current: true, isProtected: false },
  { name: "Add book", href: "/add-book", current: false, isProtected: true },
  { name: "My reviews", href: "/my-reviews", current: false, isProtected: true },
  // { name: "Calendar", href: "#", current: false },
];

export default function Example() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = false;
  const navigationList = navigation.filter((i) => !i.isProtected || isAuthenticated);
  console.log("LOCATION : ", location);
  function goToLogin() {
    navigate("/login");
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link className="flex shrink-0 items-center gap-1" to={"/"}>
              {/* <img alt="Your Company" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" className="h-8 w-auto" /> */}
              <span className="h-10 w-10 text-blue-500">
                <BookOpenIcon />
              </span>
              <span className="text-blue-100 rounded-md px-3 py-2 text-lg font-medium">BookReviewHub</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex space-x-4">
                {navigationList.map((item: NavigationModel) => (
                  <Link key={item.name} to={item.href} aria-current={item.current ? "page" : undefined} className={clsx(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "rounded-md px-3 py-2 text-sm font-medium")}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Dark mode toggle button */}
            <button onClick={toggleTheme} className="relative rounded-full p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="sr-only">Toggle dark mode</span>
              {theme === "dark" ? <SunIcon className="h-6 w-6 text-yellow-500" /> : <MoonIcon className="h-6 w-6 text-blue-400" />}
            </button>

            {/* Notifications */}
            {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}

            {/* Login / Signup button */}
            {!isAuthenticated && <Button onClick={goToLogin}>Login / Sign Up</Button>}
            {/* Profile dropdown */}
            {isAuthenticated && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="size-8 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigationList.map((item) => (
            <DisclosureButton key={item.name} as="a" href={item.href} aria-current={item.current ? "page" : undefined} className={clsx(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")}>
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
