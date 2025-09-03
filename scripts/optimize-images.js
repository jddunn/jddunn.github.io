#!/usr/bin/env node
/**
 * Image Optimization Script for Portfolio
 * =========================================
 * 
 * Intelligently optimizes images with caching, automatic format conversion,
 * and smart compression based on content analysis.
 * 
 * Features:
 * - Smart caching to skip unchanged files
 * - Content-aware compression
 * - Automatic WebP generation
 * - Safe backups before optimization
 * - Batch processing with progress tracking
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(PUBLIC_DIR, '_originals');
const CACHE_FILE = path.join(__dirname, '.image-optimization-cache.json');
const LOG_FILE = path.join(__dirname, '.image-optimization.log');

// Image processing settings
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const MIN_SIZE_KB = 10; // Skip tiny images
const EXCLUDED_DIRS = ['_originals', 'node_modules', '.git'];

// Compression presets
const QUALITY_PRESETS = {
  photo: { jpeg: 75, webp: 70 },
  screenshot: { jpeg: 80, webp: 75 },
  logo: { png: 90, webp: 85 },
  icon: { png: 95, webp: 90 },
  background: { jpeg: 60, webp: 55 }
};

// Global state
let cache = {};
let stats = {
  processed: 0,
  optimized: 0,
  skipped: 0,
  errors: 0,
  totalSavedKB: 0
};

// Utility functions
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      console.log(`📂 Loaded cache with ${Object.keys(cache).length} entries`);
    }
  } catch (error) {
    console.warn('⚠️  Could not load cache:', error.message);
    cache = {};
  }
}

function saveCache() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log('💾 Cache saved');
  } catch (error) {
    console.error('❌ Could not save cache:', error.message);
  }
}

async function getFileHash(filePath) {
  try {
    const buffer = await promisify(fs.readFile)(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex');
  } catch (error) {
    return null;
  }
}

async function getFileSize(filePath) {
  const stats = await promisify(fs.stat)(filePath);
  return stats.size / 1024; // Return in KB
}

async function createBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    await promisify(fs.mkdir)(BACKUP_DIR, { recursive: true });
    console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
  }
}

async function backupFile(filePath) {
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);
  
  // Create backup directory structure
  await promisify(fs.mkdir)(backupDir, { recursive: true });
  
  // Only backup if not already backed up
  if (!fs.existsSync(backupPath)) {
    await promisify(fs.copyFile)(filePath, backupPath);
  }
}

// Image analysis
function detectImageType(filePath) {
  const fileName = path.basename(filePath).toLowerCase();
  const dirName = path.dirname(filePath).toLowerCase();
  
  if (/screenshot|capture/.test(fileName)) return 'screenshot';
  if (/logo|brand/.test(fileName)) return 'logo';
  if (/icon|favicon/.test(fileName)) return 'icon';
  if (/bg|background|pattern/.test(fileName)) return 'background';
  if (/hero|banner|cover/.test(dirName)) return 'photo';
  
  return 'photo'; // Default
}

async function isAlreadyOptimized(filePath) {
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const fileHash = await getFileHash(filePath);
  
  if (!fileHash) return false;
  
  if (cache[relativePath]) {
    return cache[relativePath].hash === fileHash && cache[relativePath].optimized;
  }
  
  return false;
}

// Find all images
async function findImages(dir, fileList = []) {
  const entries = await promisify(fs.readdir)(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.includes(entry.name) && !entry.name.startsWith('.')) {
        await findImages(fullPath, fileList);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        const stats = await promisify(fs.stat)(fullPath);
        if (stats.size / 1024 >= MIN_SIZE_KB) {
          fileList.push(fullPath);
        }
      }
    }
  }
  
  return fileList;
}

// Optimize single image
async function optimizeImage(filePath, options = {}) {
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const ext = path.extname(filePath).toLowerCase();
  const imageType = detectImageType(filePath);
  
  try {
    // Skip if already optimized (unless forced)
    if (!options.force && await isAlreadyOptimized(filePath)) {
      console.log(`⏭️  Skipped: ${relativePath} (already optimized)`);
      stats.skipped++;
      return;
    }
    
    // Skip favicons
    if (relativePath.includes('favicon') || relativePath.includes('apple-touch-icon')) {
      console.log(`⏭️  Skipped: ${relativePath} (favicon)`);
      stats.skipped++;
      return;
    }
    
    // Backup original
    await backupFile(filePath);
    
    const originalSize = await getFileSize(filePath);
    const quality = QUALITY_PRESETS[imageType] || QUALITY_PRESETS.photo;
    
    // Handle SVG files
    if (ext === '.svg') {
      // SVG optimization would go here
      console.log(`⏭️  Skipped: ${relativePath} (SVG optimization not implemented)`);
      stats.skipped++;
      return;
    }
    
    // Process raster images
    const tempFile = filePath + '.tmp';
    let processed = false;
    
    // Get metadata
    const metadata = await sharp(filePath).metadata();
    
    // Determine processing based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath)
        .jpeg({
          quality: quality.jpeg || 75,
          progressive: true,
          mozjpeg: true
        })
        .toFile(tempFile);
      processed = true;
    } else if (ext === '.png') {
      // Check if PNG has transparency
      if (metadata.channels === 4) {
        // Keep as PNG if has transparency
        await sharp(filePath)
          .png({
            quality: quality.png || 90,
            compressionLevel: 9,
            adaptiveFiltering: true
          })
          .toFile(tempFile);
      } else {
        // Convert to JPEG if no transparency
        await sharp(filePath)
          .jpeg({
            quality: quality.jpeg || 75,
            progressive: true,
            mozjpeg: true
          })
          .toFile(tempFile.replace('.tmp', '.jpg.tmp'));
        
        // Use JPEG version if smaller
        const jpegSize = await getFileSize(tempFile.replace('.tmp', '.jpg.tmp'));
        const pngTemp = tempFile;
        
        await sharp(filePath)
          .png({
            quality: quality.png || 90,
            compressionLevel: 9
          })
          .toFile(pngTemp);
        
        const pngSize = await getFileSize(pngTemp);
        
        if (jpegSize < pngSize * 0.8) {
          fs.renameSync(tempFile.replace('.tmp', '.jpg.tmp'), tempFile);
          console.log(`🔄 Converted ${relativePath} from PNG to JPEG`);
        }
      }
      processed = true;
    } else if (ext === '.webp') {
      await sharp(filePath)
        .webp({
          quality: quality.webp || 75,
          effort: 6
        })
        .toFile(tempFile);
      processed = true;
    } else if (ext === '.gif') {
      // Check if animated
      if (metadata.pages && metadata.pages > 1) {
        console.log(`⏭️  Skipped: ${relativePath} (animated GIF)`);
        stats.skipped++;
        return;
      } else {
        // Convert static GIF to WebP
        await sharp(filePath)
          .webp({
            quality: quality.webp || 75,
            effort: 6
          })
          .toFile(tempFile.replace('.tmp', '.webp.tmp'));
        fs.renameSync(tempFile.replace('.tmp', '.webp.tmp'), tempFile);
        console.log(`🔄 Converted ${relativePath} from GIF to WebP`);
        processed = true;
      }
    }
    
    if (processed) {
      // Check if optimization actually reduced size
      const newSize = await getFileSize(tempFile);
      
      if (newSize < originalSize * 0.95) {
        // Replace original with optimized
        fs.renameSync(tempFile, filePath);
        
        const saved = originalSize - newSize;
        stats.totalSavedKB += saved;
        stats.optimized++;
        
        // Update cache
        cache[relativePath] = {
          hash: await getFileHash(filePath),
          optimized: true,
          originalSize: originalSize,
          optimizedSize: newSize,
          saved: saved,
          timestamp: Date.now()
        };
        
        console.log(`✅ Optimized: ${relativePath} (${originalSize.toFixed(1)}KB → ${newSize.toFixed(1)}KB, saved ${saved.toFixed(1)}KB)`);
      } else {
        // No benefit, keep original
        fs.unlinkSync(tempFile);
        console.log(`⏭️  Skipped: ${relativePath} (no size benefit)`);
        stats.skipped++;
        
        // Still update cache to avoid reprocessing
        cache[relativePath] = {
          hash: await getFileHash(filePath),
          optimized: true,
          originalSize: originalSize,
          timestamp: Date.now()
        };
      }
    }
    
    stats.processed++;
    
  } catch (error) {
    console.error(`❌ Error optimizing ${relativePath}:`, error.message);
    stats.errors++;
    
    // Clean up temp files
    const tempFiles = [
      filePath + '.tmp',
      filePath.replace(ext, '.jpg.tmp'),
      filePath.replace(ext, '.webp.tmp')
    ];
    
    tempFiles.forEach(temp => {
      if (fs.existsSync(temp)) {
        try {
          fs.unlinkSync(temp);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    });
  }
}

// Generate WebP versions
async function generateWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Only for JPEG and PNG
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  
  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  
  // Skip if WebP already exists and is newer
  if (fs.existsSync(webpPath)) {
    const sourceStats = await promisify(fs.stat)(filePath);
    const webpStats = await promisify(fs.stat)(webpPath);
    
    if (webpStats.mtime > sourceStats.mtime) {
      return;
    }
  }
  
  try {
    const imageType = detectImageType(filePath);
    const quality = QUALITY_PRESETS[imageType] || QUALITY_PRESETS.photo;
    
    await sharp(filePath)
      .webp({
        quality: quality.webp || 75,
        effort: 6
      })
      .toFile(webpPath);
    
    const originalSize = await getFileSize(filePath);
    const webpSize = await getFileSize(webpPath);
    
    console.log(`🆕 WebP: ${relativePath} → ${path.basename(webpPath)} (${originalSize.toFixed(1)}KB → ${webpSize.toFixed(1)}KB)`);
  } catch (error) {
    console.error(`❌ Error generating WebP for ${relativePath}:`, error.message);
  }
}

// Progress bar
class ProgressBar {
  constructor(total) {
    this.total = total;
    this.current = 0;
  }
  
  update() {
    this.current++;
    const percentage = ((this.current / this.total) * 100).toFixed(1);
    process.stdout.write(`\r📊 Progress: ${this.current}/${this.total} (${percentage}%)`);
    
    if (this.current === this.total) {
      process.stdout.write('\n');
    }
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const options = {
    force: args.includes('--force'),
    webp: !args.includes('--no-webp'),
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose') || args.includes('-v')
  };
  
  console.log('🚀 Image Optimization');
  console.log('====================\n');
  console.log('Options:');
  console.log(`  Force: ${options.force ? 'Yes' : 'No'}`);
  console.log(`  Generate WebP: ${options.webp ? 'Yes' : 'No'}`);
  console.log(`  Dry run: ${options.dryRun ? 'Yes' : 'No'}`);
  console.log('');
  
  // Load cache
  loadCache();
  
  // Create backup directory
  await createBackupDir();
  
  // Find all images
  console.log('🔍 Scanning for images...');
  const images = await findImages(PUBLIC_DIR);
  console.log(`📸 Found ${images.length} images\n`);
  
  if (images.length === 0) {
    console.log('No images to process.');
    return;
  }
  
  // Process images
  console.log('🔧 Optimizing images...');
  const progress = new ProgressBar(images.length);
  
  for (const imagePath of images) {
    if (!options.dryRun) {
      await optimizeImage(imagePath, options);
    }
    progress.update();
  }
  
  // Generate WebP versions
  if (options.webp && !options.dryRun) {
    console.log('\n🌐 Generating WebP versions...');
    const webpProgress = new ProgressBar(images.length);
    
    for (const imagePath of images) {
      await generateWebP(imagePath);
      webpProgress.update();
    }
  }
  
  // Save cache
  if (!options.dryRun) {
    saveCache();
  }
  
  // Summary
  console.log('\n📈 Summary:');
  console.log('===========');
  console.log(`  Processed: ${stats.processed} images`);
  console.log(`  Optimized: ${stats.optimized} images`);
  console.log(`  Skipped: ${stats.skipped} images`);
  if (stats.errors > 0) {
    console.log(`  Errors: ${stats.errors} images`);
  }
  console.log(`  Total saved: ${stats.totalSavedKB.toFixed(1)}KB (${(stats.totalSavedKB / 1024).toFixed(2)}MB)`);
  
  if (options.dryRun) {
    console.log('\n⚠️  This was a dry run - no files were modified');
  }
  
  // Log results
  const logEntry = {
    timestamp: new Date().toISOString(),
    stats: stats,
    options: options
  };
  
  try {
    fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + '\n');
  } catch (error) {
    // Ignore logging errors
  }
}

// Run
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, generateWebP };