    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Verify inflation-adjusted values
    await waitFor(() => {
      expect(screen.getByText(/inflation-adjusted balance/i)).toBeInTheDocument();
      expect(screen.getByText(/nominal balance/i)).toBeInTheDocument();
    });

    // Verify both nominal and inflation-adjusted values are shown
    const values = screen.getAllByText(/\$[\d,]+/);
    expect(values.length).toBeGreaterThanOrEqual(2);
  });

  it('validates input fields correctly', async () => {
    render(<RetirementCalculator />);

    // Test invalid age combinations
    await userEvent.type(screen.getByLabelText(/current age/i), '65');
    await userEvent.type(screen.getByLabelText(/retirement age/i), '60');
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/retirement age must be greater than current age/i)).toBeInTheDocument();
    });

    // Test invalid negative values
    await userEvent.clear(screen.getByLabelText(/current savings/i));
    await userEvent.type(screen.getByLabelText(/current savings/i), '-1000');
    
    await waitFor(() => {
      expect(screen.getByText(/value cannot be negative/i)).toBeInTheDocument();
    });

    // Test invalid rate inputs
    await userEvent.clear(screen.getByLabelText(/expected return/i));
    await userEvent.type(screen.getByLabelText(/expected return/i), '101');
    
    await waitFor(() => {
      expect(screen.getByText(/rate must be between 0 and 100/i)).toBeInTheDocument();
    });
  });

  it('performs Monte Carlo simulation correctly', async () => {
    render(<RetirementCalculator />);

    // Fill basic form
    await userEvent.type(screen.getByLabelText(/current age/i), '30');
    await userEvent.type(screen.getByLabelText(/retirement age/i), '65');
    await userEvent.type(screen.getByLabelText(/current savings/i), '50000');

    // Enable Monte Carlo simulation
    fireEvent.click(screen.getByRole('button', { name: /enable monte carlo/i }));

    // Set simulation parameters
    await userEvent.type(screen.getByLabelText(/number of simulations/i), '1000');
    await userEvent.type(screen.getByLabelText(/market volatility/i), '15');

    // Run simulation
    fireEvent.click(screen.getByRole('button', { name: /run simulation/i }));

    // Verify simulation results
    await waitFor(() => {
      expect(screen.getByText(/monte carlo simulation results/i)).toBeInTheDocument();
      expect(screen.getByText(/success rate/i)).toBeInTheDocument();
      expect(screen.getByText(/median outcome/i)).toBeInTheDocument();
      expect(screen.getByText(/95th percentile/i)).toBeInTheDocument();
      expect(screen.getByText(/5th percentile/i)).toBeInTheDocument();
    });
  });

  it('saves and loads user profiles correctly', async () => {
    render(<RetirementCalculator />);

    // Fill out profile information
    await userEvent.type(screen.getByLabelText(/profile name/i), 'Test Profile');
    await userEvent.type(screen.getByLabelText(/current age/i), '30');
    await userEvent.type(screen.getByLabelText(/current savings/i), '50000');

    // Save profile
    fireEvent.click(screen.getByRole('button', { name: /save profile/i }));

    // Clear form
    fireEvent.click(screen.getByRole('button', { name: /clear form/i }));

    // Load saved profile
    fireEvent.click(screen.getByRole('button', { name: /load profile/i }));
    await userEvent.click(screen.getByText('Test Profile'));

    // Verify loaded values
    await waitFor(() => {
      expect(screen.getByLabelText(/current age/i)).toHaveValue(30);
      expect(screen.getByLabelText(/current savings/i)).toHaveValue(50000);
    });
  });

  it('handles market crash scenarios correctly', async () => {
    render(<RetirementCalculator />);

    // Fill basic information
    await userEvent.type(screen.getByLabelText(/current age/i), '30');
    await userEvent.type(screen.getByLabelText(/current savings/i), '50000');

    // Enable market crash scenario
    fireEvent.click(screen.getByRole('button', { name: /add market crash scenario/i }));

    // Configure crash scenario
    await userEvent.type(screen.getByLabelText(/crash year/i), '2030');
    await userEvent.type(screen.getByLabelText(/market decline/i), '40');
    await userEvent.type(screen.getByLabelText(/recovery years/i), '5');

    // Calculate with crash scenario
    fireEvent.click(screen.getByRole('button', { name: /calculate with crash/i }));

    // Verify crash scenario results
    await waitFor(() => {
      expect(screen.getByText(/market crash impact/i)).toBeInTheDocument();
      expect(screen.getByText(/recovery trajectory/i)).toBeInTheDocument();
    });
  });
});