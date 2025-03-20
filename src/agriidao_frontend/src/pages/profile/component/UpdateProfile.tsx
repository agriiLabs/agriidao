import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface ProfilePicModalProps {
  imagePath: string;
  onImageUpdate?: (file: File) => void;
  onClose: () => void;
  loading: boolean;
}

export const ProfilePicModal: React.FC<ProfilePicModalProps> = ({ imagePath, onImageUpdate, onClose, loading }) => {
  const { user, profile } = useSelector((state: RootState) => state.app);
  const [previewUrl, setPreviewUrl] = useState<string>(profile?.profilePic[0] || imagePath);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB limit. Please select a smaller file.');
        setSelectedFile(null);
        setPreviewUrl(profile?.profilePic[0] || imagePath); // Reset to original
        return;
      }

      setError(''); // Clear any existing error
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => setPreviewUrl(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && onImageUpdate) {
      onImageUpdate(selectedFile);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Profile Picture</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              <img src={previewUrl} className="rounded-circle mb-2" width={100} height={100} alt="Current profile preview" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="profileImageUpload" className="form-label">Select new profile picture</label>
                <input
                  className="form-control"
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="form-text mb-3">Accepted formats: JPG, PNG, GIF. Maximum file size: 5MB</div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleSubmit}
              disabled={!selectedFile || loading || !!error}
            >
              {loading ? 'Uploading...' : 'Update Picture'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};