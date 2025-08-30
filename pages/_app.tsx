import { useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    try {
      // Initialize theme on mount
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
      console.error('Theme initialization error:', error);
      // Set default dark theme as fallback
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <>
      <div className="paper-shapes" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
