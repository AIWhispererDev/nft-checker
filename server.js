const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.static('public'));

let whitelist = new Set();

// Load CSV data with better error handling
function loadWhitelist(filePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      console.warn(`Whitelist file ${filePath} not found, creating empty one`);
      fs.writeFileSync(filePath, 'address\n');
      resolve();
      return;
    }

    fs.createReadStream(filePath)
      .on('error', (error) => {
        console.error(`Error reading whitelist file: ${error}`);
        reject(error);
      })
      .pipe(csv())
      .on('data', (row) => {
        if (row.address && /^0x[a-fA-F0-9]{40}$/.test(row.address)) {
          whitelist.add(row.address.toLowerCase());
        } else {
          console.warn(`Skipping invalid address in CSV: ${row.address}`);
        }
      })
      .on('end', () => {
        console.log(`Loaded ${whitelist.size} whitelisted addresses`);
        resolve();
      })
      .on('error', reject);
  });
}

// API endpoint
app.get('/check/:address', (req, res) => {
  const address = req.params.address?.toLowerCase();
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }
  
  res.json({
    whitelisted: whitelist.has(address),
    address: address
  });
});

// Start server
const PORT = process.env.PORT || 3000;

// Create public directory if it doesn't exist
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Create an empty whitelist.csv if it doesn't exist
if (!fs.existsSync('whitelist.csv')) {
  fs.writeFileSync('whitelist.csv', 'address\n');
}

loadWhitelist('whitelist.csv').then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
  });
}); 