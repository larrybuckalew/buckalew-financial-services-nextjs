'use client';
import { useState } from 'react';
export default function MedicationSearchForm() {
    const [medication, setMedication] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!medication)
            return;
        setLoading(true);
        try {
            const mockResults = [
                {
                    name: medication,
                    genericName: 'Generic ' + medication,
                    averagePrice: '$' + (Math.random() * 100).toFixed(2),
                    pharmacies: ['CVS', 'Walgreens', 'Rite Aid']
                }
            ];
            setResults(mockResults);
        }
        catch (error) {
            console.error('Search error:', error);
        }
        finally {
            setLoading(false);
        }
    };
    // Rest of the component remains the same
}
