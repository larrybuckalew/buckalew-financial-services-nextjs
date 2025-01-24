import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/insurance/life-insurance">Life Insurance</Link></li>
        <li><Link href="/insurance/medicare">Medicare</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
