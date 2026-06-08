import React, {useState, useEffect} from 'react';
import Head from 'next/head';

interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  disable: boolean;
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

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [fileSha, setFileSha] = useState('');

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
      {title: '', description: '', url: '', image: '', disable: false},
      ...projects,
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem('github_pat');
    setToken('');
    setIsLoggedIn(false);
    setProjects([]);
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
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 grow">
            <strong>Error!</strong> {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 grow">
            <strong>Success!</strong> {success}
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
                     <label className="block text-sm font-medium text-gray-700 mb-1">Image Source (URL or Path)</label>
                     <input
                       className="w-full text-black border border-gray-300 p-2 rounded outline-none focus:border-orange-500"
                       onChange={(e) => handleChange(idx, 'image', e.target.value)}
                       value={project.image}
                     />
                     {project.image && (
                       <img alt="preview" className="mt-2 h-16 object-cover rounded border" src={project.image} />
                     )}
                  </div>
                  
                  <div className="col-span-2 flex items-center mt-2">
                    <input
                      checked={project.disable}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      id={`disable-${idx}`}
                      onChange={(e) => handleChange(idx, 'disable', e.target.checked)}
                      type="checkbox"
                    />
                    <label className="ml-2 block text-sm text-gray-900" htmlFor={`disable-${idx}`}>
                      Disable (Hide from portfolio)
                    </label>
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
