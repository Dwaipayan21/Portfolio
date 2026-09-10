import WindowControl from '@/components/WindowControl';
import WindowWrapper from '@/hoc/WindowWrapper'
import { Download } from 'lucide-react';
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useResume } from '@/hooks/useResume';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const resume = useResume();
  const downloadUrl = resume?.fileUrl?.replace('/upload/', '/upload/fl_attachment/');

  return (
    <>
        <div id='window-header'>
            <WindowControl target='resume'/>
            <h2>Resume.pdf</h2>

            {resume && (
              <a 
               href={downloadUrl}
               download={true}
               className='cursor-pointer'
               title='Download Resume'
              >
                  <Download className='icon' />
              </a>
            )}
        </div>

        {resume ? (
          <Document file={resume.fileUrl}>
              <Page
                  pageNumber={1}
                  renderAnnotationLayer
                  renderTextLayer
              />
          </Document>
        ) : (
          <p className="p-4 text-sm text-gray-400">No resume uploaded yet.</p>
        )}
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow;