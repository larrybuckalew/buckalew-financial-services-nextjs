import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for development
const mockPharmacies = [
  { name: 'CVS Pharmacy', basePrice: 50, address: '123 Main St' },
  { name: 'Walgreens', basePrice: 45, address: '456 Oak Ave' },
  { name: 'Walmart Pharmacy', basePrice: 40, address: '789 Market St' },
  { name: 'Rite Aid', basePrice: 48, address: '321 Pine Rd' },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { drugName, dosage, zipCode } = req.body;

    if (!drugName || !dosage || !zipCode) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // For development, using mock data
    const results = mockPharmacies.map((pharmacy) => {
      const basePrice = pharmacy.basePrice;
      const randomVariation = Math.random() * 10 - 5;
      const price = basePrice + randomVariation;
      const distance = (Math.random() * 5).toFixed(1);
      
      return {
        pharmacy: pharmacy.name,
        price: price,
        distance: distance,
        address: pharmacy.address,
        savings: basePrice * 0.2, // Mock savings calculation
      };
    });

    // Sort by price
    results.sort((a, b) => a.price - b.price);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error processing drug price request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}