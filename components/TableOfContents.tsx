import React, { useState, useEffect } from 'react';
import styles from '../styles/TableOfContents.module.scss';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  contentSelector = '.post-content, .project-content, [data-toc-content]' 
}) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const extractHeadings = () => {
      const contentElement = document.querySelector(contentSelector);
      if (!contentElement) return;

      const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const items: TOCItem[] = [];

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        let id = heading.id;
        
        // Generate ID if not present
        if (!id) {
          id = heading.textContent?.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim() + `-${index}`;
          heading.id = id;
        }

        items.push({
          id,
          text: heading.textContent || '',
          level
        });
      });

      setTocItems(items);
      setIsVisible(items.length > 0);
    };

    // Extract headings after component mounts and content loads
    const timer = setTimeout(extractHeadings, 500);
    
    // Also re-extract if content changes
    const observer = new MutationObserver(extractHeadings);
    const contentElement = document.querySelector(contentSelector);
    if (contentElement) {
      observer.observe(contentElement, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [contentSelector]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
      // Find the currently visible heading
      let currentActiveId = '';
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.getBoundingClientRect().top <= 100) {
          currentActiveId = heading.id;
          break;
        }
      }
      
      setActiveId(currentActiveId);
    };

    if (tocItems.length > 0) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Set initial active item
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible || tocItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.tocContainer}>
      <div className={styles.tocHeader}>
        <h4 className={styles.tocTitle}>
          <span className={styles.tocIcon}>📖</span>
          Table of Contents
        </h4>
      </div>
      
      <nav className={styles.tocNav}>
        <ul className={styles.tocList}>
          {tocItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.tocItem} ${styles[`level${item.level}`]} ${
                activeId === item.id ? styles.active : ''
              }`}
            >
              <button
                className={styles.tocLink}
                onClick={() => scrollToHeading(item.id)}
                title={item.text}
              >
                <span className={styles.tocBullet}>◦</span>
                <span className={styles.tocText}>{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;