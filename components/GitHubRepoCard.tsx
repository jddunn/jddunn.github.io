import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/GitHubRepo.module.scss';

interface Language {
  name: string;
  color: string;
}

interface LanguageEdge {
  node: Language;
  size: number;
}

interface Topic {
  topic: {
    name: string;
  };
}

interface Repository {
  id: string;
  name: string;
  url: string;
  stargazerCount: number;
  description: string;
  forkCount: number;
  primaryLanguage?: Language;
  languages?: {
    edges: LanguageEdge[];
    totalSize: number;
  };
  createdAt: string;
  updatedAt: string;
  homepageUrl?: string;
  openGraphImageUrl?: string;
  isArchived: boolean;
  topics?: {
    nodes: Topic[];
  };
}

interface Props {
  repo: Repository;
  index: number;
}

const GitHubRepoCard: React.FC<Props> = ({ repo, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate language percentages
  const languageStats = repo.languages?.edges.map(edge => ({
    name: edge.node.name,
    color: edge.node.color,
    percentage: ((edge.size / (repo.languages?.totalSize || 1)) * 100).toFixed(1)
  })) || [];

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Get time since last update
  const getTimeSinceUpdate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Updated today';
    if (diffInDays === 1) return 'Updated yesterday';
    if (diffInDays < 30) return `Updated ${diffInDays} days ago`;
    if (diffInDays < 365) return `Updated ${Math.floor(diffInDays / 30)} months ago`;
    return `Updated ${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={styles.repoCard}
      layout={false}
    >
      {/* Main Card Content */}
      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <h3 className={styles.repoName}>
            <span className={styles.repoIcon}>📦</span>
            {repo.name}
          </h3>
          {repo.isArchived && (
            <span className={styles.archivedBadge}>Archived</span>
          )}
        </div>
        
        <div className={styles.statsSection}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>⭐</span>
            <span className={styles.statValue}>{repo.stargazerCount}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🔱</span>
            <span className={styles.statValue}>{repo.forkCount}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className={styles.description}>{repo.description || 'No description available'}</p>

      {/* Language Bar */}
      {languageStats.length > 0 && (
        <div className={styles.languageBar}>
          {languageStats.map((lang, idx) => (
            <div
              key={idx}
              className={styles.languageSegment}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color || '#858585'
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
      )}

      {/* Primary Language & Update Time */}
      <div className={styles.metaInfo}>
        {repo.primaryLanguage && (
          <div className={styles.primaryLanguage}>
            <span 
              className={styles.languageDot} 
              style={{ backgroundColor: repo.primaryLanguage.color || '#858585' }}
            />
            <span>{repo.primaryLanguage.name}</span>
          </div>
        )}
        <div className={styles.updateTime}>
          {getTimeSinceUpdate(repo.updatedAt)}
        </div>
      </div>

      {/* Topics */}
      {repo.topics?.nodes && repo.topics.nodes.length > 0 && (
        <div className={styles.topics}>
          {repo.topics.nodes.map((topicNode, idx) => (
            <span key={idx} className={styles.topic}>
              {topicNode.topic.name}
            </span>
          ))}
        </div>
      )}

      {/* Expandable Details Button */}
      <button
        className={styles.expandButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Hide' : 'Show'} Details</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={styles.expandIcon}
        >
          ▼
        </motion.span>
      </button>

      {/* Expanded Content */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: '1000px', opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.expandedContent}
            style={{ overflow: 'hidden' }}
          >
            {/* Language Statistics */}
            {languageStats.length > 0 && (
              <div className={styles.languageStats}>
                <h4>Language Breakdown</h4>
                <div className={styles.languageList}>
                  {languageStats.map((lang, idx) => (
                    <div key={idx} className={styles.languageItem}>
                      <div className={styles.languageInfo}>
                        <span 
                          className={styles.dot} 
                          style={{ backgroundColor: lang.color || '#858585' }}
                        />
                        <span className={styles.name}>{lang.name}</span>
                      </div>
                      <div className={styles.percentage}>{lang.percentage}%</div>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progress}
                          style={{ 
                            width: `${lang.percentage}%`,
                            backgroundColor: lang.color || '#858585'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Repository Stats */}
            <div className={styles.repoStats}>
              <div className={styles.statCard}>
                <span className={styles.label}>Created</span>
                <span className={styles.value}>{formatDate(repo.createdAt)}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.label}>Last Updated</span>
                <span className={styles.value}>{formatDate(repo.updatedAt)}</span>
              </div>
              {repo.homepageUrl && (
                <div className={styles.statCard}>
                  <span className={styles.label}>Homepage</span>
                  <a 
                    href={repo.homepageUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className={styles.link}
                  >
                    Visit Site →
                  </a>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noreferrer"
                className={styles.primaryButton}
              >
                <span>View on GitHub</span>
                <span className={styles.arrow}>→</span>
              </a>
              {repo.homepageUrl && (
                <a 
                  href={repo.homepageUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.secondaryButton}
                >
                  <span>Live Demo</span>
                  <span className={styles.external}>↗</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GitHubRepoCard;