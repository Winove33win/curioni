const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const distDir = path.join(__dirname, 'dist');
const port = process.env.PORT || 3000;

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
};

function resolveFilePath(urlPath) {
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^([.]{2}[\\/])+/, '');
  const requestedPath = safePath === '/' ? '/index.html' : safePath;
  const absolutePath = path.join(distDir, requestedPath);

  if (!absolutePath.startsWith(distDir)) {
    return null;
  }

  return absolutePath;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFilePath(req.url || '/');

  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': contentTypes[extension] || 'application/octet-stream' });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', () => {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal server error');
    });
  });
});

server.listen(port, () => {
  console.log(`Servidor estático Curioni no ar em http://localhost:${port}`);
});
