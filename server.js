const http = require('http');
const fs   = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT = __dirname;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.resolve(ROOT, '.' + urlPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Nao encontrado: ' + urlPath);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

// Tenta portas em sequencia ate achar uma livre
function tryListen(ports) {
  const port = ports[0];
  if (!port) {
    console.error('\nNenhuma porta disponivel. Feche outros programas e tente novamente.\n');
    process.exit(1);
  }

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`  Porta ${port} ocupada, tentando ${ports[1]}...`);
      tryListen(ports.slice(1));
    } else {
      console.error('Erro ao iniciar servidor:', err.message);
      process.exit(1);
    }
  });

  server.listen(port, '127.0.0.1', () => {
    const url = `http://localhost:${port}`;
    console.log('\n  ======================================');
    console.log(`  Site rodando em: ${url}`);
    console.log('  Pressione Ctrl+C para parar.');
    console.log('  ======================================\n');
    exec(`start "" "${url}"`);
  });
}

tryListen([3000, 3001, 8080, 8081, 9000]);
