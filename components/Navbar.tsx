import style from "../styles/Navbar.module.scss";
import { useRouter } from "next/router";

import Link from "next/link";

import { useState, useEffect } from 'react';

const Navbar = () => {

  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  
  // Chapter mapping
  const chapterMap: { [key: string]: string } = {
    '/': 'I',
    '/about': 'II',
    '/projects': 'III',
    '/open-source': 'IV',
    '/blog': 'V'
  };
  
  const currentChapter = chapterMap[router.pathname] || 
    (router.pathname.includes('/blog') ? 'V' : 
     router.pathname.includes('/projects') ? 'III' : 'I');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <div className={style.navbar}>
      <nav data-chapter={`Chapter ${currentChapter}`}>
        <section className="mobile-menu md:hidden">
          <button
            onClick={toggleTheme}
            className={style.themeToggleMobile}
            aria-label="Toggle theme"
            style={{position: 'fixed', top: '20px', right: '70px', zIndex: 1001}}
          >
            {theme === 'dark' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className={style.sunIcon}>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <g className={style.sunRays}>
                    <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                    <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                    <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                    <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  </g>
                </g>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className={style.moonIcon}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="18" cy="5" r="0.5" fill="currentColor" className={style.star1}/>
                  <circle cx="20" cy="9" r="0.5" fill="currentColor" className={style.star2}/>
                  <circle cx="15" cy="3" r="0.5" fill="currentColor" className={style.star3}/>
                </g>
              </svg>
            )}
          </button>
          <div
            className="hamburger-icon space-y-2"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            style={{cursor: 'pointer', position: 'fixed',  top: '25px', right: '20px', margin: '0', zIndex: 1001}}
          >
            <span className="block h-0.5 w-8 bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-400"></span>
          </div>

          <div className={isMobileNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsMobileNavOpen(false)}
              style={{cursor: 'pointer', zIndex: 1002}}
            >
              <svg
                className="h-8 w-8 text-gray-400"
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
            <ul className="flex flex-col items-center justify-center min-h-[400px]">
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
            Home
          </li>
        </Link>
        <Link href="/about" passHref>
          <li className={router.pathname == "/about" ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
            >
            About
          </li>
        </Link>
        <Link href="/projects" passHref>
          <li
            className={router.pathname == "/projects" || router.pathname.includes('projects')  ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
          >
            Projects
          </li>
        </Link>
        <Link href="/open-source" passHref>
          <li
            className={router.pathname == "/open-source" ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
          >
            Open Source
          </li>
        </Link>
        <Link href="/blog" passHref>
          <li
            className={router.pathname == "/blog" || router.pathname.includes('blog') ? `${style.active}` : ""}
            style={{marginLeft: '0px'}}
          >
            Blog
          </li>
        </Link>
        </ul>
        <button
          onClick={toggleTheme}
          className={style.themeToggle}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g className={style.sunIcon}>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <g className={style.sunRays}>
                  <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                </g>
              </g>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g className={style.moonIcon}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="18" cy="5" r="0.5" fill="currentColor" className={style.star1}/>
                <circle cx="20" cy="9" r="0.5" fill="currentColor" className={style.star2}/>
                <circle cx="15" cy="3" r="0.5" fill="currentColor" className={style.star3}/>
              </g>
            </svg>
          )}
        </button>
      </nav>
      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: fixed;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: 1000;
          background-color: var(--bg-primary);
          backdrop-filter: blur(10px);
        }
        .showMenuNav ul {
          background-color: transparent;
          padding-top: 60px;
        }
        .${style.themeToggleMobile} {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border-primary);
          background: var(--bg-secondary);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .${style.themeToggleMobile}:hover {
          background: var(--accent-primary);
          color: var(--bg-primary);
        }
    `}</style>
    </div>
  );
};

export default Navbar;
