export const defaultPdfStyle = {
    headerColor: [66, 139, 202],
    textColor: [0, 0, 0],
    fontSize: 10,
    headerFontSize: 12,
    fontStyle: 'normal',
    pageOrientation: 'portrait',
    margins: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    alternateRowColors: true,
    alternateRowColor: [245, 245, 245],
    showGridLines: true,
    headerTextAlignment: 'center',
    cellTextAlignment: 'left',
};
export const defaultExcelStyle = {
    headerStyle: {
        font: {
            bold: true,
            color: 'FFFFFF',
            size: 12,
        },
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: '428BCA',
        },
        alignment: {
            horizontal: 'center',
            vertical: 'middle',
        },
        border: {
            top: { style: 'thin', color: '000000' },
            right: { style: 'thin', color: '000000' },
            bottom: { style: 'thin', color: '000000' },
            left: { style: 'thin', color: '000000' },
        },
    },
    cellStyle: {
        font: {
            size: 11,
        },
        alignment: {
            horizontal: 'left',
            vertical: 'middle',
        },
    },
    alternateRowStyle: {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: 'F5F5F5',
        },
    },
    freezeHeader: true,
    autoFilter: true,
};
export const defaultCSVStyle = {
    delimiter: ',',
    quoteStrings: true,
    includeHeaderRow: true,
    dateFormat: 'YYYY-MM-DD',
    numberFormat: {
        decimals: 2,
        thousandsSeparator: ',',
        decimalSeparator: '.',
    },
};
