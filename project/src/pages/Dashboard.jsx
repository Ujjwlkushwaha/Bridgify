import { motion, AnimatePresence } from 'framer-motion';
import { Github, Calendar, Tag, Plus, MessageSquare, Bell, Users, Edit, Trash, Play, Eye, AlertCircle } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import ProjectNotFound from '../components/ProjectNotFound';
import ComingSoon from '../components/ComingSoon';
import { useState } from 'react';

const Dashboard = () => {
  const { projects, deleteProject } = useProjects();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleDeleteClick = (e, project) => {
    e.stopPropagation();
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete.id);
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (selectedFilter === 'all') return true;
    return project.status.toLowerCase() === selectedFilter;
  });

  const statusCounts = {
    all: projects.length,
    'in progress': projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your project portfolio
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/project/upload')}
          className="btn btn-primary flex justify-center items-center shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={20} className="mr-2" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Project Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {[
          { label: 'All Projects', count: statusCounts.all, color: 'primary', filter: 'all' },
          { label: 'In Progress', count: statusCounts['in progress'], color: 'blue', filter: 'in progress' },
          { label: 'Completed', count: statusCounts.completed, color: 'green', filter: 'completed' }
        ].map((stat) => (
          <motion.button
            key={stat.filter}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFilter(stat.filter)}
            className={`card p-6 bg-gradient-to-br cursor-pointer transition-all ${
              selectedFilter === stat.filter
                ? `from-${stat.color}-500/20 to-${stat.color}-500/10 ring-2 ring-${stat.color}-500/20`
                : `from-${stat.color}-500/10 to-${stat.color}-500/5 hover:from-${stat.color}-500/15 hover:to-${stat.color}-500/10`
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
            <p className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
              {stat.count}
            </p>
          </motion.button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
          {filteredProjects.length === 0 ? (
            <ProjectNotFound />
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300"
                  >
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 dark:from-gray-900/5 dark:to-gray-900/0 pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row">
                      {/* Media Section */}
                      <div className="relative md:w-80 h-56 overflow-hidden">
                        {project.demoUrl ? (
                          <div className="relative w-full h-full group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                            <img
                              src={project.imagePreview}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <a
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-6 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-xl flex items-center gap-2 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                  <Play size={18} />
                                  <span className="font-medium">View Live Demo</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : project.imagePreview ? (
                          <div className="relative w-full h-full group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                            <img
                              src={project.imagePreview}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle preview
                                  }}
                                  className="px-6 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-xl flex items-center gap-2 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                  <Eye size={18} />
                                  <span className="font-medium">Preview Project</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500">No preview available</span>
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-md ${
                            project.status === 'Completed' 
                              ? 'bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-green-500/50' 
                              : project.status === 'In Progress' 
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/50' 
                              : 'bg-primary-500/10 text-primary-600 dark:text-primary-400 ring-1 ring-primary-500/50'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">
                                {project.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 backdrop-blur-sm"
                              >
                                <Tag size={12} className="inline-block mr-1.5 opacity-60" />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Footer Section */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={16} className="opacity-60" />
                              {new Date(project.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <Github size={16} className="opacity-80" />
                                <span>Code</span>
                              </motion.a>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/project/edit/${project.id}`);
                                }}
                                className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors duration-200"
                              >
                                <Edit size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => handleDeleteClick(e, project)}
                                className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                              >
                                <Trash size={18} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
        </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <ComingSoon
            feature="Project Messages"
            description="Chat with collaborators and discuss project details in real-time."
            icon={MessageSquare}
          />
          <ComingSoon
            feature="Notifications"
            description="Stay updated with project activities and team communications."
            icon={Bell}
          />
          <ComingSoon
            feature="Team Management"
            description="Invite team members and manage project collaborators."
            icon={Users}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4 text-red-500">
              <AlertCircle size={24} />
              <h3 className="text-xl font-semibold">Delete Project</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete &ldquo;{projectToDelete?.title}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProjectToDelete(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete Project
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;