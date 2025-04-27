import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star,
  Clock,
  Heart,
  Pin,
  Eye,
  MessageSquare,
  Trophy,
  Zap,
  GitBranch,
  Users,
  Briefcase,
  MapPin,
  Mail,
  Link,
  Check,
  X
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import GitHubActivity from '../components/GitHubActivity';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('pinned');
  const { projects } = useApp();
  
  // Mock user achievements data
  const achievements = [
    { id: 1, title: "Early Adopter", icon: Zap, description: "Joined in the first month", date: "Mar 2022" },
    { id: 2, title: "Super Contributor", icon: Star, description: "100+ contributions", date: "Jun 2022" },
    { id: 3, title: "Team Player", icon: Users, description: "10+ collaborations", date: "Aug 2022" },
    { id: 4, title: "Code Master", icon: Trophy, description: "1000+ lines merged", date: "Oct 2022" }
  ];

  // Mock user activity data
  const recentActivity = [
    { id: 1, type: "commit", message: "Updated AI model training pipeline", project: "AI Assistant", time: "2 hours ago" },
    { id: 2, type: "review", message: "Reviewed PR #123: Add authentication", project: "SmartHub", time: "5 hours ago" },
    { id: 3, type: "issue", message: "Opened issue: Performance optimization", project: "CodeCollab", time: "1 day ago" },
    { id: 4, type: "fork", message: "Forked BlockchainVote repository", project: "BlockchainVote", time: "2 days ago" }
  ];

  // Mock collaboration requests data
  const collaborationRequests = {
    sent: [
      {
        id: 1,
        projectName: "AI Assistant",
        projectOwner: "Sarah Chen",
        status: "pending",
        date: "2 days ago"
      },
      {
        id: 2,
        projectName: "E-commerce Platform",
        projectOwner: "Mike Johnson",
        status: "accepted",
        date: "1 week ago"
      }
    ],
    received: [
      {
        id: 3,
        projectName: "Task Manager",
        requester: "Alex Brown",
        requesterAvatar: "https://i.pravatar.cc/150?img=4",
        status: "pending",
        date: "1 day ago"
      },
      {
        id: 4,
        projectName: "Weather App",
        requester: "Emma Wilson",
        requesterAvatar: "https://i.pravatar.cc/150?img=5",
        status: "pending",
        date: "3 days ago"
      }
    ]
  };

  // Mock user data
  const userData = {
    name: "John Doe",
    username: "@johndoe",
    role: "Full Stack Developer",
    company: "Tech Innovators Inc.",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    website: "https://johndoe.dev",
    joinedDate: "Joined March 2022",
    bio: "Full-stack developer passionate about building innovative solutions. Currently working on AI-powered applications.",
    skills: ["React", "Node.js", "Python", "MongoDB", "AWS", "TypeScript", "GraphQL"],
    socialLinks: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      website: "https://johndoe.dev"
    },
    stats: {
      followers: 245,
      following: 182,
      projects: 12
    }
  };

  // Mock GitHub data
  const githubData = {
    totalCommits: 1432,
    pullRequests: 127,
    totalStars: 342,
    totalForks: 89,
    popularRepos: [
      {
        id: 1,
        name: 'awesome-project',
        description: 'A full-stack application with React and Node.js',
        language: 'TypeScript',
        languageColor: '#2b7489',
        stars: 245,
        forks: 45
      },
      {
        id: 2,
        name: 'ai-assistant',
        description: 'AI-powered personal assistant using machine learning',
        language: 'Python',
        languageColor: '#3572A5',
        stars: 189,
        forks: 32
      },
      {
        id: 3,
        name: 'blockchain-wallet',
        description: 'Secure cryptocurrency wallet implementation',
        language: 'Rust',
        languageColor: '#dea584',
        stars: 156,
        forks: 28
      },
      {
        id: 4,
        name: 'react-components',
        description: 'A collection of reusable React components',
        language: 'JavaScript',
        languageColor: '#f1e05a',
        stars: 134,
        forks: 23
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'commit',
        description: 'Implemented new authentication system',
        repository: 'awesome-project',
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'pr',
        description: 'Add dark mode support',
        repository: 'react-components',
        time: '1 day ago'
      },
      {
        id: 3,
        type: 'issue',
        description: 'Performance optimization for large datasets',
        repository: 'ai-assistant',
        time: '2 days ago'
      },
      {
        id: 4,
        type: 'fork',
        description: 'Forked blockchain-wallet',
        repository: 'blockchain-wallet',
        time: '3 days ago'
      }
    ]
  };

  const handleCollaborationResponse = (requestId, accept) => {
    // Handle collaboration request response
    const action = accept ? 'accepted' : 'declined';
    // In a real app, you would make an API call here
    console.log(`Request ${requestId} ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-9xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - User Info */}
          <div className="col-span-12 lg:col-span-3">
            
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />
                <div className="relative px-6 pb-6">
                  <div className="absolute -top-12 left-6">
                    <div className="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/300" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="pt-14">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {userData.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {userData.username}
                        </p>
                      </div>
                      <button className="px-4 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-full hover:bg-primary-600 transition-colors">
                        Follow
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {userData.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {userData.skills.slice(0, 5).map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {userData.skills.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-full">
                          +{userData.skills.length - 5} more
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {userData.stats.projects}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {userData.stats.followers}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Followers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {userData.stats.following}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Following
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{userData.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${userData.email}`} className="text-primary-500 hover:text-primary-600">
                      {userData.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Link className="w-4 h-4 text-gray-400" />
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600">
                      {userData.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex w-full">
              {/* Achievements */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary-500" />
                  Achievements
                </h3>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm rounded-full">
                      {achievements.length} Total
                    </span>
                  </div>
                  <div className="space-y-6 w-[50vh]">
                    {achievements.map((achievement, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={achievement.id}
                        className="relative group"
                      >
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <div className="p-3 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/30 transition-colors">
                            <achievement.icon className="w-6 h-6 text-primary-500" />
                      </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                          {achievement.title}
                        </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                          {achievement.date}
                        </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {achievement.description}
                            </p>
                      </div>
                    </div>
                      </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-500" />
                  Recent Activity
                </h3>
                    <button className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      View All
                    </button>
                  </div>
                  <div className="relative w-[50vh]">
                    <div className="absolute top-0 bottom-0 left-[1.75rem] w-px bg-gradient-to-b from-primary-500/0 via-primary-500/50 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/30 dark:to-primary-400/0" />
                    <div className="space-y-6">
                      {recentActivity.map((activity, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={activity.id}
                          className="relative pl-12"
                        >
                          <div className="absolute left-0 p-1 bg-white dark:bg-gray-800 rounded-full">
                            <span className={`flex items-center justify-center w-5 h-5 rounded-full ${
                              activity.type === 'commit' ? 'bg-blue-500 dark:bg-blue-600' :
                              activity.type === 'review' ? 'bg-green-500 dark:bg-green-600' :
                              activity.type === 'issue' ? 'bg-yellow-500 dark:bg-yellow-600' :
                              'bg-purple-500 dark:bg-purple-600'
                            }`}>
                              {activity.type === 'commit' && <GitBranch className="w-3 h-3 text-white" />}
                              {activity.type === 'review' && <Eye className="w-3 h-3 text-white" />}
                              {activity.type === 'issue' && <MessageSquare className="w-3 h-3 text-white" />}
                              {activity.type === 'fork' && <GitBranch className="w-3 h-3 text-white" />}
                            </span>
                      </div>
                          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                          {activity.message}
                        </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs font-semibold text-primary-500 dark:text-primary-400">
                            {activity.project}
                          </span>
                              <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="w-3 h-3" />
                            {activity.time}
                          </span>
                        </div>
                      </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex overflow-x-auto">
                  {[
                    { id: 'pinned', label: 'Pinned Projects', icon: Pin },
                    { id: 'liked', label: 'Liked Projects', icon: Heart },
                    { id: 'collaboration', label: 'Collaboration', icon: Users }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap ${
                        activeTab === id 
                          ? 'border-b-2 border-primary-500 text-primary-600' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'collaboration' ? (
                  <div className="space-y-8">
                    {/* Collaboration Stats */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-yellow-500/10 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h4>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {collaborationRequests.sent.filter(r => r.status === 'pending').length + 
                               collaborationRequests.received.filter(r => r.status === 'pending').length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-green-500/10 rounded-lg">
                            <Check className="w-6 h-6 text-green-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Accepted</h4>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {collaborationRequests.sent.filter(r => r.status === 'accepted').length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Users className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</h4>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {collaborationRequests.sent.length + collaborationRequests.received.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sent Requests */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <GitBranch className="w-5 h-5 text-primary-500" />
                          Sent Requests
                        </h3>
                        <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm rounded-full">
                          {collaborationRequests.sent.length} Total
                        </span>
                      </div>
                      <div className="space-y-4">
                        {collaborationRequests.sent.map((request, idx) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={request.id}
                            className="group"
                          >
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${
                                  request.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500'
                                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500'
                                }`}>
                                  {request.status === 'pending' ? <Clock className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                                </div>
                                <div>
                                  <h4 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                    {request.projectName}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Owned by {request.projectOwner}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {request.date}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  request.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                }`}>
                                  {request.status === 'pending' ? 'Pending' : 'Accepted'}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Received Requests */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary-500" />
                          Received Requests
                        </h3>
                        <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm rounded-full">
                          {collaborationRequests.received.length} Total
                        </span>
                      </div>
                      <div className="space-y-4">
                        {collaborationRequests.received.map((request, idx) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={request.id}
                            className="group"
                          >
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-colors">
                              <div className="flex items-center gap-4">
                                <img
                                  src={request.requesterAvatar}
                                  alt={request.requester}
                                  className="w-12 h-12 rounded-xl object-cover border-2 border-white dark:border-gray-700 shadow-md"
                                />
                                <div>
                                  <h4 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                    {request.projectName}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    From {request.requester}
                                    <span className="inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {request.date}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleCollaborationResponse(request.id, true)}
                                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                                >
                                  <Check className="w-4 h-4" />
                                  Accept
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleCollaborationResponse(request.id, false)}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                  Decline
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects[activeTab].map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;