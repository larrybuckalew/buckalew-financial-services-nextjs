import React, { useState, useEffect } from 'react'
import { 
  Check, 
  Upload, 
  Trash2, 
  Image as ImageIcon 
} from 'lucide-react'

// Types for branding configuration
interface BrandingConfig {
  id: string
  companyName: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  logoUrl?: string
  faviconUrl?: string
}

// Types for uploaded files
interface FileUpload {
  id: string
  fileName: string
  fileType: string
  path: string
  uploadedAt: string
}

const BrandingManager: React.FC = () => {
  // State for branding configuration
  const [config, setConfig] = useState<BrandingConfig | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])
  
  // State for form editing
  const [editableConfig, setEditableConfig] = useState<Partial<BrandingConfig>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Fetch current branding configuration
  useEffect(() => {
    async function fetchBrandingConfig() {
      try {
        const response = await fetch('/api/branding/config')
        const data = await response.json()
        setConfig(data)
        setEditableConfig(data)
      } catch (error) {
        console.error('Failed to fetch branding config:', error)
      }
    }

    // Fetch uploaded files
    async function fetchUploadedFiles() {
      try {
        const response = await fetch('/api/branding/config?action=files')
        const data = await response.json()
        setUploadedFiles(data)
      } catch (error) {
        console.error('Failed to fetch uploaded files:', error)
      }
    }

    fetchBrandingConfig()
    fetchUploadedFiles()
  }, [])

  // Update configuration handler
  const handleConfigUpdate = async () => {
    try {
      const response = await fetch('/api/branding/config', {
        method: 'PUT',
        body: JSON.stringify(editableConfig)
      })
      const updatedConfig = await response.json()
      setConfig(updatedConfig)
      alert('Branding configuration updated successfully!')
    } catch (error) {
      console.error('Failed to update config:', error)
      alert('Failed to update branding configuration')
    }
  }

  // File upload handler
  const handleFileUpload = async (fileType: string) => {
    if (!selectedFile) {
      alert('Please select a file first')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('fileType', fileType)

    try {
      const response = await fetch('/api/branding/config', {
        method: 'POST',
        body: formData
      })
      const uploadedFile = await response.json()
      
      // Update uploaded files list
      setUploadedFiles(prev => [...prev, uploadedFile])
      
      // Clear file selection
      setSelectedFile(null)
      
      alert(`${fileType} uploaded successfully!`)
    } catch (error) {
      console.error('File upload failed:', error)
      alert('File upload failed')
    }
  }

  // Delete file handler
  const handleFileDelete = async (fileId: string) => {
    try {
      await fetch('/api/branding/config', {
        method: 'DELETE',
        body: JSON.stringify({ fileId })
      })
      
      // Remove file from state
      setUploadedFiles(prev => 
        prev.filter(file => file.id !== fileId)
      )
      
      alert('File deleted successfully!')
    } catch (error) {
      console.error('File deletion failed:', error)
      alert('Failed to delete file')
    }
  }

  // Render file upload section
  const renderFileUploadSection = (fileType: string) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 capitalize">
          Upload {fileType}
        </h3>
        <div className="flex items-center space-x-4">
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setSelectedFile(file)
            }}
            className="bfs-input"
          />
          <button 
            onClick={() => handleFileUpload(fileType)}
            className="bfs-button flex items-center"
            disabled={!selectedFile}
          >
            <Upload className="mr-2" size={20} />
            Upload
          </button>
        </div>
      </div>
    )
  }

  // Render uploaded files section
  const renderUploadedFiles = (fileType: string) => {
    const filteredFiles = uploadedFiles.filter(
      file => file.fileType === fileType
    )

    return (
      <div className="mt-4">
        <h4 className="text-md font-medium mb-2">
          Uploaded {fileType}s
        </h4>
        {filteredFiles.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredFiles.map(file => (
              <div 
                key={file.id} 
                className="bfs-card relative"
              >
                <img 
                  src={file.path} 
                  alt={file.fileName} 
                  className="w-full h-32 object-contain"
                />
                <div className="absolute top-2 right-2">
                  <button 
                    onClick={() => handleFileDelete(file.id)}
                    className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-center mt-2 truncate">
                  {file.fileName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Render color input
  const renderColorInput = (
    label: string, 
    key: keyof BrandingConfig
  ) => {
    return (
      <div className="mb-4">
        <label className="block mb-2">{label}</label>
        <div className="flex items-center">
          <input 
            type="color" 
            value={editableConfig[key] || ''}
            onChange={(e) => setEditableConfig(prev => ({
              ...prev,
              [key]: e.target.value
            }))}
            className="mr-4 w-16 h-10 cursor-pointer"
          />
          <input 
            type="text" 
            value={editableConfig[key] || ''}
            onChange={(e) => setEditableConfig(prev => ({
              ...prev,
              [key]: e.target.value
            }))}
            className="bfs-input flex-grow"
          />
        </div>
      </div>
    )
  }

  // Preview of current configuration
  const renderConfigPreview = () => {
    if (!config) return null

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Current Configuration Preview
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Company Name:</p>
            <p>{config.companyName}</p>
          </div>
          <div>
            <p className="font-medium">Colors:</p>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full" 
                style={{ backgroundColor: config.primaryColor }}
              />
              <div 
                className="w-8 h-8 rounded-full" 
                style={{ backgroundColor: config.secondaryColor }}
              />
              <div 
                className="w-8 h-8 rounded-full" 
                style={{ backgroundColor: config.textColor }}
              />
            </div>
          </div>
          {config.logoUrl && (
            <div>
              <p className="font-medium">Current Logo:</p>
              <img 
                src={config.logoUrl} 
                alt="Current Logo" 
                className="max-w-32 max-h-32 object-contain"
              />
            </div>
          )}
          {config.faviconUrl && (
            <div>
              <p className="font-medium">Current Favicon:</p>
              <img 
                src={config.faviconUrl} 
                alt="Current Favicon" 
                className="max-w-16 max-h-16 object-contain"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  // If configuration is not loaded
  if (!config) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Branding Manager
      </h2>

      {/* Company Name */}
      <div className="mb-6">
        <label className="block mb-2">Company Name</label>
        <input 
          type="text"
          value={editableConfig.companyName || ''}
          onChange={(e) => setEditableConfig(prev => ({
            ...prev,
            companyName: e.target.value
          }))}
          className="bfs-input"
        />
      </div>

      {/* Color Configuration */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Color Configuration
        </h3>
        {renderColorInput('Primary Color', 'primaryColor')}
        {renderColorInput('Secondary Color', 'secondaryColor')}
        {renderColorInput('Text Color', 'textColor')}
      </div>

      {/* Logo Upload */}
      <div className="mb-6">
        {renderFileUploadSection('logo')}
        {renderUploadedFiles('logo')}
      </div>

      {/* Favicon Upload */}
      <div className="mb-6">
        {renderFileUploadSection('favicon')}
        {renderUploadedFiles('favicon')}
      </div>

      {/* Configuration Preview */}
      {renderConfigPreview()}

      {/* Save Changes Button */}
      <div className="mt-6">
        <button 
          onClick={handleConfigUpdate}
          className="bfs-button flex items-center"
        >
          <Check className="mr-2" size={20} />
          Save Branding Configuration
        </button>
      </div>
    </div>
  )
}

export default BrandingManager