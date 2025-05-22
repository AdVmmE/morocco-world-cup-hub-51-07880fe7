
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CardShowcase from '@/components/cards/CardShowcase';

const CardDemo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-morocco-red to-morocco-green py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Morocco World Cup 2030</h1>
          <p className="text-lg">
            Card Components Showcase for the FIFA World Cup 2030
          </p>
        </div>
      </div>
      
      <div className="flex-grow">
        <CardShowcase />
      </div>
      
      <Footer />
    </div>
  );
};

export default CardDemo;
