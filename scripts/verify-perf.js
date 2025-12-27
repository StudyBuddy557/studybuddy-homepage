const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// Ensure we write to the current directory explicitly
const REPORT_PATH = path.join(process.cwd(), 'lighthouse-report.json');

async function run() {
  let server;
  try {
    console.log('\n========================================');
    console.log('   StudyBuddy Performance Verification  ');
    console.log('========================================\n');

    // 1. Build
    console.log('[1/4] Building Next.js application...');
    execSync('npm run build', { stdio: 'inherit' });

    // 2. Start Server
    console.log('\n[2/4] Starting production server...');
    server = spawn('npm', ['run', 'start', '--', '-p', PORT.toString()], {
      stdio: ['ignore', 'pipe', 'ignore'],
      cwd: process.cwd()
    });

    // Wait for "Ready" signal
    await new Promise((resolve) => {
      server.stdout.on('data', (data) => {
        if (data.toString().includes('Ready')) resolve();
      });
      setTimeout(resolve, 10000); // 10s timeout
    });
    console.log('✓ Server ready');

    // 3. Run Lighthouse
    console.log('\n[3/4] Running Lighthouse (Mobile)...');
    
    // Use npx to ensure we use the local or downloaded lighthouse binary
    // Mobile is the default strategy for Lighthouse now
    const lhArgs = [
      `http://localhost:${PORT}`,
      '--output=json',
      `--output-path=${REPORT_PATH}`,
      '--chrome-flags="--headless"',
      '--only-categories=performance',
      '--quiet'
    ];

    try {
      // Using npx lighthouse ensures we don't need a global install
      execSync(`npx lighthouse ${lhArgs.join(' ')}`, { stdio: 'inherit' });
    } catch (e) {
      console.error("\n❌ Lighthouse execution failed. Trying to continue if report exists...");
    }

    // 4. Parse Score
    if (fs.existsSync(REPORT_PATH)) {
      const reportRaw = fs.readFileSync(REPORT_PATH, 'utf8');
      const report = JSON.parse(reportRaw);
      const score = report.categories.performance.score * 100;
      
      console.log('\n========================================');
      console.log(`PERFORMANCE SCORE: ${Math.round(score)} / 100`);
      console.log('========================================');

      if (score >= 90) {
        console.log('✅ PASSED: High performance architecture verified.');
      } else {
        console.log('⚠️  WARNING: Score is below 90. Optimization recommended.');
      }
    } else {
      console.error('\n❌ Error: Lighthouse report file was not created.');
      console.error('Debug hint: Run "npx lighthouse http://localhost:3000 --view" manually to inspect issues.');
    }

  } catch (error) {
    console.error('\n❌ Verification script failed:', error.message);
  } finally {
    if (server) {
        server.kill(); 
        try { process.kill(server.pid); } catch (e) {}
    }
    if (fs.existsSync(REPORT_PATH)) fs.unlinkSync(REPORT_PATH);
    process.exit(0);
  }
}

run();