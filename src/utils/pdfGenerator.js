import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FinancialCalculator } from './financialCalculations';
export class PDFGenerator {
    static async generateRetirementReport(clientName, inputs) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;
        // Get the font
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        // Calculate retirement projections
        const projections = FinancialCalculator.calculateRetirementProjection(inputs);
        // Start drawing
        let currentY = height - 50;
        const margin = 50;
        const lineHeight = 20;
        // Header
        page.drawText('Retirement Planning Report', {
            x: margin,
            y: currentY,
            size: 24,
            font: boldFont,
            color: rgb(0, 0, 0),
        });
        currentY -= lineHeight * 2;
        // Client Information
        page.drawText(`Client: ${clientName}`, {
            x: margin,
            y: currentY,
            size: fontSize,
            font: font,
        });
        currentY -= lineHeight * 2;
        // Input Summary
        page.drawText('Planning Parameters:', {
            x: margin,
            y: currentY,
            size: fontSize + 2,
            font: boldFont,
        });
        currentY -= lineHeight;
        const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
        const inputSummaries = [
            `Current Age: ${inputs.currentAge}`,
            `Retirement Age: ${inputs.retirementAge}`,
            `Current Savings: ${formatCurrency(inputs.currentSavings)}`,
            `Monthly Contribution: ${formatCurrency(inputs.monthlyContribution)}`,
            `Expected Return: ${inputs.expectedReturn}%`,
            `Inflation Rate: ${inputs.inflationRate}%`,
            `Desired Retirement Income: ${formatCurrency(inputs.desiredRetirementIncome)}`,
        ];
        inputSummaries.forEach(text => {
            page.drawText(text, {
                x: margin + 20,
                y: currentY,
                size: fontSize,
                font: font,
            });
            currentY -= lineHeight;
        });
        currentY -= lineHeight;
        // Projection Table Header
        const columns = [
            { title: 'Age', width: 50 },
            { title: 'Year', width: 60 },
            { title: 'Balance', width: 100 },
            { title: 'Contributions', width: 100 },
            { title: 'Interest', width: 100 },
        ];
        let currentX = margin;
        columns.forEach(column => {
            page.drawText(column.title, {
                x: currentX,
                y: currentY,
                size: fontSize,
                font: boldFont,
            });
            currentX += column.width;
        });
        currentY -= lineHeight;
        // Draw horizontal line
        page.drawLine({
            start: { x: margin, y: currentY + 5 },
            end: { x: width - margin, y: currentY + 5 },
            thickness: 1,
            color: rgb(0, 0, 0),
        });
        currentY -= 5;
        // Projection Table Data
        projections.forEach((projection, index) => {
            // Check if we need a new page
            if (currentY < margin) {
                page = pdfDoc.addPage();
                currentY = height - 50;
                // Draw column headers on new page
                currentX = margin;
                columns.forEach(column => {
                    page.drawText(column.title, {
                        x: currentX,
                        y: currentY,
                        size: fontSize,
                        font: boldFont,
                    });
                    currentX += column.width;
                });
                currentY -= lineHeight;
            }
            currentX = margin;
            const data = [
                projection.age.toString(),
                projection.year.toString(),
                formatCurrency(projection.savingsBalance),
                formatCurrency(projection.contributionsThisYear),
                formatCurrency(projection.interestEarned),
            ];
            data.forEach((text, i) => {
                page.drawText(text, {
                    x: currentX,
                    y: currentY,
                    size: fontSize,
                    font: font,
                });
                currentX += columns[i].width;
            });
            currentY -= lineHeight;
        });
        // Final Summary
        const finalProjection = projections[projections.length - 1];
        page = pdfDoc.addPage();
        currentY = height - 50;
        page.drawText('Retirement Summary', {
            x: margin,
            y: currentY,
            size: fontSize + 4,
            font: boldFont,
        });
        currentY -= lineHeight * 2;
        const summaryPoints = [
            `At retirement age ${inputs.retirementAge}, your projected savings will be:`,
            formatCurrency(finalProjection.savingsBalance),
            '',
            'Based on the 4% withdrawal rule, this could provide an annual retirement income of:',
            formatCurrency(finalProjection.savingsBalance * 0.04),
            '',
            `Your desired retirement income is: ${formatCurrency(inputs.desiredRetirementIncome)}`,
            '',
            finalProjection.savingsBalance * 0.04 >= inputs.desiredRetirementIncome
                ? 'You are on track to meet your retirement goals! 🎉'
                : 'Consider increasing your savings to meet your retirement goals.',
        ];
        summaryPoints.forEach(text => {
            page.drawText(text, {
                x: margin,
                y: currentY,
                size: fontSize,
                font: text.includes('track') ? boldFont : font,
                color: text.includes('track')
                    ? text.includes('on track') ? rgb(0, 0.5, 0) : rgb(0.8, 0, 0)
                    : rgb(0, 0, 0),
            });
            currentY -= lineHeight;
        });
        // Add disclaimer
        currentY -= lineHeight * 2;
        const disclaimer = [
            'Disclaimer:',
            'This report is for informational purposes only and should not be considered as financial advice.',
            'Actual results may vary based on market conditions, inflation, and other factors.',
            'Please consult with a qualified financial advisor for personalized recommendations.',
        ];
        disclaimer.forEach(text => {
            page.drawText(text, {
                x: margin,
                y: currentY,
                size: 8,
                font: text === 'Disclaimer:' ? boldFont : font,
                color: rgb(0.5, 0.5, 0.5),
            });
            currentY -= 10;
        });
        return pdfDoc.save();
    }
    static async generateMortgageReport(clientName, loanAmount, annualRate, loanTermYears) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        let currentY = height - 50;
        const margin = 50;
        const lineHeight = 20;
        // Header
        page.drawText('Mortgage Amortization Schedule', {
            x: margin,
            y: currentY,
            size: 24,
            font: boldFont,
        });
        currentY -= lineHeight * 2;
        // Loan Details
        const monthlyPayment = FinancialCalculator.calculateMortgagePayment(loanAmount, annualRate, loanTermYears);
        const loanDetails = [
            `Client: ${clientName}`,
            `Loan Amount: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(loanAmount)}`,
            `Annual Interest Rate: ${annualRate}%`,
            `Loan Term: ${loanTermYears} years`,
            `Monthly Payment: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyPayment)}`,
        ];
        loanDetails.forEach(detail => {
            page.drawText(detail, {
                x: margin,
                y: currentY,
                size: fontSize,
                font: font,
            });
            currentY -= lineHeight;
        });
        return pdfDoc.save();
    }
}
