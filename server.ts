import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/api/export-pdf', async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).send('HTML content is missing.');
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    
    // Set a modern viewport
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Inject styles for print
    await page.addStyleTag({
      content: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
        body {
          font-family: 'Amiri', serif;
          -webkit-font-smoothing: antialiased;
        }
        .pdf-section, .hotel-card, .day-card, .note-group {
          break-inside: avoid;
        }
      `,
    });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': 'attachment; filename=itinerary.pdf',
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Failed to generate PDF.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
