import style from "../styles/Footer.module.scss";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import gameData from "../public/game.json";

const Footer = () => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gameState, setGameState] = useState<{currentRoom?: string}>({});
  
  useEffect(() => {
    // Load game state from localStorage for home page
    if (router.pathname === '/') {
      const savedState = localStorage.getItem('gameState');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          setGameState(parsed);
        } catch (e) {
          console.error('Error parsing game state:', e);
        }
      }
    }
  }, [router.pathname]);
  
  useEffect(() => {
    // Calculate page numbers based on route and content
    const calculatePageNumber = async () => {
      const path = router.pathname;
      const query = router.query;
      
      if (path === '/') {
        // Home page - based on game rooms
        const rooms = gameData.game.rooms;
        const totalRooms = rooms.length;
        setTotalPages(totalRooms);
        
        // Find current room index
        if (gameState.currentRoom) {
          const roomIndex = rooms.findIndex(room => room.name === gameState.currentRoom);
          setPageNumber(roomIndex !== -1 ? roomIndex + 1 : 1);
        } else {
          setPageNumber(1);
        }
      } else if (path === '/about') {
        // About page with tabs
        setTotalPages(3);
        // Check if there's a tab query param or state
        const tab = query.tab || 'about';
        const tabMap: { [key: string]: number } = {
          'about': 1,
          'skills': 2,
          'experience': 3
        };
        setPageNumber(tabMap[tab as string] || 1);
      } else if (path === '/projects') {
        // Projects listing page
        try {
          // Dynamically check for project posts
          const projectFiles = await fetch('/api/projects-count').catch(() => null);
          if (projectFiles) {
            const data = await projectFiles.json();
            setTotalPages(data.count || 1);
            setPageNumber(1);
          } else {
            // Fallback: estimate based on known projects
            setTotalPages(10);
            setPageNumber(1);
          }
        } catch {
          setTotalPages(10);
          setPageNumber(1);
        }
      } else if (path.includes('/projects/')) {
        // Individual project page
        const projectSlug = path.split('/projects/')[1];
        // Set page number based on project order (would need API to get exact order)
        setTotalPages(10);
        setPageNumber(Math.floor(Math.random() * 10) + 1);
      } else if (path === '/blog') {
        // Blog listing page
        try {
          // Dynamically check for blog posts
          const blogFiles = await fetch('/api/blog-count').catch(() => null);
          if (blogFiles) {
            const data = await blogFiles.json();
            setTotalPages(data.count || 1);
            setPageNumber(1);
          } else {
            // Fallback
            setTotalPages(5);
            setPageNumber(1);
          }
        } catch {
          setTotalPages(5);
          setPageNumber(1);
        }
      } else if (path.includes('/blog/')) {
        // Individual blog post
        const blogSlug = path.split('/blog/')[1];
        setTotalPages(5);
        setPageNumber(Math.floor(Math.random() * 5) + 1);
      } else if (path === '/open-source') {
        // GitHub page - single page
        setTotalPages(1);
        setPageNumber(1);
      } else {
        // Default
        setTotalPages(100);
        setPageNumber(1);
      }
    };
    
    calculatePageNumber();
  }, [router.pathname, router.query, gameState]);
  
  // Listen for game state changes on home page
  useEffect(() => {
    if (router.pathname === '/') {
      const handleGameStateChange = (e: StorageEvent) => {
        if (e.key === 'gameState' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setGameState(parsed);
          } catch (error) {
            console.error('Error parsing game state:', error);
          }
        }
      };
      
      window.addEventListener('storage', handleGameStateChange);
      
      // Also check for custom game events
      const handleGameUpdate = (e: CustomEvent) => {
        if (e.detail && e.detail.currentRoom) {
          setGameState(e.detail);
        }
      };
      
      window.addEventListener('gameStateUpdate' as any, handleGameUpdate as any);
      
      return () => {
        window.removeEventListener('storage', handleGameStateChange);
        window.removeEventListener('gameStateUpdate' as any, handleGameUpdate as any);
      };
    }
  }, [router.pathname]);
  
  return (
    <div className={style.footer}>
      <div className={style.pageNumber}>
        — {pageNumber} —
      </div>
      <div>
        <p className={style.find} style={{letterSpacing: '2px'}}>find me on:</p>
        <a
          href="https://www.linkedin.com/in/jdfive/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={style.footerIcon}>
            <BsLinkedin />
          </span>
        </a>
        <a
          href="https://github.com/jddunn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={style.footerIcon}>
            <BsGithub />
          </span>
        </a>
        <a
          href="https://johnnyfived.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={style.footerIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 245.37 220.74"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M31.99 1.37C21.29 7.67.02 32.48.02 54.84v21.4c0 10.86 8.84 19.7 19.7 19.7 11.23 0 20.16-9.18 20.16-20.08 0 10.9 9.21 20.08 20.16 20.08 11.23 0 20.16-9.18 20.16-20.08 0 10.9 9.03 20.08 20.16 20.08 10.92 0 19.7-8.92 19.7-19.7 0 10.78 8.86 19.7 19.7 19.7 11.23 0 20.16-9.18 20.16-20.08 0 10.9 9.21 20.08 20.16 20.08 11.23 0 20.16-9.18 20.16-20.08 0 10.9 9.21 20.08 20.44 20.08 10.86 0 19.7-8.84 19.7-19.7v-21.4c0-22.37-21.02-47.17-31.99-53.48-16.64-4.13-32.04-6.51-48.66-6.51H92.84c-16.64 0-32.04 2.38-48.85 6.51zM45.02 88.5S44.87 88.5 44.74 88.5c-.29.53-.57 1.06-.84 1.62 1.24 19.24 4.38 49.49 16.44 71.48 22.03 40.18 27.59 48.18 34.51 48.18h57.84c6.65 0 11.17-6.75 33.85-48.18 11.76-21.51 14.9-50.48 16.21-69.77-.29-.76-.61-1.48-.94-2.21-.15-.31-.28-.61-.43-.91-4.66 2.26-10.02 3.56-15.67 3.56-11.34 0-20.7-5.28-25.65-13.44-4.95 8.08-14.31 13.44-25.65 13.44-11.13 0-20.43-5.13-25.43-13.04-4.95 7.92-14.31 13.04-25.43 13.04-11.13 0-20.43-5.13-25.65-13.04-4.74 8.08-14.03 13.44-25.37 13.44-6.65 0-12.68-1.86-17.51-4.96v.01c-.08.24-.18.47-.29.69zm48.63 51.12h16.61l-9.16 33.67h23.31v10.01c-.01 0-.01.01-.01.01H88.02c-7.13 0-10.11-11.01 1.61-11.01h8.41L93.65 139.62zm45.2 0h16.61l-4.38 32.67h23.31v11.01h-36.39c-7.13 0-10.33-11.01 1.39-11.01h8.63l-9.16-32.67z"/>
            </svg>
          </span>
        </a>
      </div>
      <div className={style.pageTotal}>
        of {totalPages}
      </div>
    </div>
  );
};

export default Footer;