'use client';
import React, { useState } from 'react';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
export default function QuotePage() {
    const [step, setStep] = useState(1);
    const [insuranceType, setInsuranceType] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        tobacco: '',
        healthConditions: '',
        coverageAmount: '',
        currentCoverage: '',
        additionalNotes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim())
            newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim())
            newErrors.lastName = 'Last name is required';
        if (!formData.email.trim())
            newErrors.email = 'Email is required';
        if (!formData.phone.trim())
            newErrors.phone = 'Phone is required';
        if (!formData.zipCode.trim())
            newErrors.zipCode = 'ZIP code is required';
        if (step >= 3) {
            if (!formData.dateOfBirth)
                newErrors.dateOfBirth = 'Date of birth is required';
            if (!formData.gender)
                newErrors.gender = 'Gender is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        if (step < 4) {
            setStep(prev => prev + 1);
            return;
        }
        // Final submission
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    insuranceType,
                    timestamp: new Date().toISOString()
                }),
            });
            if (response.ok) {
                setStep(5); // Success step
            }
            else {
                throw new Error('Failed to submit quote request');
            }
        }
        catch (error) {
            console.error('Error submitting quote:', error);
            alert('There was an error submitting your quote request. Please try again.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const insuranceOptions = [
        {
            type: 'life',
            title: 'Life Insurance',
            description: 'Protect your family\'s financial future',
            icon: '🛡️'
        },
        {
            type: 'health',
            title: 'Health Insurance',
            description: 'Comprehensive health coverage for you and your family',
            icon: '🏥'
        },
        {
            type: 'medicare',
            title: 'Medicare',
            description: 'Medicare plans for seniors 65+ and disabled individuals',
            icon: '👥'
        },
        {
            type: 'dental',
            title: 'Dental Insurance',
            description: 'Coverage for dental procedures and routine care',
            icon: '🦷'
        },
        {
            type: 'vision',
            title: 'Vision Insurance',
            description: 'Coverage for eye exams and vision care',
            icon: '👁️'
        }
    ];
    const stepTitles = [
        'Choose Coverage Type',
        'Basic Information',
        'Personal Details',
        'Coverage Preferences',
        'Thank You!'
    ];
    return (<div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Get Your Free Insurance Quote</h1>
            <p className="text-xl text-gray-600">Get personalized coverage recommendations in minutes</p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              {stepTitles.map((title, index) => (<div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step > index + 1 ? 'bg-green-500 text-white' :
                step === index + 1 ? 'bg-primary text-white' :
                    'bg-gray-200 text-gray-600'}`}>
                    {step > index + 1 ? <CheckCircle size={16}/> : index + 1}
                  </div>
                  {index < stepTitles.length - 1 && (<div className={`w-full h-1 mx-2 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`}/>)}
                </div>))}
            </div>
            <p className="text-center text-gray-600">{stepTitles[step - 1]}</p>
          </div>

          {/* Step 1: Insurance Type Selection */}
          {step === 1 && (<div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-center mb-8">What type of insurance are you looking for?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insuranceOptions.map((option) => (<button key={option.type} onClick={() => {
                    setInsuranceType(option.type);
                    setStep(2);
                }} className="group p-6 text-left border-2 rounded-lg border-gray-200 hover:border-primary hover:shadow-lg transition-all transform hover:-translate-y-1">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{option.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">{option.title}</h3>
                    <p className="text-gray-600">{option.description}</p>
                  </button>))}
              </div>
            </div>)}

          {/* Step 2: Basic Information */}
          {step === 2 && (<div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your first name"/>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your last name"/>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="your.email@example.com"/>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="(555) 123-4567"/>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">ZIP Code *</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`} placeholder="12345" pattern="[0-9]{5}"/>
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button type="button" onClick={() => setStep(1)} className="flex items-center text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft size={20} className="mr-2"/>
                    Back
                  </button>
                  <button type="submit" className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                    Continue
                    <ArrowRight size={20} className="ml-2"/>
                  </button>
                </div>
              </form>
            </div>)}

          {/* Step 3: Personal Details */}
          {step === 3 && (<div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Date of Birth *</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}/>
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Marital Status</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Do you use tobacco?</label>
                    <select name="tobacco" value={formData.tobacco} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select option</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                      <option value="former">Former user</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium mb-2">Do you have any health conditions we should know about?</label>
                  <textarea name="healthConditions" value={formData.healthConditions} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Optional: List any significant health conditions or medications"/>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button type="button" onClick={() => setStep(2)} className="flex items-center text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft size={20} className="mr-2"/>
                    Back
                  </button>
                  <button type="submit" className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                    Continue
                    <ArrowRight size={20} className="ml-2"/>
                  </button>
                </div>
              </form>
            </div>)}

          {/* Step 4: Coverage Preferences */}
          {step === 4 && (<div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Coverage Preferences</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Desired Coverage Amount</label>
                    <select name="coverageAmount" value={formData.coverageAmount} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select amount</option>
                      <option value="25000">$25,000</option>
                      <option value="50000">$50,000</option>
                      <option value="100000">$100,000</option>
                      <option value="250000">$250,000</option>
                      <option value="500000">$500,000</option>
                      <option value="1000000">$1,000,000</option>
                      <option value="custom">Other amount</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Do you currently have coverage?</label>
                    <select name="currentCoverage" value={formData.currentCoverage} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select option</option>
                      <option value="none">No current coverage</option>
                      <option value="employer">Employer coverage</option>
                      <option value="individual">Individual policy</option>
                      <option value="government">Government program</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium mb-2">Additional Notes or Questions</label>
                  <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Any specific questions or requirements you'd like us to address?"/>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button type="button" onClick={() => setStep(3)} className="flex items-center text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft size={20} className="mr-2"/>
                    Back
                  </button>
                  <button type="submit" disabled={isSubmitting} className="flex items-center bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Get My Quote'}
                    {!isSubmitting && <ArrowRight size={20} className="ml-2"/>}
                  </button>
                </div>
              </form>
            </div>)}

          {/* Step 5: Thank You */}
          {step === 5 && (<div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-primary mb-4">Thank You!</h2>
              <p className="text-xl text-gray-600 mb-6">
                We've received your quote request for <strong>{insuranceOptions.find(opt => opt.type === insuranceType)?.title}</strong>
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>✓ A confirmation email has been sent to <strong>{formData.email}</strong></li>
                  <li>✓ Our licensed agent will review your information within 24 hours</li>
                  <li>✓ You'll receive personalized quote options via email and phone</li>
                  <li>✓ We'll answer any questions and help you choose the best coverage</li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Questions? Call us at <strong>(555) 123-4567</strong>
                </p>
                <button onClick={() => {
                setStep(1);
                setInsuranceType('');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    zipCode: '',
                    dateOfBirth: '',
                    gender: '',
                    maritalStatus: '',
                    tobacco: '',
                    healthConditions: '',
                    coverageAmount: '',
                    currentCoverage: '',
                    additionalNotes: ''
                });
            }} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                  Get Another Quote
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>);
}
