import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx>{`
        @keyframes moonPhase {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        
        @keyframes sunRays {
          0%, 100% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes glowPulse {
          0%, 100% { 
            box-shadow: 
              0 0 20px rgba(212, 175, 55, 0.3),
              0 0 40px rgba(212, 175, 55, 0.1),
              inset 0 0 20px rgba(212, 175, 55, 0.05);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(212, 175, 55, 0.5),
              0 0 60px rgba(212, 175, 55, 0.2),
              inset 0 0 25px rgba(212, 175, 55, 0.1);
          }
        }
        
        .theme-toggle-custom {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--accent-primary);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: visible;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 0 15px rgba(var(--accent-primary-rgb), 0.2),
            inset 0 0 15px rgba(var(--accent-primary-rgb), 0.05);
        }
        
        .theme-toggle-custom:hover {
          border-color: var(--accent-secondary);
          animation: glowPulse 2s ease-in-out infinite;
        }
        
        .theme-toggle-custom:active {
          transform: scale(0.95);
        }
        
        .icon-container {
          position: relative;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .moon-icon {
          animation: moonPhase 4s ease-in-out infinite;
        }
        
        .sun-rays {
          animation: sunRays 20s linear infinite;
          transform-origin: center;
        }
      `}</style>
      
      <button
        onClick={toggleTheme}
        className="theme-toggle-custom"
        aria-label="Toggle theme"
      >
        <div className="icon-container">
          {theme === 'dark' ? (
            // Custom animated moon icon
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="moon-icon"
            >
              <defs>
                <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-primary)" />
                  <stop offset="100%" stopColor="var(--accent-secondary)" />
                </linearGradient>
              </defs>
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke="url(#moonGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Animated stars */}
              <circle cx="18" cy="5" r="0.5" fill="var(--accent-secondary)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="20" cy="9" r="0.5" fill="var(--accent-primary)">
                <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="15" cy="3" r="0.5" fill="var(--accent-secondary)">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          ) : (
            // Custom animated sun icon
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8860B" />
                  <stop offset="100%" stopColor="#DAA520" />
                </linearGradient>
              </defs>
              {/* Sun core */}
              <circle cx="12" cy="12" r="4" fill="none" stroke="url(#sunGradient)" strokeWidth="1.5" />
              {/* Animated rays */}
              <g className="sun-rays">
                <line x1="12" y1="2" x2="12" y2="5" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="12" y1="19" x2="12" y2="22" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="2" y1="12" x2="5" y2="12" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="19" y1="12" x2="22" y2="12" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              </g>
            </svg>
          )}
        </div>
      </button>
    </>
  
  );
};

export default ThemeToggle;