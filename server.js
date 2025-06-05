const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const libre = require('libreoffice-convert');
const sharp = require('sharp');

const app = express();
app.use(cors());
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

// Ensure folders exist
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync('converted')) fs.mkdirSync('converted');

async function convertToPDF(inputPath, outputPath) {
    if (inputPath.match(/\.(jpg|jpeg|png)$/i)) {
        await sharp(inputPath).toFormat('pdf').toFile(outputPath);
        return;
    }
    return new Promise((resolve, reject) => {
        const file = fs.readFileSync(inputPath);
        libre.convert(file, '.pdf', undefined, (err, done) => {
            if (err) reject(err);
            fs.writeFileSync(outputPath, done);
            resolve();
        });
    });
}

async function convertToImage(inputPath, outputPath, format) {
    await sharp(inputPath).toFormat(format).toFile(outputPath);
}

app.post('/convert', upload.single('file'), async (req, res) => {
    try {
        const { format } = req.body;
        const inputPath = req.file.path;
        const outputPath = `converted/${req.file.filename}.${format}`;
        
        if (format === 'pdf') {
            await convertToPDF(inputPath, outputPath);
        } else if (['jpg', 'png'].includes(format)) {
            await convertToImage(inputPath, outputPath, format);
        } else {
            return res.status(400).send('Unsupported format');
        }

        res.download(outputPath, () => {
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Conversion failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
