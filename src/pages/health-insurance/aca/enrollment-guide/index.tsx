import React from 'react';

const ACAEnrollmentGuidePage: React.FC = () => {
  const enrollmentSteps = [
    {
      title: 'Check Eligibility',
      description: 'Determine if you qualify for ACA health insurance plans based on income and other factors.'
    },
    {
      title: 'Gather Documents',
      description: 'Collect necessary documentation such as proof of income, residency, and identification.'
    },
    {
      title: 'Compare Plans',
      description: 'Review available plans, comparing premiums, deductibles, and coverage options.'
    },
    {
      title: 'Apply Online',
      description: 'Complete the application through Healthcare.gov or your state marketplace.'
    },
    {
      title: 'Select Plan',
      description: 'Choose the plan that best fits your healthcare needs and budget.'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ACA Health Insurance Enrollment Guide</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Enrollment Steps</h2>
          <ul className="space-y-4">
            {enrollmentSteps.map((step, index) => (
              <li key={index} className="border-b pb-4">
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Important Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Open Enrollment Period</h3>
              <p>Typically runs from November 1st to December 15th annually</p>
            </div>
            <div>
              <h3 className="font-bold">Special Enrollment Period</h3>
              <p>Available after major life events like marriage, job loss, or birth of a child</p>
            </div>
            <div>
              <h3 className="font-bold">Financial Assistance</h3>
              <p>Premium tax credits and cost-sharing reductions may be available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACAEnrollmentGuidePage;