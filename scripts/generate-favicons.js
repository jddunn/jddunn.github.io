const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const publicDir = path.join(__dirname, '..', 'public');
const cacheFile = path.join(__dirname, '.favicon-cache.json');

// Load cache
function loadCache() {
  try {
    if (fs.existsSync(cacheFile)) {
      return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    }
  } catch (error) {
    console.warn('Could not load cache:', error.message);
  }
  return {};
}

// Save cache
function saveCache(cache) {
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Could not save cache:', error.message);
  }
}

// Get file hash
function getFileHash(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex');
  } catch (error) {
    return null;
  }
}

// Check if file needs regeneration
function needsRegeneration(inputFile, outputFile, cache) {
  if (!fs.existsSync(outputFile)) {
    return true;
  }
  
  const inputHash = getFileHash(inputFile);
  const cacheKey = path.basename(outputFile);
  
  if (!inputHash || !cache[cacheKey]) {
    return true;
  }
  
  return cache[cacheKey].inputHash !== inputHash;
}

async function generateFavicons() {
  const cache = loadCache();
  const themes = ['light', 'dark'];
  const sizes = [16, 32, 192, 512];
  let generated = 0;
  let skipped = 0;
  
  console.log('🎨 Favicon Generation');
  console.log('====================\n');
  
  for (const theme of themes) {
    const inputFile = path.join(publicDir, `jd-monogram-luxury-${theme}-512.png`);
    
    if (!fs.existsSync(inputFile)) {
      console.error(`❌ Input file not found: ${inputFile}`);
      continue;
    }
    
    const inputHash = getFileHash(inputFile);
    
    for (const size of sizes) {
      const outputFile = path.join(publicDir, `favicon-${theme}-${size}x${size}.png`);
      const cacheKey = path.basename(outputFile);
      
      if (!needsRegeneration(inputFile, outputFile, cache)) {
        console.log(`⏭️  Skipped: favicon-${theme}-${size}x${size}.png (unchanged)`);
        skipped++;
        continue;
      }
      
      try {
        await sharp(inputFile)
          .resize(size, size)
          .png()
          .toFile(outputFile);
        
        console.log(`✅ Generated: favicon-${theme}-${size}x${size}.png`);
        generated++;
        
        // Update cache
        cache[cacheKey] = {
          inputHash: inputHash,
          generated: new Date().toISOString(),
          size: size
        };
      } catch (error) {
        console.error(`❌ Error generating ${outputFile}:`, error);
      }
    }
    
    // Generate apple-touch-icon for this theme
    const touchIconFile = path.join(publicDir, `apple-touch-icon-${theme}.png`);
    const touchIconKey = path.basename(touchIconFile);
    
    if (needsRegeneration(inputFile, touchIconFile, cache)) {
      try {
        await sharp(inputFile)
          .resize(180, 180)
          .png()
          .toFile(touchIconFile);
        
        console.log(`✅ Generated: apple-touch-icon-${theme}.png`);
        generated++;
        
        cache[touchIconKey] = {
          inputHash: inputHash,
          generated: new Date().toISOString(),
          size: 180
        };
      } catch (error) {
        console.error(`❌ Error generating ${touchIconFile}:`, error);
      }
    } else {
      console.log(`⏭️  Skipped: apple-touch-icon-${theme}.png (unchanged)`);
      skipped++;
    }
  }
  
  // Generate default apple-touch-icon and standard favicons
  const darkInputFile = path.join(publicDir, 'jd-monogram-luxury-dark-512.png');
  const darkInputHash = getFileHash(darkInputFile);
  
  const standardFiles = [
    { output: 'apple-touch-icon.png', size: 180 },
    { output: 'favicon-16x16.png', size: 16 },
    { output: 'favicon-32x32.png', size: 32 }
  ];
  
  for (const { output, size } of standardFiles) {
    const outputFile = path.join(publicDir, output);
    const cacheKey = output;
    
    if (!needsRegeneration(darkInputFile, outputFile, cache)) {
      console.log(`⏭️  Skipped: ${output} (unchanged)`);
      skipped++;
      continue;
    }
    
    try {
      await sharp(darkInputFile)
        .resize(size, size)
        .png()
        .toFile(outputFile);
      
      console.log(`✅ Generated: ${output}`);
      generated++;
      
      cache[cacheKey] = {
        inputHash: darkInputHash,
        generated: new Date().toISOString(),
        size: size
      };
    } catch (error) {
      console.error(`❌ Error generating ${output}:`, error);
    }
  }
  
  // Generate favicon.ico from dark 32x32
  const icoSource = path.join(publicDir, 'favicon-dark-32x32.png');
  const icoOutput = path.join(publicDir, 'favicon.ico');
  
  if (fs.existsSync(icoSource) && needsRegeneration(icoSource, icoOutput, cache)) {
    try {
      fs.copyFileSync(icoSource, icoOutput);
      console.log(`✅ Created: favicon.ico (from dark 32x32)`);
      generated++;
      
      cache['favicon.ico'] = {
        inputHash: getFileHash(icoSource),
        generated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`❌ Error creating favicon.ico:`, error);
    }
  } else if (fs.existsSync(icoOutput)) {
    console.log(`⏭️  Skipped: favicon.ico (unchanged)`);
    skipped++;
  }
  
  // Save cache
  saveCache(cache);
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Generated: ${generated} files`);
  console.log(`   Skipped: ${skipped} files (already up-to-date)`);
  console.log(`   Cache saved: ${path.basename(cacheFile)}`);
}

generateFavicons().catch(console.error);