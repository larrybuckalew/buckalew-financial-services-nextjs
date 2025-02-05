import { PrismaClient, FileType } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

export class BrandingService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Get current branding configuration
  async getCurrentBranding() {
    return this.prisma.brandingConfig.findFirst() || 
      this.prisma.brandingConfig.create({
        data: {} // Creates default configuration
      })
  }

  // Update branding configuration
  async updateBrandingConfig(
    data: {
      companyName?: string
      primaryColor?: string
      secondaryColor?: string
      textColor?: string
      userId?: string
    }
  ) {
    return this.prisma.brandingConfig.update({
      where: { id: (await this.getCurrentBranding()).id },
      data: {
        ...data,
        lastUpdated: new Date(),
        updatedBy: data.userId
      }
    })
  }

  // Upload and process branding file
  async uploadBrandingAsset(
    file: Express.Multer.File, 
    fileType: FileType,
    userId?: string
  ) {
    // Validate file
    this.validateFile(file)

    // Generate unique filename
    const fileName = this.generateUniqueFileName(file)
    const uploadPath = path.join(
      process.cwd(), 
      'public', 
      'branding', 
      fileName
    )

    // Ensure directory exists
    fs.mkdirSync(path.dirname(uploadPath), { recursive: true })

    // Save file
    fs.writeFileSync(uploadPath, file.buffer)

    // Save file metadata
    const fileUpload = await this.prisma.fileUpload.create({
      data: {
        fileName,
        fileType: fileType.toString(),
        originalName: file.originalname,
        mimeType: file.mimetype,
        path: `/branding/${fileName}`,
        size: file.size,
        uploadedBy: userId
      }
    })

    // Update branding config based on file type
    if (fileType === FileType.LOGO) {
      await this.updateBrandingConfig({ 
        logoUrl: `/branding/${fileName}`,
        userId 
      })
    } else if (fileType === FileType.FAVICON) {
      await this.updateBrandingConfig({ 
        faviconUrl: `/branding/${fileName}`,
        userId 
      })
    }

    return fileUpload
  }

  // Validate uploaded file
  private validateFile(file: Express.Multer.File) {
    // Max file size: 5MB
    const MAX_FILE_SIZE = 5 * 1024 * 1024
    
    // Allowed file types
    const ALLOWED_MIME_TYPES = [
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'image/x-icon' // for favicon
    ]

    if (!file) {
      throw new Error('No file uploaded')
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 5MB limit')
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new Error('Invalid file type')
    }
  }

  // Generate unique filename
  private generateUniqueFileName(file: Express.Multer.File): string {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`
    const extension = path.extname(file.originalname)
    return `${uniqueSuffix}${extension}`
  }

  // Get all uploaded branding assets
  async getBrandingAssets(userId?: string) {
    return this.prisma.fileUpload.findMany({
      where: {
        fileType: {
          in: [
            FileType.LOGO.toString(), 
            FileType.FAVICON.toString(), 
            FileType.HERO_IMAGE.toString()
          ]
        },
        uploadedBy: userId
      },
      orderBy: { uploadedAt: 'desc' }
    })
  }

  // Delete a branding asset
  async deleteBrandingAsset(fileId: string, userId?: string) {
    // Find the file
    const file = await this.prisma.fileUpload.findUnique({
      where: { id: fileId }
    })

    if (!file) {
      throw new Error('File not found')
    }

    // Check user permissions (optional)
    if (file.uploadedBy !== userId) {
      throw new Error('Unauthorized to delete this file')
    }

    // Remove physical file
    const fullPath = path.join(
      process.cwd(), 
      'public', 
      file.path.slice(1) // Remove leading '/'
    )

    try {
      fs.unlinkSync(fullPath)
    } catch (error) {
      console.warn('Could not delete physical file:', error)
    }

    // Remove database record
    return this.prisma.fileUpload.delete({
      where: { id: fileId }
    })
  }
}

export const brandingService = new BrandingService()