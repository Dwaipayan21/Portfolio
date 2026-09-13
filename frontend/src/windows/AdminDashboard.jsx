import WindowControl from '@/components/WindowControl';
import WindowWrapper from '@/hoc/WindowWrapper';
import { useAuth } from '@/context/AuthContext';
import { Folder, Image as ImageIcon, FileText, ChevronDown, Plus, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TABS, TAB_FORMS, INITIAL_FORMS, PANEL_COPY, TAB_FIELDS, LIST_COPY } from '@/components/adminForms';
import AssetList from '@/components/adminList/AssertList';
import api from '@/lib/api';

// Maps each tab to its backend endpoint
const TAB_ENDPOINTS = {
  Project: '/projects',
  Image: '/images',
  Blog: '/blogs',
  Resume: '/resume',
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
  const [ viewMode, setViewMode] = useState('form');
  const [listData, setListData] = useState({ Project: [], Image: [], Blog: []});
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, imagesRes, blogsRes] = await Promise.all([
          api.get(TAB_ENDPOINTS.Project),
          api.get(TAB_ENDPOINTS.Image),
          api.get(TAB_ENDPOINTS.Blog),
        ]);

        const projectsData = projectsRes.data;
        const imagesData = imagesRes.data;
        const blogsData = blogsRes.data;

        // handles either a raw array response or { data: [...] } / { count: n }
        const countOf = (d) =>
          Array.isArray(d) ? d.length : Array.isArray(d?.data) ? d.data.length : d?.count ?? 0;
        
        setStats({
          projects: countOf(projectsData),
          images: countOf(imagesData),
          blogs: countOf(blogsData),
        });

        const arrOf = (d) => (Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : []);
        setListData({
          Project: arrOf(projectsData),
          Image : arrOf(imagesData),
          Blog: arrOf(blogsData),
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
      await api.post(TAB_ENDPOINTS[activeTab], buildFormData(form));
      handleClear(); // reset this tab's form on success
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Save failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${TAB_ENDPOINTS[activeTab]}/${id}`);
      setListData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((item) => item._id !== id),
      }));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  const ActiveForm = TAB_FORMS[activeTab];
  const copy = viewMode === 'list' ? LIST_COPY[activeTab] : PANEL_COPY[activeTab];
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

      <div className='flex-1 min-h-0 overflow-y-auto p-6 space-y-6 bg-gray-50 scrollbar-hide'>
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
          {/* project list */}
          <button
            onClick={() => { setActiveTab('Project'); setViewMode('list'); }}
            className='rounded-xl border p-4 bg-gradient-to-br from-blue-50 to-white text-left'
          >
            <div className='mb-3 flex size-9 items-center justify-center rounded-lg bg-white shadow-sm'>
              <Folder size={18} className='text-blue-600' />
            </div>
            <p className='text-2xl font-bold text-gray-900'>{stats.projects}</p>
            <p className='text-xs uppercase text-gray-500'>Projects</p>
          </button>
          {/* image list */}
          <button
            onClick={() => { setActiveTab('Image'); setViewMode('list'); }}
            className='rounded-xl border p-4 bg-gradient-to-br from-green-50 to-white text-left'
          >
            <div className='mb-3 flex size-9 items-center justify-center rounded-lg bg-white shadow-sm'>
              <ImageIcon size={18} className='text-green-600' />
            </div>
            <p className='text-2xl font-bold text-gray-900'>{stats.images}</p>
            <p className='text-xs uppercase text-gray-500'>Images</p>
          </button>
          {/* blog list */}
          <button
            onClick={() => { setActiveTab('Blog'); setViewMode('list'); }}
            className='rounded-xl border p-4 bg-gradient-to-br from-orange-50 to-white text-left'
          >
            <div className='mb-3 flex size-9 items-center justify-center rounded-lg bg-white shadow-sm'>
              <FileText size={18} className='text-orange-600' />
            </div>
            <p className='text-2xl font-bold text-gray-900'>{stats.blogs}</p>
            <p className='text-xs uppercase text-gray-500'>Blogs</p>
          </button>
        </div>

        <div className='rounded-xl border p-6 space-y-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              {viewMode === 'form' && (
                <div className='flex size-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600'>
                  <Plus size={18} />
                </div>
              )}
              <div>
                <h3 className='font-semibold'>{copy.heading}</h3>
                <p className='text-sm text-gray-500'>{copy.subtext}</p>
              </div>
            </div>

            <div className='flex gap-1 rounded-lg bg-gray-100 p-1'>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setViewMode('form'); }}
                  className={
                    tab === activeTab
                      ? 'rounded-md bg-white px-3 py-1 text-sm font-medium shadow-sm text-blue-500'
                      : 'rounded-md px-3 py-1 text-sm text-gray-500'
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {viewMode === 'list' ? (
            <AssetList 
              items={listData[activeTab]}
              isLoading={isListLoading}
              coverField={TAB_FIELDS[activeTab]?.cover}
              onDelete={handleDelete}
            />
          ) : (
            <ActiveForm form={form} setField={setField} />
          )}

          {error && <p className='text-sm text-red-500'>{error}</p>}

          {viewMode === 'form' && (
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
          )}
        </div>
      </div>
    </>
  );
};

const AdminDashboardWindow = WindowWrapper(AdminDashboard, 'admin');

export default AdminDashboardWindow;