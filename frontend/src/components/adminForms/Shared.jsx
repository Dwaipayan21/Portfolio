import { UploadCloud } from 'lucide-react';

export const FieldLabel = ({ children }) => (
  <label className='mb-1 block text-xs font-medium uppercase text-gray-500'>{children}</label>
);

export const Dropzone = ({ file, onChange, hint = 'PNG, JPG, or WEBP up to 5MB', accept = 'image/*' }) => (
  <label className='flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed py-10 text-sm text-gray-500 cursor-pointer'>
    <input type='file' accept={accept} className='hidden' onChange={(e) => onChange(e.target.files?.[0] || null)} />
    <UploadCloud size={24} />
    <p className='text-blue-600'>{file ? file.name : 'Click to upload or drag and drop'}</p>
    <p className='text-xs'>{hint}</p>
  </label>
);