import { FieldLabel, Dropzone } from './shared';

export const blogInitialState = { title: '', url: '', description: '', coverImage: null };

export const blogPanelCopy = {
  heading: 'Upload New Blog',
  subtext: 'Share a title, link, and short summary for the post.',
  submitLabel: 'Save Blog',
};

const BlogForm = ({ form, setField }) => (
  <>
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <FieldLabel>Blog Title</FieldLabel>
        <input
          type='text'
          placeholder='e.g. Building a Mac-style Admin Panel'
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          className='w-full rounded-lg border px-3 py-2 text-sm'
        />
      </div>

      <div>
        <FieldLabel>URL</FieldLabel>
        <input
          type='text'
          placeholder='https://myblog.com/post'
          value={form.url}
          onChange={(e) => setField('url', e.target.value)}
          className='w-full rounded-lg border px-3 py-2 text-sm'
        />
      </div>
    </div>

    <div>
      <FieldLabel>Short Description</FieldLabel>
      <textarea
        placeholder='Brief summary of the post...'
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
  </>
);

export default BlogForm;