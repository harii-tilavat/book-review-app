import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import Button from "./comman/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";

interface NavigationModel {
  name: string;
  href: string;
  current: boolean;
  isProtected: boolean;
}

const navigation: Array<NavigationModel> = [
  // { name: "Dashboard", href: "/", current: true, isProtected: false },
  { name: "Add book", href: "/add-book", current: false, isProtected: true },
  { name: "My reviews", href: "/my-reviews", current: false, isProtected: true },
  // { name: "Calendar", href: "#", current: false },
];

export default function Example() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, currentUser, logoutUser } = useAuth();
  const navigationList = navigation.filter((i) => !i.isProtected || isAuthenticated);

  function goToLogin() {
    navigate("/login");
  }
  function isActive(href: string): boolean {
    return location.pathname === href;
  }
  function handleLogout() {
    if (confirm("Are you sure to logout?")) {
      logoutUser();
      navigate("/login");
    }
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
                  <Link key={item.name} to={item.href} aria-current={item.current ? "page" : undefined} className={clsx(isActive(item.href) ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "rounded-md px-3 py-2 text-sm font-medium")}>
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
                  <MenuButton className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium">
                    <span className="sr-only">Open user menu</span>
                    <span>{(currentUser && currentUser.username && currentUser.username[0].toUpperCase()) || "A"}</span> {/* Replace "A" dynamically with the first letter of the username */}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-25 dark:bg-gray-900 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <span className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700 data-[focus]:outline-none">Your Profile</span>
                  </MenuItem>
                  <MenuItem>
                    <span className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700 data-[focus]:outline-none">Settings</span>
                  </MenuItem>
                  <MenuItem>
                    <span className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700 data-[focus]:outline-none" onClick={handleLogout}>
                      Sign out
                    </span>
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
