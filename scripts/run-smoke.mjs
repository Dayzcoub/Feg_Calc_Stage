import { spawn } from 'node:child_process';

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const baseUrl = `http://127.0.0.1:${port}`;
const isWindows = process.platform === 'win32';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForServer(timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/index.html`, { cache: 'no-store' });
      if (response.ok) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await wait(250);
  }

  throw new Error(`Static server did not become ready: ${lastError?.message || 'timeout'}`);
}

function run(command, args, options = {}) {
  return new Promise(resolve => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: options.stdio || 'inherit',
      shell: false,
      env: {
        ...process.env,
        ...(options.env || {})
      }
    });
    child.on('exit', (code, signal) => resolve({ code, signal }));
  });
}

function stopServer(server) {
  if (!server || server.killed) return;
  server.kill('SIGTERM');
  if (isWindows && !server.killed) {
    spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  }
}

const server = spawn(process.execPath, ['scripts/serve-static.mjs'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: {
    ...process.env,
    PORT: String(port)
  }
});

server.stdout.on('data', chunk => process.stdout.write(chunk));
server.stderr.on('data', chunk => process.stderr.write(chunk));

try {
  await waitForServer();
  const result = await run(process.execPath, ['node_modules/playwright/cli.js', 'test', '--reporter=list']);
  process.exitCode = result.code || 0;
} finally {
  stopServer(server);
}
