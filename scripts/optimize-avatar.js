const sharp = require('sharp');
const fs = require('fs');

async function optimizeAvatar() {
  const input = 'public/StudyBuddy_AI_tutor_Avatar.png';
  const output = 'public/StudyBuddy_AI_tutor_Avatar_optimized.png';
  
  console.log('🖼️  Optimizing avatar image...\n');
  
  // Get original size
  const originalSize = fs.statSync(input).size;
  console.log(`📦 Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
  
  // Optimize: resize to 400x400 and compress
  await sharp(input)
    .resize(400, 400, { 
      fit: 'cover',
      position: 'center'
    })
    .png({ 
      quality: 85,
      compressionLevel: 9,
      palette: true // Use palette mode for smaller file size
    })
    .toFile(output);
  
  const optimizedSize = fs.statSync(output).size;
  console.log(`✨ Optimized: ${(optimizedSize / 1024).toFixed(2)}KB`);
  console.log(`💰 Savings: ${((1 - optimizedSize/originalSize) * 100).toFixed(1)}%\n`);
  
  // Backup original
  fs.renameSync(input, 'public/StudyBuddy_AI_tutor_Avatar_ORIGINAL.png');
  console.log('💾 Original backed up as: StudyBuddy_AI_tutor_Avatar_ORIGINAL.png');
  
  // Replace with optimized
  fs.renameSync(output, input);
  console.log('✅ Avatar optimized and replaced!\n');
  
  console.log('📊 Final Stats:');
  console.log(`   Before: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   After:  ${(optimizedSize / 1024).toFixed(2)}KB`);
  console.log(`   Faster load time: ~${((originalSize - optimizedSize) / 1024 / 100).toFixed(1)}s saved on 3G`);
}

optimizeAvatar().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
