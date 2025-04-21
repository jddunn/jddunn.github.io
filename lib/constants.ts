export const BLOG_DIR = '_posts/blog';
export const PROJECTS_DIR = '_posts/projects';

export const EXAMPLE_PATH = 'blog';
export const CMS_NAME = "Johnny's Blog";
export const HOME_OG_IMAGE_URL =
  'https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg';

// Get environment variables with fallbacks
// Example for constants.ts
console.log('Attempting to read GH_API_TOKEN from process.env');
export const GH_API_TOKEN = process.env.GH_API_TOKEN || '';
// Log the value (check length, not the token itself if logs are public)
console.log('GH_API_TOKEN is set:', !!GH_API_TOKEN);
console.log('GH_API_TOKEN length:', GH_API_TOKEN.length);

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || '';