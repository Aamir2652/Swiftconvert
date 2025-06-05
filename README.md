# SwiftConvert - File Converter Project

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher recommended)
- LibreOffice installed and accessible via command line (for office document conversions)
- Internet connection to install dependencies

### Steps

1. Clone or unzip the project folder.

2. Navigate to the project directory in terminal/command prompt.

3. Install dependencies:

```
npm install
```

4. Start the backend server:

```
npm start
```

5. Open `public/index.html` in your browser (or serve it via any static server).

6. Use the UI to upload files and convert them to PDF, JPG, or PNG.

### Notes
- The backend listens on port 3000 by default.
- Ensure LibreOffice is installed, or PDF conversion for office docs won't work.
- Converted files are temporary and cleaned up after download.
- CORS is enabled for local testing.

---

Enjoy your file converter!
