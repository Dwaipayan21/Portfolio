import { FieldLabel, Dropzone } from './Shared';

export const projectInitialState = { title: '', liveLink: '', githubLink: '', description: '', coverImage: null };

export const projectPanelCopy = {
  heading: 'Upload New Project',
  subtext: 'Provide details and source repository for your portfolio showcase.',
  submitLabel: 'Save Project',
};

const ProjectForm = ({ form, setField }) => {
  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <FieldLabel>Project Title</FieldLabel>
          <input
            type='text'
            placeholder='e.g. AI Workflow Canvas'
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            className='w-full rounded-lg border px-3 py-2 text-sm'
          />
        </div>

        <div>
          <FieldLabel>Live Link</FieldLabel>
          <input
            type='text'
            placeholder='https://your-project.vercel.app'
            value={form.liveLink}
            onChange={(e) => setField('liveLink', e.target.value)}
            className='w-full rounded-lg border px-3 py-2 text-sm'
          />
        </div>
      </div>

      <div>
        <FieldLabel>Github Link</FieldLabel>
        <input
          type='text'
          placeholder='https://github.com/username/project'
          value={form.githubLink}
          onChange={(e) => setField('githubLink', e.target.value)}
          className='w-full rounded-lg border px-3 py-2 text-sm'
        />
      </div>

      <div>
        <FieldLabel>Short Description</FieldLabel>
        <textarea
          placeholder='Brief summary of what this project does and key engineering highlights...'
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          rows={3}
          className='w-full rounded-lg border px-3 py-2 text-sm'
        />
      </div>

      <div>
        <FieldLabel>Cover Image</FieldLabel>
        <Dropzone file={form.coverImage} onChange={(file) => setField('coverImage', file)} />
      </div>
    </div>
  );
};

export default ProjectForm;