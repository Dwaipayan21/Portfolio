import { FieldLabel, Dropzone } from './shared';

export const resumeInitialState = { resume: null };

export const resumePanelCopy = {
  heading: 'Upload Resume',
  subtext: 'Replace the resume shown on your portfolio.',
  submitLabel: 'Save Resume',
};

const ResumeForm = ({ form, setField }) => (
  <div>
    <FieldLabel>Resume File</FieldLabel>
    <Dropzone
      file={form.resume}
      onChange={(file) => setField('resume', file)}
      accept='.pdf'
      hint='PDF up to 5MB'
    />
  </div>
);

export default ResumeForm;