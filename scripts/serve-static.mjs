import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, extname, normalize, sep } from 'node:path';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || process.argv[2] || 4173);
const host = process.env.HOST || '127.0.0.1';

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function isInsideRoot(filePath) {
  const normalizedRoot = normalize(root + sep);
  const normalizedPath = normalize(filePath);
  return normalizedPath === root || normalizedPath.startsWith(normalizedRoot);
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${host}:${port}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = resolve(root, `.${requestedPath}`);

  if (!isInsideRoot(filePath)) {
    send(res, 403, 'Forbidden');
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    send(res, 404, 'Not found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': contentTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store'
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  console.log(`FEG static server: http://${host}:${port}/index.html`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
