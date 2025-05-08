import axios from 'axios';

export const generateDocument = async (data: unknown, templateName: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/document/generate', {
      formData: data,
      templateName: templateName
    }, { responseType: 'blob' });

    return response.data;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
};
