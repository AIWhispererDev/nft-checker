# NFT Whitelist Checker

## Description
A modern web application for checking Ethereum wallet addresses against a whitelist for NFT projects. Features a beautiful, responsive UI with a cyberpunk-inspired design.

## Features
- ⚡ Real-time Ethereum address validation
- 🔒 Secure API with rate limiting and security headers
- 💫 Modern UI with animations and gradients
- 📱 Fully responsive design
- 🔍 CSV-based whitelist management
- 🛡️ Input sanitization and validation
- 🚀 Express.js backend with robust error handling

## Tech Stack
- **Frontend**: HTML5, CSS3 with modern animations
- **Backend**: Node.js with Express.js
- **Security**: 
  - Helmet.js for security headers
  - Express Rate Limit for DDoS protection
  - CORS enabled
- **Data Storage**: CSV-based whitelist system
- **Styling**: Custom CSS with Space Grotesk font

## Installation

### Prerequisites
- Node.js >= 14.0.0
- Git

### Setup
1. Clone the repository:
```powershell
git clone https://github.com/AIWhispererDev/nft-checker.git
cd nft-checker
```

2. Install dependencies:
```powershell
npm install
```

3. Create or update whitelist:
- Ensure `whitelist.csv` exists in the root directory
- Format: single column with header 'address'
- Each row should contain a valid Ethereum address (0x...)

4. Start the server:
```powershell
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure
```
checker/
├── public/
│   ├── index.html    # Frontend UI
│   └── logo.png      # Project logo
├── server.js         # Express server and API
├── whitelist.csv     # Whitelist data
├── package.json      # Project dependencies
└── .gitignore       # Git ignore rules
```

## API Endpoints

### GET /check/:address
Checks if an Ethereum address is whitelisted.

**Parameters:**
- `address`: Ethereum address (0x format)

**Response:**
```json
{
  "whitelisted": boolean,
  "address": "0x..."
}
```

## Security Features
- Rate limiting: 100 requests per 15 minutes per IP
- Helmet.js security headers
- Input validation for Ethereum addresses
- CORS protection
- Static file serving with security measures

## Development
Run the development server with auto-reload:
```powershell
npm run dev
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the ISC License.

## Contact
- Project Link: [https://github.com/AIWhispererDev/nft-checker](https://github.com/AIWhispererDev/nft-checker)
