import Papa from 'papaparse';
export const exportToCSV = ({ filename, data, fields, transformData, }) => {
    const processedData = transformData ? transformData(data) : data;
    const csv = Papa.unparse(processedData, {
        fields: fields || Object.keys(processedData[0] || {}),
        delimiter: ',',
        quotes: true,
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
        return;
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
export const exportMortgageData = (data) => {
    const amortizationSchedule = data.amortizationSchedule.map((item) => ({
        month: item.month,
        payment: item.payment.toFixed(2),
        principal: item.principal.toFixed(2),
        interest: item.interest.toFixed(2),
        balance: item.balance.toFixed(2),
    }));
    exportToCSV({
        filename: 'mortgage-schedule.csv',
        data: amortizationSchedule,
        fields: ['month', 'payment', 'principal', 'interest', 'balance'],
    });
};
export const exportInvestmentData = (data) => {
    const yearlyBreakdown = data.yearlyBreakdown.map((item) => ({
        year: item.year,
        balance: item.balance.toFixed(2),
        contributions: item.contributions.toFixed(2),
        earnings: item.earnings.toFixed(2),
    }));
    exportToCSV({
        filename: 'investment-projection.csv',
        data: yearlyBreakdown,
        fields: ['year', 'balance', 'contributions', 'earnings'],
    });
};
export const exportRetirementData = (data) => {
    const projectedBreakdown = data.projectedBreakdown.map((item) => ({
        age: item.age,
        savings: item.savings.toFixed(2),
        contributions: item.contributions.toFixed(2),
        earnings: item.earnings.toFixed(2),
    }));
    exportToCSV({
        filename: 'retirement-projection.csv',
        data: projectedBreakdown,
        fields: ['age', 'savings', 'contributions', 'earnings'],
    });
};
