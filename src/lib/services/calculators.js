export async function saveMortgageCalculation(data) {
    const response = await fetch('/api/calculators/mortgage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save mortgage calculation');
    }
    return response.json();
}
export async function getMortgageCalculations() {
    const response = await fetch('/api/calculators/mortgage');
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch mortgage calculations');
    }
    return response.json();
}
export async function saveInvestmentCalculation(data) {
    const response = await fetch('/api/calculators/investment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save investment calculation');
    }
    return response.json();
}
export async function getInvestmentCalculations() {
    const response = await fetch('/api/calculators/investment');
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch investment calculations');
    }
    return response.json();
}
export async function saveRetirementCalculation(data) {
    const response = await fetch('/api/calculators/retirement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save retirement calculation');
    }
    return response.json();
}
export async function getRetirementCalculations() {
    const response = await fetch('/api/calculators/retirement');
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch retirement calculations');
    }
    return response.json();
}
