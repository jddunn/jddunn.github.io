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
      </div>
      <div className={style.pageTotal}>
        of {totalPages}
      </div>
    </div>
  );
};

export default Footer;