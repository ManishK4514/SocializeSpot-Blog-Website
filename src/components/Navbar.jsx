import Link from "next/link";
import { HiOutlineLogout } from "react-icons/hi";
import { useState, useEffect } from "react";
import { usePathname } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { ImBooks } from "react-icons/im";

export default function Navbar() {
    const { data: session } = useSession();
    const [pathname, setPathname] = useState("/");

    useEffect(() => {
        const newPathname = window.location.pathname;
        setPathname(newPathname);
        setIsHomePage(newPathname === '/');
        setIsMyBlogPage(newPathname === '/myBlogs');
        setIsWriteBlogPage(newPathname === '/addBlog');
    }, []);


    const [isHomePage, setIsHomePage] = useState('/' === pathname);
    const [isMyBlogPage, setIsMyBlogPage] = useState('/myBlogs' === pathname);
    const [isWriteBlogPage, setIsWriteBlogPage] = useState('/addBlog' === pathname);
    const [isMenuToggled, setIsMenuToggled] = useState(false);

    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            if (!session) {
                setIsRedirecting(true);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [session]);

    if (isRedirecting) {
        redirect("/login");
        return null;
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SocializeSpot</span>
                </Link>
                <div className="flex md:order-2">
                    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <button onClick={() => { setIsMenuToggled(isMenuToggled => !isMenuToggled) }} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href={"/"} className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${isHomePage ? 'md:text-blue-700 md:dark:text-blue-500' : ''} md:p-0`}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/myBlogs"} className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  ${isMyBlogPage ? 'md:text-blue-700 md:dark:text-blue-500' : 'dark:text-white'} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>My Blogs</Link>
                        </li>
                        <li>
                            <Link href={"/addBlog"} className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  ${isWriteBlogPage ? 'md:text-blue-700 md:dark:text-blue-500' : 'dark:text-white'} md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Write Blog</Link>
                        </li>
                        <li>
                            <button onClick={() => { signOut() }} className={`block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {isMenuToggled && (
                <div className="flex flex-col justify-start items-center fixed right-0 bottom-0 h-full w-24 bg-white dark:bg-gray-900 ring-gray-300 dark:ring-gray-700 ring-1 shadow-sm p-4 rounded-l-lg z-50 gap-10">
                    <div className="text-black dark:text-white" onClick={() => {setIsMenuToggled(isMenuToggled => !isMenuToggled)}}>
                        <IoCloseOutline className="w-[25px] h-[25px] mt-10 cursor-pointer" />
                    </div>

                    <div>
                        <Link href={"/"} className={`block py-2 px-3  hover:text-blue-700 rounded bg-transparent ${isHomePage ? 'text-blue-700 dark:text-blue-500' : 'text-black  dark:text-white'} md:p-0`}>
                            <AiFillHome className="w-[25px] h-[25px] cursor-pointer" />
                        </Link>
                    </div>

                    <div>
                        <Link href={"/myBlogs"} className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0  ${isMyBlogPage ? 'text-blue-700 dark:text-blue-500' : 'text-black dark:text-white'} dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700`}>
                            <ImBooks className="w-[25px] h-[25px] cursor-pointer" />
                        </Link>
                    </div>

                    <div>
                        <Link href={"/addBlog"} className={`block py-2 px-3 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 md:p-0  ${isWriteBlogPage ? 'text-blue-700 dark:text-blue-500' : 'text-black dark:text-white '} hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:bg-transparent dark:border-gray-700`}>
                            <FaPencilAlt className="w-[25px] h-[25px] cursor-pointer" />
                        </Link>
                    </div>

                    <div>
                        <button onClick={() => { signOut() }} className={`block py-2 px-3 text-black dark:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                            <HiOutlineLogout className="w-[25px] h-[25px] cursor-pointer" />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}
