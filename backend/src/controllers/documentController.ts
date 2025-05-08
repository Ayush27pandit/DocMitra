import { Request, Response } from 'express';
import generatePDF from '../utils/pdfGenerator';


export const generateDocument= async (req: Request, res:Response):Promise<any> => {
    try {
        const {formData,templateName}=req.body;
        if(!formData || !templateName){
            return res.status(400).json({error:"Form data and template name are required"});
        }
        const pdf=await generatePDF(formData,templateName);
        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${templateName}-${Date.now()}.pdf`,
        })
        res.send(pdf);
    } catch (err) {
        console.error("PDF generation error",err);
        res.status(500).json({ error: 'Internal server error' });

    }
}


