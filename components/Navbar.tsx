import style from "../styles/Navbar.module.scss";
import { useRouter } from "next/router";

import Link from "next/link";

import { useState, useEffect } from 'react';

const Navbar = () => {

  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
  }, [isMobileNavOpen]);

  return (
    <div className={style.navbar}>
      <nav>
        <section className="mobile-menu md:hidden">
          <div
            className="hamburger-icon space-y-2 mt-5 mr-5"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            style={{cursor: 'pointer', position: 'fixed',  top: '0', right: '0', margin: '20'}}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isMobileNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsMobileNavOpen(false)}
              style={{cursor: 'pointer'}}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{cursor: 'pointer'}}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <Link href="/" passHref>
                <li className={router.pathname == "/" ? `border-b border-gray-400 
                my-8 ${style.active} font-semibold` : "border-b border-gray-400 my-8 uppercase"}
                style={{marginLeft: '0px'}}
                >
                  HOME
                </li>
              </Link>
              <Link href="/about" passHref>
                <li className={router.pathname == "/about" ? `border-b border-gray-400
                 my-8 ${style.active} font-semibold` : "border-b border-gray-400 my-8 uppercase"}
                 style={{marginLeft: '0px'}}
                 >
                  ABOUT ME
                </li>
              </Link>
              <Link href="/projects" passHref>
                <li
                  className={router.pathname == "/projects" ? `border-b border-gray-400 
                  my-8 ${style.active} font-semibold` : "border-b border-gray-400 my-8 uppercase"}
                  style={{marginLeft: '0px'}}
                >
                  PROJECTS
                </li>
              </Link>
              <Link href="/open-source" passHref>
                <li
                  className={router.pathname == "/open-source" ?
                   `border-b border-gray-400 my-8 ${style.active} font-semibold` : 
                   "border-b border-gray-400 my-8 uppercase"}
                   style={{marginLeft: '0px'}}
                >
                  OPEN SOURCE
                </li>
              </Link>
              <Link href="/blog" passHref>
                <li
                  className={router.pathname == "/blog" || router.pathname.includes('posts') ? 
                  `border-b border-gray-400 my-8 ${style.active} font-semibold` : 
                  "border-b border-gray-400 my-8 uppercase"}
                   style={{marginLeft: '0px'}}
                >
                  BLOG
                </li>
              </Link>
            </ul>
          </div>
        </section>

        <ul className="desktop-menu hidden md:flex">
        <Link href="/" passHref>
          <li className={router.pathname == "/" ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
            >
            __home
          </li>
        </Link>
        <Link href="/about" passHref>
          <li className={router.pathname == "/about" ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
            >
            __about me
          </li>
        </Link>
        <Link href="/projects" passHref>
          <li
            className={router.pathname == "/projects" || router.pathname.includes('projects')  ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
          >
            __projects
          </li>
        </Link>
        <Link href="/open-source" passHref>
          <li
            className={router.pathname == "/open-source" ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
          >
            __open source
          </li>
        </Link>
        <Link href="/blog" passHref>
          <li
            className={router.pathname == "/blog" || router.pathname.includes('blog') ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
          >
            __blog
          </li>
        </Link>
        </ul>
      </nav>
      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: absolute;
          width: 100%;
          min-height: 400px;
          top: 20;
          right: 20;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }
        .mobile-menu ul {
          background-color: rgba(2, 10, 18, 0.95)
        }
    `}</style>
    </div>
  );
};

export default Navbar;
