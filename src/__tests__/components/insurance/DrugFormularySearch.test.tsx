import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DrugFormularySearch from '@/components/insurance/DrugFormularySearch';
import { kv_get, kv_put } from '@/lib/cloudflare';

// Mock the KV functions
jest.mock('@/lib/cloudflare', () => ({
  kv_get: jest.fn(),
  kv_put: jest.fn()
}));

describe('DrugFormularySearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockDrugData = [
    {
      name: 'Metformin',
      tier: 1,
      category: 'Diabetes',
      priorAuth: false,
      quantity: '60 tablets/30 days',
      alternatives: []
    }
  ];

  it('renders the drug search form', () => {
    render(<DrugFormularySearch />);
    expect(screen.getByText('Drug Formulary Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter drug name')).toBeInTheDocument();
    expect(screen.getByText('All Plans')).toBeInTheDocument();
  });

  it('searches for drugs when input length >= 3', async () => {
    (kv_get as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockDrugData));

    render(<DrugFormularySearch />);

    fireEvent.change(screen.getByPlaceholderText('Enter drug name'), {
      target: { value: 'met' }
    });

    await waitFor(() => {
      expect(screen.getByText('Metformin')).toBeInTheDocument();
      expect(screen.getByText('Tier 1')).toBeInTheDocument();
      expect(screen.getByText('60 tablets/30 days')).toBeInTheDocument();
    });
  });

  it('filters drugs by plan type', async () => {
    (kv_get as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockDrugData));

    render(<DrugFormularySearch />);

    fireEvent.change(screen.getByPlaceholderText('Enter drug name'), {
      target: { value: 'met' }
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'hmo' }
    });

    await waitFor(() => {
      expect(kv_get).toHaveBeenCalledWith(expect.objectContaining({
        key: 'drug_formulary_hmo'
      }));
    });
  });

  it('handles KV store errors gracefully', async () => {
    (kv_get as jest.Mock).mockRejectedValueOnce(new Error('KV store error'));

    render(<DrugFormularySearch />);

    fireEvent.change(screen.getByPlaceholderText('Enter drug name'), {
      target: { value: 'met' }
    });

    await waitFor(() => {
      expect(screen.queryByText('Metformin')).not.toBeInTheDocument();
    });
  });

  it('shows no results message when no drugs found', async () => {
    (kv_get as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));

    render(<DrugFormularySearch />);

    fireEvent.change(screen.getByPlaceholderText('Enter drug name'), {
      target: { value: 'xyz' }
    });

    await waitFor(() => {
      expect(screen.getByText('No drugs found matching your search criteria.')).toBeInTheDocument();
    });
  });
});