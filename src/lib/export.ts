import Papa from 'papaparse';

interface ExportOptions {
  filename: string;
  data: any[];
  fields?: string[];
  transformData?: (data: any[]) => any[];
}

export const exportToCSV = ({
  filename,
  data,
  fields,
  transformData,
}: ExportOptions): void => {
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

export const exportMortgageData = (data: any) => {
  const amortizationSchedule = data.amortizationSchedule.map((item: any) => ({
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

export const exportInvestmentData = (data: any) => {
  const yearlyBreakdown = data.yearlyBreakdown.map((item: any) => ({
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

export const exportRetirementData = (data: any) => {
  const projectedBreakdown = data.projectedBreakdown.map((item: any) => ({
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