import WindowControl from '@/components/WindowControl';
import WindowWrapper from '@/hoc/WindowWrapper';
import { useAuth } from '@/context/AuthContext';
import { Folder, Image as ImageIcon, FileText, ChevronDown, Plus, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TABS, TAB_FORMS, INITIAL_FORMS, PANEL_COPY } from '@/components/adminForms';

// Maps each tab to its backend endpoint
const TAB_ENDPOINTS = {
  Project: '/api/projects',
  Image: '/api/images',
  Blog: '/api/blogs',
  Resume: '/api/resume',
};

// Converts a plain form object into FormData — works whether or not a file field is present
const buildFormData = (formObj) => {
  const fd = new FormData();
  Object.entries(formObj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) fd.append(key, value);
  });
  return fd;
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Project');
  const [forms, setForms] = useState(INITIAL_FORMS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ projects: 0, images: 0, blogs: 0});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        const [projectsRes, imagesRes, blogsRes] = await Promise.all([
          fetch(TAB_ENDPOINTS.Project, { headers }),
          fetch(TAB_ENDPOINTS.Image, { headers }),
          fetch(TAB_ENDPOINTS.Blog, { headers }),
        ]);

        const [projectsData, imagesData, blogsData] = await Promise.all([
          projectsRes.json(),
          imagesRes.json(),
          blogsRes.json(),
        ]);

        // handles either a raw array response or { data: [...] } / { count: n }
        const countOf = (d) =>
          Array.isArray(d) ? d.length : Array.isArray(d?.data) ? d.data.length : d?.count ?? 0;

        setStats({
          projects: countOf(projectsData),
          images: countOf(imagesData),
          blogs: countOf(blogsData),
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  const form = forms[activeTab];
  const setField = (field, value) =>
    setForms((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value } }));

  const handleClear = () => {
    setForms((prev) => ({ ...prev, [activeTab]: INITIAL_FORMS[activeTab] }));
    setError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(TAB_ENDPOINTS[activeTab], {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: buildFormData(form), // always FormData — never set Content-Type manually
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Save failed (${res.status})`);
      }

      handleClear(); // reset this tab's form on success
      // TODO: refresh stat cards / show a success toast here
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ActiveForm = TAB_FORMS[activeTab];
  const copy = PANEL_COPY[activeTab];

  return (
    <>
      <div id='window-header' className='flex-none'>
        <WindowControl target='admin' />
        <h2 className='pl-5'>AdminPanel</h2>

        <div className='ml-auto flex items-center gap-2'>
          <p className='pr-5'>{user?.name || 'Dwaipayan Barui'}</p>
          <User className='size-4' />
        </div>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto p-6 space-y-6'>
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
            <p className='text-sm text-gray-500'>Welcome back. Here is the overview of your system.</p>
          </div>

          <button className='flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white'>
            <Plus size={16} />
            Upload New Asset
            <ChevronDown size={16} />
          </button>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div className='rounded-xl border p-4 bg-gradient-to-br from-blue-50 to-white'>
            <div className='mb-3 flex size-9 items-center justify-center rounded-lg bg-white shadow-sm'>
              <Folder size={18} className='text-blue-600' />
            </div>
            <p className='text-2xl font-bold'>{stats.projects}</p>
            <p className='text-xs uppercase text-gray-500'>Projects</p>
          </div>

          <div className='rounded-xl border p-4 bg-gradient-to-br from-green-50 to-white'>
            <div className='mb-3 flex size-9 items-center justify-center rounded-lg bg-white shadow-sm'>
              <ImageIcon size={18} className='text-green-600' />
            </div>
            <p className='text-2xl font-bold'>{[stats.images]}</p>
            <p className='text-xs uppercase text-gray-500'>Images</p>
          </div>

          <div className='rounded-xl border p-4 bg-gradient-to-br from-orange-50 to-white'>
            <div className='mb-3 flex size-9 items-center justify-center rounded-lg bg-white shadow-sm'>
              <FileText size={18} className='text-orange-600' />
            </div>
            <p className='text-2xl font-bold'>{stats.blogs}</p>
            <p className='text-xs uppercase text-gray-500'>Blogs</p>
          </div>
        </div>

        <div className='rounded-xl border p-6 space-y-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-9 items-center justify-center rounded-lg bg-gray-100'>
                <Plus size={18} />
              </div>
              <div>
                <h3 className='font-semibold'>{copy.heading}</h3>
                <p className='text-sm text-gray-500'>{copy.subtext}</p>
              </div>
            </div>

            <div className='flex gap-1 rounded-lg bg-gray-100 p-1'>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={
                    tab === activeTab
                      ? 'rounded-md bg-white px-3 py-1 text-sm font-medium shadow-sm'
                      : 'rounded-md px-3 py-1 text-sm text-gray-500'
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <ActiveForm form={form} setField={setField} />

          {error && <p className='text-sm text-red-500'>{error}</p>}

          <div className='flex justify-end gap-3'>
            <button
              onClick={handleClear}
              className='px-4 py-2 text-sm text-gray-700 cursor-pointer'
              disabled={isSubmitting}
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 cursor-pointer'
            >
              {isSubmitting ? 'Saving...' : copy.submitLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminDashboardWindow = WindowWrapper(AdminDashboard, 'admin');

export default AdminDashboardWindow;