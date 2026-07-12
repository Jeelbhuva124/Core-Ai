import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, LogOut, User, Camera, Plus, Trash2, Image, Check, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('Core AI User');
  const [profileEmail, setProfileEmail] = useState('user@example.com');
  const [profilePicture, setProfilePicture] = useState(null);
  
  // Profile Picture Menu State
  const [pendingPicture, setPendingPicture] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      try {
        const userObj = JSON.parse(storedUserStr);
        if (userObj.firstName && userObj.lastName) {
          setProfileName(`${userObj.firstName} ${userObj.lastName}`);
        } else if (userObj.username) {
          setProfileName(userObj.username);
        }

        if (userObj.email) {
          setProfileEmail(userObj.email);
        } else if (userObj.email_id) {
          setProfileEmail(userObj.email_id);
        }

        if (userObj.profilePicture) {
          setProfilePicture(userObj.profilePicture);
          setPendingPicture(userObj.profilePicture);
        }
      } catch (err) {}
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 256;
          const MAX_HEIGHT = 256;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const base64String = canvas.toDataURL('image/jpeg', 0.8);
          
          setPendingPicture(base64String);
          setHasChanges(true);
          setIsMenuOpen(false);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = (e) => {
    e.stopPropagation();
    setPendingPicture(null);
    setHasChanges(true);
    setIsMenuOpen(false);
  };

  const handleSavePicture = () => {
    setProfilePicture(pendingPicture);
    setHasChanges(false);
    
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      try {
        const userObj = JSON.parse(storedUserStr);
        if (pendingPicture) {
          userObj.profilePicture = pendingPicture;
        } else {
          delete userObj.profilePicture;
        }
        localStorage.setItem('user', JSON.stringify(userObj));
        window.dispatchEvent(new Event('profilePictureUpdated'));
      } catch (err) {}
    }
  };

  const handleCancelPicture = () => {
    setPendingPicture(profilePicture);
    setHasChanges(false);
  };

  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-semibold mb-6 text-foreground">General Profile</h1>

      <div className="max-w-2xl space-y-6">
        {/* Profile Section */}
        <div className="relative z-50 bg-card/60 backdrop-blur-sm border border-border p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          
          <div className="flex items-center gap-5 relative" ref={menuRef}>
            <div 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 p-[3px] shadow-sm flex-shrink-0 cursor-pointer group"
            >
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
              />
              
              {pendingPicture ? (
                <img 
                  src={pendingPicture} 
                  alt="Profile Preview" 
                  className="w-full h-full rounded-full object-cover border-2 border-transparent bg-card"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-500 uppercase">
                    {profileName.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Hover Overlay */}
              <div className="absolute inset-[3px] rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Camera className="w-5 h-5 text-white" />
              </div>

              {/* Plus Icon Badge */}
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-2 border-card shadow-sm z-20 group-hover:scale-110 transition-transform">
                <Plus className="w-3 h-3 stroke-[3]" />
              </div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-20 left-0 w-48 bg-card border border-border shadow-xl rounded-xl overflow-hidden z-50"
                >
                  <div className="flex flex-col p-1">
                    <button 
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-muted/60 text-foreground transition-colors rounded-lg"
                    >
                      <Image className="w-4 h-4 text-primary" />
                      Change Picture
                    </button>
                    <button 
                      onClick={handleRemovePicture}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-destructive/10 text-destructive transition-colors rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Picture
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <h2 className="text-xl font-bold text-foreground capitalize tracking-tight">{profileName}</h2>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">{profileEmail}</p>
            </div>
          </div>

          {/* Action Buttons (Save/Cancel) */}
          <AnimatePresence>
            {hasChanges && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto"
              >
                <button
                  onClick={handleCancelPicture}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/50 hover:bg-muted rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  onClick={handleSavePicture}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
