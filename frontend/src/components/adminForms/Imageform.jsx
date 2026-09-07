import { FieldLabel, Dropzone } from './shared';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const IMAGE_CATEGORIES = ['Library', 'Memories', 'Places', 'People', 'Favorites'];

export const imageInitialState = { file: null, title: '', category: IMAGE_CATEGORIES[0] };

export const imagePanelCopy = {
  heading: 'Upload New Image',
  subtext: 'Add a photo and file it under a category.',
  submitLabel: 'Save Image',
};

const ImageForm = ({ form, setField }) => (
  <>
    <div>
      <FieldLabel>Image</FieldLabel>
      <Dropzone file={form.file} onChange={(file) => setField('file', file)} />
    </div>

    <div className='grid grid-cols-2 gap-4'>
      <div>
        <FieldLabel>Title (optional)</FieldLabel>
        <input
          type='text'
          placeholder='e.g. Sunset at the lake'
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          className='w-full rounded-lg border px-3 py-2 text-sm'
        />
      </div>

      <div>
        <FieldLabel>Category</FieldLabel>
        <Select value={form.category} onValueChange={(value) => setField('category', value)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            {IMAGE_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  </>
);

export default ImageForm;