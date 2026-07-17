import React, {useState, useEffect} from 'react';
import Head from 'next/head';

interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  disable: boolean;
  featured?: boolean;
  metrics?: {label: string; value: string}[];
  techStack?: string[];
  reportUrl?: string;
  demoUrl?: string;
  sourceUrl?: string;
}

const GITHUB_REPO = 'shivang-7135/Portfolio';
const FILE_PATH = 'src/data/projects.json';

// Safe Base64 encoding for Unicode
function utf8_to_b64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}

const uploadImageToGitHub = async (pat: string, filename: string, base64Content: string): Promise<string> => {
  const path = `public/images/portfolio/${filename}`;
  // First check if file exists to get SHA
  let sha = '';
  try {
    const checkRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
      headers: { Authorization: `token ${pat}`, Accept: 'application/vnd.github.v3+json' },
    });
    if (checkRes.ok) {
      const checkData = await checkRes.json();
      sha = checkData.sha;
    }
  } catch {}
  
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${pat}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload project image: ${filename}`,
      content: base64Content,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return `/images/portfolio/${filename}`;
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [fileSha, setFileSha] = useState('');
  const [uploadingImage, setUploadingImage] = useState<Record<number, boolean>>({});

  // Check for saved token on load
  useEffect(() => {
    const savedToken = localStorage.getItem('github_pat');
    if (savedToken) {
      setToken(savedToken);
      verifyToken(savedToken);
    }
  }, []);

  const verifyToken = async (pat: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${pat}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (res.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('github_pat', pat);
        fetchProjects(pat);
      } else {
        setError('Invalid token. Please try again.');
        localStorage.removeItem('github_pat');
        setIsLoggedIn(false);
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to GitHub');
    }
    setLoading(false);
  };

  const fetchProjects = async (pat: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
        headers: {
          Authorization: `token ${pat}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const data = await res.json();
      if (res.ok && data.content) {
        const decodedContent = b64_to_utf8(data.content);
        setProjects(JSON.parse(decodedContent));
        setFileSha(data.sha);
      } else {
        throw new Error(data.message || 'Failed to fetch projects');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching projects');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const jsonContent = JSON.stringify(projects, null, 2);
      const b64Content = utf8_to_b64(jsonContent);

      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update projects via Admin CMS',
          content: b64Content,
          sha: fileSha,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Projects saved successfully! It will take a few minutes for the live website to update.');
        setFileSha(data.content.sha);
      } else {
        throw new Error(data.message || 'Failed to save');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving to GitHub');
    }
    setLoading(false);
  };

  const handleChange = (index: number, field: keyof Project, value: any) => {
    const updated = [...projects];
    updated[index] = {...updated[index], [field]: value};
    setProjects(updated);
  };

  const handleDelete = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const handleAdd = () => {
    setProjects([
      {title: '', description: '', url: '', image: '', disable: false, featured: false, metrics: [], techStack: [], reportUrl: '', demoUrl: '', sourceUrl: ''},
      ...projects,
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem('github_pat');
    setToken('');
    setIsLoggedIn(false);
    setProjects([]);
  };

  const handleFileUpload = async (idx: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    setUploadingImage(prev => ({...prev, [idx]: true}));
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        if (!result) return;
        
        // Remove data URL prefix (e.g., data:image/png;base64,)
        const base64Content = result.split(',')[1];
        const filename = `project-${idx}-${Date.now()}.${file.name.split('.').pop() || 'png'}`;
        
        try {
          const newUrl = await uploadImageToGitHub(token, filename, base64Content);
          handleChange(idx, 'image', newUrl);
          setSuccess('Image uploaded successfully');
          setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
          setError(err.message || 'Failed to upload image');
        } finally {
          setUploadingImage(prev => ({...prev, [idx]: false}));
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploadingImage(prev => ({...prev, [idx]: false}));
    }
  };

  const handlePaste = (idx: number, e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleFileUpload(idx, file);
        }
        break;
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <Head><title>Admin Login - Portfolio</title></Head>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Admin Access</h1>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Enter your GitHub Personal Access Token (with repo access) to edit your portfolio.
          </p>
          <input
            className="w-full text-black border border-gray-300 p-2 rounded mb-4 focus:ring focus:ring-orange-500 outline-none"
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            type="password"
            value={token}
          />
          <button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition"
            disabled={loading}
            onClick={() => verifyToken(token)}
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Head><title>Dashboard - Portfolio Admin</title></Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
          <h1 className="text-2xl text-black font-bold">Manage Portfolio Projects</h1>
          <div className="flex gap-4 items-center">
            <button
              className="text-gray-600 hover:text-gray-900 font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
              disabled={loading}
              onClick={handleSave}
            >
              {loading ? 'Saving...' : 'Save to GitHub'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex justify-between">
            <span><strong>Error!</strong> {error}</span>
            <button onClick={() => setError('')} className="text-red-700 font-bold">✕</button>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex justify-between">
            <span><strong>Success!</strong> {success}</span>
            <button onClick={() => setSuccess('')} className="text-green-700 font-bold">✕</button>
          </div>
        )}

        <div className="mb-6 flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            onClick={handleAdd}
          >
            + Add New Project
          </button>
        </div>

        {loading && projects.length === 0 ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white p-6 rounded shadow border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg text-black font-semibold">Project #{idx + 1}</h3>
                  <button
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={() => handleDelete(idx)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500"
                      onChange={(e) => handleChange(idx, 'title', e.target.value)}
                      value={project.title}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500 h-24"
                      onChange={(e) => handleChange(idx, 'description', e.target.value)}
                      value={project.description}
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">URL (Link)</label>
                     <input
                       className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500"
                       onChange={(e) => handleChange(idx, 'url', e.target.value)}
                       value={project.url}
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Demo URL</label>
                     <input
                       className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500"
                       onChange={(e) => handleChange(idx, 'demoUrl', e.target.value)}
                       value={project.demoUrl || ''}
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Source URL</label>
                     <input
                       className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500"
                       onChange={(e) => handleChange(idx, 'sourceUrl', e.target.value)}
                       value={project.sourceUrl || ''}
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Report URL</label>
                     <input
                       className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500"
                       onChange={(e) => handleChange(idx, 'reportUrl', e.target.value)}
                       value={project.reportUrl || ''}
                     />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma separated)</label>
                    <input
                      className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500"
                      onChange={(e) => {
                        const val = e.target.value;
                        handleChange(idx, 'techStack', val ? val.split(',').map(s => s.trim()).filter(Boolean) : []);
                      }}
                      value={project.techStack?.join(', ') || ''}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Metrics</label>
                    <div className="space-y-2">
                      {(project.metrics || []).map((m, mIdx) => (
                        <div key={mIdx} className="flex gap-2 items-center">
                          <input
                            placeholder="Label (e.g. Conversion)"
                            className="flex-1 text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500 text-sm"
                            value={m.label}
                            onChange={(e) => {
                              const newMetrics = [...(project.metrics || [])];
                              newMetrics[mIdx] = {...newMetrics[mIdx], label: e.target.value};
                              handleChange(idx, 'metrics', newMetrics);
                            }}
                          />
                          <input
                            placeholder="Value (e.g. +20%)"
                            className="flex-1 text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500 text-sm"
                            value={m.value}
                            onChange={(e) => {
                              const newMetrics = [...(project.metrics || [])];
                              newMetrics[mIdx] = {...newMetrics[mIdx], value: e.target.value};
                              handleChange(idx, 'metrics', newMetrics);
                            }}
                          />
                          <button
                            className="text-red-500 hover:text-red-700 font-bold px-2"
                            onClick={() => {
                              const newMetrics = (project.metrics || []).filter((_, i) => i !== mIdx);
                              handleChange(idx, 'metrics', newMetrics);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => {
                          const newMetrics = [...(project.metrics || []), {label: '', value: ''}];
                          handleChange(idx, 'metrics', newMetrics);
                        }}
                      >
                        + Add Metric
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 mt-2">
                    <div
                      className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:bg-gray-50 transition relative"
                      onPaste={(e) => handlePaste(idx, e)}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Upload (Select or Paste)
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          className="flex-1 text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500 text-sm"
                          onChange={(e) => handleChange(idx, 'image', e.target.value)}
                          value={project.image}
                          placeholder="Image URL or Path"
                        />
                        <label className="bg-orange-100 hover:bg-orange-200 text-orange-700 cursor-pointer py-2 px-3 rounded text-sm font-medium transition whitespace-nowrap">
                          Upload File
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(idx, e.target.files[0])}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Or click here and press Ctrl+V / Cmd+V to paste an image</p>
                      
                      {uploadingImage[idx] && <p className="text-sm text-orange-600 font-semibold mb-2">Uploading...</p>}

                      {project.image && (
                        <div className="relative inline-block mt-2">
                          <img alt="preview" className="max-h-48 object-contain rounded border shadow-sm" src={project.image} />
                          <button
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md"
                            onClick={() => handleChange(idx, 'image', '')}
                            title="Clear image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex flex-wrap items-center gap-6 mt-4">
                    <div className="flex items-center">
                      <input
                        checked={project.disable}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        id={`disable-${idx}`}
                        onChange={(e) => handleChange(idx, 'disable', e.target.checked)}
                        type="checkbox"
                      />
                      <label className="ml-2 block text-sm font-medium text-gray-900" htmlFor={`disable-${idx}`}>
                        Disable (Hide from portfolio)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        checked={!!project.featured}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        id={`featured-${idx}`}
                        onChange={(e) => handleChange(idx, 'featured', e.target.checked)}
                        type="checkbox"
                      />
                      <label className="ml-2 block text-sm font-medium text-gray-900" htmlFor={`featured-${idx}`}>
                        Featured Project
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
