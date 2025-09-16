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
            style={{
              position: 'fixed',
              top: '20px',
              right: '65px',
              zIndex: 1002,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid var(--accent-primary)',
              background: 'var(--bg-primary)',
              color: 'var(--accent-primary)',
              display: 'flex !important',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-primary)';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
          >
            {theme === 'dark' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: 'inherit'}}>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: 'inherit'}}>
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
            style={{
              cursor: 'pointer',
              position: 'fixed',
              top: '15px',
              right: '15px',
              margin: '0',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '10px'
            }}
          >
            <span className="block h-0.5 w-8" style={{backgroundColor: 'var(--accent-primary)'}}></span>
            <span className="block h-0.5 w-8" style={{backgroundColor: 'var(--accent-primary)'}}></span>
            <span className="block h-0.5 w-8" style={{backgroundColor: 'var(--accent-primary)'}}></span>
          </div>

          <div className={isMobileNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              listStyle: 'none',
              padding: '60px 0 0 0',
              margin: 0,
              position: 'relative'
            }}>
              <div
                className="close-button"
                onClick={() => setIsMobileNavOpen(false)}
                style={{
                  position: 'absolute',
                  top: '80px',
                  right: '30px',
                  cursor: 'pointer',
                  zIndex: 1002,
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(var(--accent-primary-rgb), 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(var(--accent-primary-rgb), 0.2)';
                  e.currentTarget.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(var(--accent-primary-rgb), 0.1)';
                  e.currentTarget.style.transform = 'rotate(0deg)';
                }}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{color: 'var(--accent-primary)'}}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <li 
                onClick={() => { router.push('/'); setIsMobileNavOpen(false); }}
                className={router.pathname == "/" ? `${style.active} font-semibold` : ""}
                style={{
                  padding: '0.75rem 2rem',
                  margin: '1rem 0',
                  borderBottom: '1px solid var(--accent-primary)',
                  color: router.pathname == "/" ? 'var(--accent-primary)' : 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em'
                }}
                >
                  HOME
                </li>
              <li 
                onClick={() => { router.push('/about'); setIsMobileNavOpen(false); }}
                className={router.pathname == "/about" ? `${style.active} font-semibold` : ""}
                 style={{
                   padding: '0.75rem 2rem',
                   margin: '1rem 0',
                   borderBottom: '1px solid var(--accent-primary)',
                   color: router.pathname == "/about" ? 'var(--accent-primary)' : 'var(--text-primary)',
                   transition: 'all 0.3s ease',
                   cursor: 'pointer',
                   textTransform: 'uppercase',
                   fontSize: '1.1rem',
                   letterSpacing: '0.1em'
                 }}
                 >
                  ABOUT ME
                </li>
              <li
                onClick={() => { router.push('/projects'); setIsMobileNavOpen(false); }}
                className={router.pathname == "/projects" ? `${style.active} font-semibold` : ""}
                style={{
                  padding: '0.75rem 2rem',
                  margin: '1rem 0',
                  borderBottom: '1px solid var(--accent-primary)',
                  color: router.pathname == "/projects" ? 'var(--accent-primary)' : 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em'
                }}
              >
                PROJECTS
              </li>
              <li
                onClick={() => { router.push('/open-source'); setIsMobileNavOpen(false); }}
                className={router.pathname == "/open-source" ?
                 `${style.active} font-semibold` : 
                 ""}
                 style={{
                   padding: '0.75rem 2rem',
                   margin: '1rem 0',
                   borderBottom: '1px solid var(--accent-primary)',
                   color: router.pathname == "/open-source" ? 'var(--accent-primary)' : 'var(--text-primary)',
                   transition: 'all 0.3s ease',
                   cursor: 'pointer',
                   textTransform: 'uppercase',
                   fontSize: '1.1rem',
                   letterSpacing: '0.1em'
                 }}
              >
                OPEN SOURCE
              </li>
              <li
                onClick={() => { router.push('/blog'); setIsMobileNavOpen(false); }}
                className={router.pathname == "/blog" || router.pathname.includes('posts') ? 
                `${style.active} font-semibold` : 
                ""}
                 style={{
                   padding: '0.75rem 2rem',
                   margin: '1rem 0',
                   borderBottom: '1px solid var(--accent-primary)',
                   color: router.pathname == "/blog" || router.pathname.includes('posts') ? 'var(--accent-primary)' : 'var(--text-primary)',
                   transition: 'all 0.3s ease',
                   cursor: 'pointer',
                   textTransform: 'uppercase',
                   fontSize: '1.1rem',
                   letterSpacing: '0.1em'
                 }}
              >
                BLOG
              </li>
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
      <style jsx>{`
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
          background: var(--bg-primary);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .showMenuNav ul {
          background-color: transparent;
          padding-top: 60px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .showMenuNav li {
          padding: 0.75rem 2rem;
          margin: 2rem 0;
          cursor: pointer;
          position: relative;
          font-family: 'Crimson Text', serif;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          list-style: none;
          text-transform: uppercase;
          font-size: 1.1rem;
        }
        .showMenuNav li:hover {
          color: var(--accent-secondary) !important;
          transform: translateX(10px);
        }
      `}</style>
    </div>
  );
};

export default Navbar;
