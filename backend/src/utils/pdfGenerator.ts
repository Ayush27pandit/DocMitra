import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';

async function generatePDF(data: any, templateName: string) {
    try {
      const templatePath = path.join(__dirname, '../templates/rentAgreement.hbs');
      console.log("Loading template from:", templatePath);
      
      const templateHtml = fs.readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateHtml);
      const finalHtml = template(data);
  
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.setContent(finalHtml, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({ format: 'A4', printBackground: true });
      await browser.close();
  
      return pdf;
    } catch (err) {
      console.error("generatePDF failed:", err);
      throw err;
    }
  }
  export default generatePDF;