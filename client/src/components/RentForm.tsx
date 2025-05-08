import { useForm } from 'react-hook-form';
import axios from 'axios';

interface RentFormData {
  ownerName: string;
  tenantName: string;
  address: string;
  rentAmount: string;
  securityDeposit: string;
  duration: string;
  date: string;
}


export default function RentForm() {
    const { register, handleSubmit } = useForm<RentFormData>();

  const onSubmit = async (data: RentFormData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/document/generate', {
        formData: data,
        templateName: 'rentAgreement'
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rent_agreement.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating document', error);
    }
  };
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-2">
        <input {...register("ownerName")} placeholder="Owner Name" required />
      <input {...register("tenantName")} placeholder="Tenant Name" required />
      <input {...register("address")} placeholder="Address" required />
      <input {...register("rentAmount")} placeholder="Rent Amount" required />
      <input {...register("securityDeposit")} placeholder="Security Deposit" required />
      <input {...register("duration")} placeholder="Duration (months)" required />
      <input {...register("date")} placeholder="Date (DD/MM/YYYY)" required />
      <button type="submit">Generate PDF</button>
        </form>
    </div>
  )
}
