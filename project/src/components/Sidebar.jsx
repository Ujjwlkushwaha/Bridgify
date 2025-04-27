import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  ChevronLeft,
  ChevronRight,
  Compass,
  Users,
  FolderGit2,
  Settings,
  HelpCircle,
  Crown,
  LogOut,
  Bell,
  Upload,
  Building2,
  MessageSquare,
  LayoutDashboard,
  Sun,
  Moon,
  Rocket,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = ({ isDarkMode, toggleDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, addNotification, logout } = useApp();

  // Mock user data - replace with actual user data from your context
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Developer',
    isPro: true
  };

  const currentUser = user || mockUser;

  const menuItems = [
    {
      title: 'Core',
      items: [
        { 
          icon: LayoutDashboard, 
          label: 'Dashboard', 
          path: '/dashboard'
        },
        { 
          icon: Compass, 
          label: 'Explore', 
          path: '/explore',
          badge: 'New'
        },
        { 
          icon: FolderGit2, 
          label: 'Projects', 
          path: '/projects'
        },
        { 
          icon: Users, 
          label: 'Community', 
          path: '/community',
          badge: '5'
        }
      ]
    },
    {
      title: 'Create',
      items: [
        { 
          icon: Upload, 
          label: 'Upload Project', 
          path: '/project/upload',
          isPro: true
        },
        // { 
        //   icon: Building2, 
        //   label: 'Organizations', 
        //   path: '/organizations'
        // },
        { 
          icon: Rocket, 
          label: 'Project Ideas', 
          path: '/startup-ideas',
          badge: 'Beta'
        }
      ]
    },
    {
      title: 'Connect',
      items: [
        { 
          icon: MessageSquare, 
          label: 'Messages', 
          path: '/messages',
          badge: '3'
        },
        { 
          icon: Bell, 
          label: 'Notifications', 
          path: '/notifications',
          badge: '12'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        { 
          icon: Settings, 
          label: 'Settings', 
          path: '/settings'
        },
        { 
          icon: HelpCircle, 
          label: 'Help & Support', 
          path: '/support'
        }
      ]
    }
  ];

  const handleNavigation = (path, isPro = false) => {
    if (isPro && !currentUser.isPro) {
      addNotification('This feature is only available for Pro users', 'error');
      navigate('/upgrade');
      return;
    }

    // Ensure we're using absolute paths
    const absolutePath = path.startsWith('/') ? path : `/${path}`;
    setIsProfileMenuOpen(false);
    navigate(absolutePath);
  };

  const handleUpgradeClick = () => {
    setIsProfileMenuOpen(false);
    navigate('/upgrade');
  };

  const handleLogout = () => {
    logout();
    addNotification('Successfully logged out');
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile/me');
    setIsProfileMenuOpen(false);
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-700/50">
          {!isCollapsed && (
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Bridgify</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          {isCollapsed ? (
            <div 
              className="relative cursor-pointer"
              onClick={handleProfileClick}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
                {currentUser.isPro && (
                  <div className="absolute -top-1 -right-1 bg-primary-500 rounded-full p-0.5">
                    <Crown size={12} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {currentUser.isPro && (
                    <div className="absolute -top-1 -right-1 bg-primary-500 rounded-full p-0.5">
                      <Crown size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentUser.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute top-full left-0 w-full mt-1 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 z-50">
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleNavigation('/settings')}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  >
                    Settings
                  </button>
                  {!currentUser.isPro && (
                    <button
                      onClick={handleUpgradeClick}
                      className="w-full px-4 py-2 text-sm text-left text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 font-medium"
                    >
                      Upgrade to Pro
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {!isCollapsed && (
                <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1 px-2">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(item.path, item.isPro)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 group transition-colors ${
                        location.pathname === item.path ? 'bg-primary-50/50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : ''
                      }`}
                    >
                      <item.icon size={20} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-sm text-left">{item.label}</span>
                          {item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              item.badge === 'New' || item.badge === 'Beta' 
                                ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          {item.isPro && (
                            <Crown size={14} className="text-primary-500" />
                          )}
                        </>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-2 border-t border-gray-200/50 dark:border-gray-700/50">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            {!isCollapsed && <span className="text-sm">Toggle Theme</span>}
          </button>

          {/* Pro Upgrade Button */}
          {!currentUser.isPro && (
            isCollapsed ? (
              <button 
                onClick={handleUpgradeClick}
                className="w-full p-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-500/20"
              >
                <Crown size={20} />
              </button>
            ) : (
              <button 
                onClick={handleUpgradeClick}
                className="w-full px-4 py-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-500/20 flex items-center gap-2"
              >
                <Crown size={20} />
                <span className="text-sm font-medium">Upgrade to Pro</span>
              </button>
            )
          )}

          {/* Logout Button */}
          {user && (
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="text-sm">Logout</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

export default Sidebar; 