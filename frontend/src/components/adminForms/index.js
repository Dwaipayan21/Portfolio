import ProjectForm, { projectInitialState, projectPanelCopy } from './ProjectForm';
import ImageForm, { imageInitialState, imagePanelCopy } from './ImageForm';
import BlogForm, { blogInitialState, blogPanelCopy } from './BlogForm';
import ResumeForm, { resumeInitialState, resumePanelCopy } from './ResumeForm';

export const TABS = ['Project', 'Image', 'Blog', 'Resume'];

export const TAB_FORMS = {
  Project: ProjectForm,
  Image: ImageForm,
  Blog: BlogForm,
  Resume: ResumeForm,
};

export const INITIAL_FORMS = {
  Project: projectInitialState,
  Image: imageInitialState,
  Blog: blogInitialState,
  Resume: resumeInitialState,
};

export const PANEL_COPY = {
  Project: projectPanelCopy,
  Image: imagePanelCopy,
  Blog: blogPanelCopy,
  Resume: resumePanelCopy,
};