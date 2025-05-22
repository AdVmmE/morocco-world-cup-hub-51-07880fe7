
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const StadiumsFAQ = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">When will all stadiums be completed?</h3>
            <p className="text-gray-600">
              All stadiums in Morocco are scheduled to be completed by the end of 2028, 
              allowing for a full year of testing and preparation before the tournament begins in 2030.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">How will fans travel between stadiums?</h3>
            <p className="text-gray-600">
              Morocco is expanding its high-speed rail network to connect all host cities, 
              and will provide additional shuttle services and public transportation options during the tournament.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">Which stadium will host the final match?</h3>
            <p className="text-gray-600">
              The Grand Stade de Casablanca, with a capacity of 93,000 spectators, 
              will host the opening ceremony, one semi-final, and the final match of the 2030 FIFA World Cup.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">How sustainable are these stadiums?</h3>
            <p className="text-gray-600">
              All new and renovated stadiums in Morocco are being built with sustainability in mind, 
              featuring renewable energy sources, water conservation systems, and eco-friendly materials.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StadiumsFAQ;
