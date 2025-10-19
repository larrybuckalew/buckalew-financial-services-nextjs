import React from 'react';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Mobile Test | Buckalew Financial Services',
    description: 'Testing mobile responsiveness across all components and layouts.',
};
export default function MobileTestPage() {
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Mobile Optimization Test',
            subtitle: 'Testing responsive design across all screen sizes'
        }}>
      <div className="space-y-12">
        {/* Grid Test */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Responsive Grid Test</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (<div key={num} className="bg-blue-100 p-4 rounded-lg text-center">
                <h3 className="font-semibold">Card {num}</h3>
                <p className="text-sm text-gray-600">Mobile responsive test card</p>
              </div>))}
          </div>
        </section>

        {/* Typography Test */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Typography Responsiveness</h2>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Large Heading</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Medium Heading</h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium">Small Heading</h3>
            <p className="text-base sm:text-lg lg:text-xl">
              This paragraph should scale appropriately on different screen sizes. 
              The text should remain readable and comfortable on mobile, tablet, and desktop.
            </p>
          </div>
        </section>

        {/* Button Test */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Button Responsiveness</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Primary Button
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Secondary Button
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Success Button
              </button>
            </div>
            
            <div>
              <button className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Full Width on Mobile
              </button>
            </div>
          </div>
        </section>

        {/* Form Test */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Form Responsiveness</h2>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter first name"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter last name"/>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email"/>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Enter your message"/>
              </div>
              
              <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Submit Form
              </button>
            </form>
          </div>
        </section>

        {/* Navigation Test */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Navigation Responsiveness</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-4">Test the main navigation above:</p>
            <ul className="space-y-2 text-sm">
              <li>✅ Mobile hamburger menu should appear on small screens</li>
              <li>✅ Desktop navigation should show on larger screens</li>
              <li>✅ Dropdowns should work on both mobile and desktop</li>
              <li>✅ Touch targets should be large enough for mobile</li>
            </ul>
          </div>
        </section>

        {/* Footer Test */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Footer Responsiveness</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-4">Check the footer below:</p>
            <ul className="space-y-2 text-sm">
              <li>✅ Footer should stack columns on mobile</li>
              <li>✅ Footer should show grid layout on desktop</li>
              <li>✅ Contact information should be easily readable</li>
              <li>✅ Links should be touch-friendly</li>
            </ul>
          </div>
        </section>

        {/* Breakpoint Indicators */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Current Breakpoint</h2>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <div className="block sm:hidden">
              <div className="bg-red-500 text-white p-2 rounded text-center font-bold">
                📱 Mobile (&lt; 640px)
              </div>
            </div>
            <div className="hidden sm:block md:hidden">
              <div className="bg-orange-500 text-white p-2 rounded text-center font-bold">
                📱 Small Tablet (640px - 768px)
              </div>
            </div>
            <div className="hidden md:block lg:hidden">
              <div className="bg-blue-500 text-white p-2 rounded text-center font-bold">
                💻 Tablet (768px - 1024px)
              </div>
            </div>
            <div className="hidden lg:block xl:hidden">
              <div className="bg-green-500 text-white p-2 rounded text-center font-bold">
                💻 Desktop (1024px - 1280px)
              </div>
            </div>
            <div className="hidden xl:block">
              <div className="bg-purple-500 text-white p-2 rounded text-center font-bold">
                🖥️ Large Desktop (&gt; 1280px)
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageStructure>);
}
