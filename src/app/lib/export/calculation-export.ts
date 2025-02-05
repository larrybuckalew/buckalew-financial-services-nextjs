import * as XLSX from 'xlsx'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Prisma } from '@prisma/client'

export class CalculationExportService {
  // Export to Excel
  static async exportToExcel(
    calculations: Prisma.CalculationGetPayload<{}>[]
  ): Promise<Buffer> {
    // Transform calculations to worksheet data
    const worksheetData = calculations.map(calc => ({
      ID: calc.id,
      Type: calc.type,
      Date: calc.createdAt.toISOString(),
      Input: JSON.stringify(calc.inputData),
      Results: JSON.stringify(calc.results)
    }))

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    const workbook = XLSX.utils.book_new()
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calculations')
    
    // Generate buffer
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
  }

  // Export to PDF
  static async exportToPDF(
    calculations: Prisma.CalculationGetPayload<{}>[]
  ): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    
    let yOffset = height - 50

    // Title
    page.drawText('Buckalew Financial Services - Calculations', {
      x: 50,
      y: yOffset,
      size: 18,
      font,
      color: rgb(0, 0, 0)
    })
    
    yOffset -= 40

    // Render each calculation
    calculations.forEach(calc => {
      // Calculation details
      page.drawText(`Calculation ID: ${calc.id}`, {
        x: 50,
        y: yOffset,
        size: 12,
        font,
        color: rgb(0.2, 0.2, 0.2)
      })
      
      yOffset -= 20
      
      page.drawText(`Type: ${calc.type}`, {
        x: 70,
        y: yOffset,
        size: 10,
        font,
        color: rgb(0.4, 0.4, 0.4)
      })
      
      yOffset -= 20
      
      // Input and results rendering
      const inputText = `Input: ${JSON.stringify(calc.inputData, null, 2)}`
      const resultsText = `Results: ${JSON.stringify(calc.results, null, 2)}`
      
      page.drawText(inputText, {
        x: 70,
        y: yOffset,
        size: 9,
        font,
        color: rgb(0.5, 0.5, 0.5)
      })
      
      yOffset -= (20 + (inputText.split('\n').length * 10))
      
      page.drawText(resultsText, {
        x: 70,
        y: yOffset,
        size: 9,
        font,
        color: rgb(0.5, 0.5, 0.5)
      })
      
      yOffset -= (20 + (resultsText.split('\n').length * 10))
      
      // Separator
      page.drawLine({
        start: { x: 50, y: yOffset },
        end: { x: width - 50, y: yOffset },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8)
      })
      
      yOffset -= 20
    })
    
    // Finalize PDF
    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes)
  }

  // Export to CSV
  static exportToCSV(
    calculations: Prisma.CalculationGetPayload<{}>[]
  ): Buffer {
    // Convert calculations to CSV format
    const csvHeader = [
      'ID', 'Type', 'Date', 'Input', 'Results'
    ].join(',')

    const csvRows = calculations.map(calc => 
      [
        calc.id,
        calc.type,
        calc.createdAt.toISOString(),
        `"${JSON.stringify(calc.inputData).replace(/"/g, '""')}"`,
        `"${JSON.stringify(calc.results).replace(/"/g, '""')}"`
      ].join(',')
    )

    const csvContent = [csvHeader, ...csvRows].join('\n')
    return Buffer.from(csvContent, 'utf-8')
  }

  // Validate export request
  static validateExportRequest(
    userId: string, 
    calculations: Prisma.CalculationGetPayload<{}>[]
  ): void {
    // Ensure user can only export their own calculations
    const invalidCalculations = calculations.filter(
      calc => calc.userId !== userId
    )

    if (invalidCalculations.length > 0) {
      throw new Error('Unauthorized calculation export attempt')
    }

    // Optional: Add export limit
    if (calculations.length > 1000) {
      throw new Error('Export limited to 1000 calculations')
    }
  }
}

// Export formats enum
export enum ExportFormat {
  XLSX = 'xlsx',
  PDF = 'pdf',
  CSV = 'csv'
}