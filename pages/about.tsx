/* eslint-disable react/jsx-no-comment-textnodes */
import style from "../styles/About.module.scss";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const About = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const router = useRouter();
  
  const totalPages = 3;

  // Update URL query when page changes
  const handlePageChange = (page: number) => {
    if (isFlipping || page === currentPage) return;
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      const pageNames = ['about', 'skills', 'experience'];
      router.push({
        pathname: '/about',
        query: { tab: pageNames[page] }
      }, undefined, { shallow: true });
      setIsFlipping(false);
    }, 300);
  };
  
  // Set initial page from URL query
  useEffect(() => {
    const tab = router.query.tab as string;
    const pageMap: { [key: string]: number } = {
      'about': 0,
      'skills': 1,
      'experience': 2
    };
    if (tab && pageMap[tab] !== undefined) {
      setCurrentPage(pageMap[tab]);
    }
  }, [router.query]);

  const skills = {
    'Languages': ['Python', 'TypeScript', 'JavaScript', 'Go', 'Scala', 'SQL', 'Solidity'],
    'Frontend': ['React', 'Next.js', 'Redux', 'Vue', 'Nuxt', 'Tailwind', 'D3.js', 'three.js'],
    'Backend': ['FastAPI', 'Django', 'Node.js (Express, NestJS)', 'gRPC', 'GraphQL', 'RabbitMQ'],
    'AI/ML': ['PyTorch', 'TensorFlow', 'Keras', 'LangChain', 'LlamaIndex', 'Transformers', 'Hugging Face', 'Scikit-learn', 'spaCy', 'Pandas', 'NumPy', 'OpenCV', 'CUDA', 'XGBoost', 'Stable Diffusion', 'Claude', 'OpenAI'],
    'Databases': ['PostgreSQL', 'Redis', 'Pinecone', 'MongoDB', 'Elasticsearch', 'Weaviate'],
    'DevOps': ['AWS (Lambda, EC2, EBS, RedShift)', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'],
    'Tools/Other': ['Unity3D', 'Adobe Creative Suite', 'Electron', 'Capacitor', 'Android Studio', 'Quasar', 'Selenium', 'Puppeteer']
  };

  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const pages = [
    // Page 1 - About
    <div className={style.pageContent} key="about">
      <div className={style.pageHeader}>
        <h2 className={style.chapterTitle}>Page 1</h2>
        <h3 className={style.chapterSubtitle}>Introduction</h3>
      </div>
      
      <div className={style.pageBody}>
        <p className={style.firstParagraph}>
          <span className={style.dropCap}>I</span>'ve worked both as a NLP Engineer and a full-stack engineer specializing in building and deploying end-to-end AI/ML systems.
          With experience creating RAG pipelines, fine-tuning LLMs, and architecting scalable backend microservices in Python and TypeScript, and monorepos in TS, I 
          aim to bridge gaps between SOTA frameworks and techniques with practical product features.
        </p>
        <p>
          My journey spans from enterprise AI assistants at Amelia.ai to building ML delivery infrastructure at eBay,
          developing blockchain systems at Tilting Point (including rescuing $1M+ in MATIC), and consulting for companies
          like Linkby, Grapple Research, and ImmenseX on cutting-edge ML solutions.
        </p>
        
        <p>
          With a BFA in Design and Technology / Game Design from Parsons (2017), I bring a unique perspective combining technical excellence
          with creative problem-solving. This dual approach drives my work at <a href="https://manic.agency" target="_blank" rel="noreferrer" 
          className={style.link}>Manic.agency</a>, where I collaborate on open-source projects and publish technical writing at The Looking Glass.
        </p>
        
      </div>
    </div>,
    
    // Page 2 - Skills
    <div className={style.pageContent} key="skills">
      <div className={style.pageHeader}>
        <h2 className={style.chapterTitle}>Page 2</h2>
        <h3 className={style.chapterSubtitle}>Technical Compendium</h3>
      </div>
      
      <div className={style.pageBody}>
        <div className={style.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={style.skillSection}>
              <h4 className={style.skillCategory}>{category}</h4>
              <div className={style.skillList}>
                {items.map((skill, i) => (
                  <span key={i} className={style.skillItem}>
                    {skill}{i < items.length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    
    // Page 3 - Experience
    <div className={style.pageContent} key="experience">
      <div className={style.pageHeader}>
        <h2 className={style.chapterTitle}>Page 3</h2>
        <h3 className={style.chapterSubtitle}>Professional Chronicle</h3>
      </div>
      
      <div className={style.pageBody}>
        <div className={style.timeline}>
          <div className={style.timelineEntry}>
            <span className={style.year}>2023 — Present</span>
            <h4 className={style.role}>ML Engineer & Product Designer</h4>
            <p className={style.company}>Independent Consultant</p>
            <ul className={style.achievements}>
              <li>Linkby: Built unified ML pipeline automating feature engineering and model training from SQL</li>
              <li>Grapple Research: Improved AI text detection accuracy from 55% to 71%, reduced costs by 64%</li>
              <li>ImmenseX: Built RAG pipeline using Weaviate for conversational AI memory</li>
              <li>HereAfterLegacy: Achieved 74% accuracy on sentiment analysis with random forest</li>
            </ul>
          </div>
          
          <div className={style.timelineEntry}>
            <span className={style.year}>2021 — 2023</span>
            <h4 className={style.role}>Senior Blockchain Engineer</h4>
            <p className={style.company}>Tilting Point, New York</p>
            <ul className={style.achievements}>
              <li>Developed ERC-20/721 smart contracts and REST APIs for NFT marketplace</li>
              <li>Rescued $1M+ in MATIC through reverse engineering deployed contracts</li>
              <li>Architected blockchain state gRPC microservices supporting 1000+ events/sec</li>
            </ul>
          </div>
          
          <div className={style.timelineEntry}>
            <span className={style.year}>2020 — 2021</span>
            <h4 className={style.role}>Software Engineer 2 (Full-Stack)</h4>
            <p className={style.company}>eBay, New York</p>
            <ul className={style.achievements}>
              <li>Built REST APIs in Scala/Spring-Boot for real-time ad rendering (&lt;1s latency)</li>
              <li>Built E2E ML delivery infrastructure (K8s + Jenkins)</li>
              <li>Accelerated deep learning team iteration by 50% with sandboxed UI deployments</li>
            </ul>
          </div>
          
          <div className={style.timelineEntry}>
            <span className={style.year}>2020 — Present</span>
            <h4 className={style.role}>Co-Founder</h4>
            <p className={style.company}>Manic.agency</p>
            <ul className={style.achievements}>
              <li>Building open-source tools and creative projects</li>
              <li>Publishing technical articles and documentation at The Looking Glass</li>
              <li>Operating the Synthetic Publishing Platform (The Rabbit Hole)</li>
              <li>Fostering collaboration between artists and developers</li>
            </ul>
          </div>
          
          <div className={style.timelineEntry}>
            <span className={style.year}>2017 — 2020</span>
            <h4 className={style.role}>Cognitive Implementation Engineer</h4>
            <p className={style.company}>Amelia.ai, New York</p>
            <ul className={style.achievements}>
              <li>Implemented PII redaction and external integrations for enterprise virtual assistant</li>
              <li>Served Fortune 500 clients with conversational AI solutions</li>
            </ul>
          </div>
          
          <div className={style.timelineEntry}>
            <span className={style.year}>2013 — 2017</span>
            <h4 className={style.role}>Bachelor of Fine Arts in Design and Technology</h4>
            <p className={style.company}>Parsons School of Design</p>
            <ul className={style.achievements}>
              <li>5th Place, AT&T National VR and AR Challenge (2017)</li>
              <li>Specialized in Game Design and Interactive Media</li>
              <li>Studied creative coding and physical computing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ];

  return (
    <>
    <NextSeo
      title="Johnny's Place - About Me"
      description="Place for Johnny Dunn. Learn about me here."
    />
    <div className={style.about}>
      <div className={style.bookContainer}>
        
        {/* Book Title */}
        <motion.div 
          className={style.bookTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={style.mainTitle}>
            <span className={style.firstLetter} data-letter="A">A</span>bout Me
          </h1>
          <p className={style.subtitle}>Full-Stack Engineer • ML/AI Specialist • Open-Source Contributor</p>
        </motion.div>

        {/* Book */}
        <motion.div 
          className={style.book}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Left Page (cover with links) */}
          <div className={style.leftPage}>
            <div className={style.coverContent}>
              {/* Decorative SVG Graphics */}
              <svg className={style.coverGraphic} viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                {/* Ornamental border */}
                <rect x="10" y="10" width="280" height="380" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <rect x="20" y="20" width="260" height="360" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                
                {/* Decorative corners */}
                <path d="M 10 40 L 10 10 L 40 10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                <path d="M 260 10 L 290 10 L 290 40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                <path d="M 290 360 L 290 390 L 260 390" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                <path d="M 40 390 L 10 390 L 10 360" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                
                {/* Central ornament */}
                <circle cx="150" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <circle cx="150" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                <path d="M 150 60 L 150 140 M 110 100 L 190 100" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                
                {/* Decorative flourishes */}
                <path d="M 50 180 Q 100 170, 150 180 T 250 180" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <path d="M 50 320 Q 100 330, 150 320 T 250 320" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </svg>
              
              {/* Cover Title */}
              <div className={style.coverTitle}>
                <h2>Johnny Dunn</h2>
                <p></p>
              </div>
              
              {/* Links Section */}
              <div className={style.coverLinks}>
                <a href="mailto:johnnyddunn@gmail.com" className={style.coverLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 5L2 7"/>
                  </svg>
                  <span>Email</span>
                </a>
                <a href="/Johnny_Dunn_Resume_2025.pdf" target="_blank" className={style.coverLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <span>Resume</span>
                </a>
                <a href="https://github.com/jddunn" target="_blank" rel="noreferrer" className={style.coverLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/jdfive/" target="_blank" rel="noreferrer" className={style.coverLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://manic.agency/blog" target="_blank" rel="noreferrer" className={style.coverLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                  <span>Blog</span>
                </a>
              </div>
              
              <div className={style.pageNumber}>1</div>
            </div>
          </div>

          {/* Right Page (content) */}
          <div className={style.rightPage}>
            <AnimatePresence>
              <motion.div
                key={currentPage}
                custom={currentPage}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  rotateY: { type: "spring", stiffness: 200, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  width: '100%',
                  height: '100%',
                }}
              >
                {pages[currentPage]}
              </motion.div>
            </AnimatePresence>
            <div className={style.pageNumber}>{currentPage + 2}</div>
          </div>

          {/* Book Spine */}
          <div className={style.bookSpine}>
            <div className={style.spineText}>ABOUT</div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className={style.navigation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button 
            className={style.navButton}
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0 || isFlipping}
            aria-label="Previous page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={style.pageIndicator}>
            {[0, 1, 2].map((page) => (
              <button
                key={page}
                className={`${style.dot} ${page === currentPage ? style.active : ''}`}
                onClick={() => handlePageChange(page)}
                aria-label={`Go to page ${page + 1}`}
              />
            ))}
          </div>

          <button 
            className={style.navButton}
            onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1 || isFlipping}
            aria-label="Next page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </motion.div>

        {/* Page flip hint */}
        {currentPage === 0 && (
          <motion.div 
            className={style.hint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>Click arrows or dots to turn pages</span>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
};

export default About;