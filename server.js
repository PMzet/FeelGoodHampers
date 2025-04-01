const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Normalize URL by removing query strings, etc.
  let url = req.url;
  url = url.split('?')[0];
  
  // If URL ends with '/', add 'index.html'
  if (url.endsWith('/')) {
    url += 'index.html';
  }
  
  // Map URL to local file path
  const filePath = path.join(__dirname, url);
  
  // Get file extension
  const ext = path.extname(filePath).toLowerCase();
  
  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // If file doesn't exist, return 404
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end(`File ${filePath} not found!`);
        return;
      }
      
      // For other errors, return 500
      res.statusCode = 500;
      res.end(`Error: ${err.code}`);
      return;
    }
    
    // If it's a directory, try to serve index.html from that directory
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.access(indexPath, fs.constants.F_OK, (err) => {
        if (err) {
          res.statusCode = 404;
          res.end(`Directory listing not supported`);
          return;
        }
        
        serveFile(indexPath, res);
      });
      return;
    }
    
    // Serve the file
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Set content type header
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);
  
  // Create and pipe read stream
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
  
  // Handle stream errors
  stream.on('error', (err) => {
    res.statusCode = 500;
    res.end(`Server Error: ${err.code}`);
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`To view the website, open http://localhost:${PORT}/ in your browser`);
}); 