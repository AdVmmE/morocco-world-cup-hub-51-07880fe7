
import React from 'react';
import { Stadium } from '@/api/types/stadiums';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

interface StadiumsProgressProps {
  stadiums: Stadium[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
}

const StadiumsProgress: React.FC<StadiumsProgressProps> = ({ 
  stadiums, 
  isLoading, 
  error, 
  onRetry 
}) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Stadium Development Progress</h2>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorDisplay onRetry={onRetry} />
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {stadiums?.map((stadium) => (
              <div key={stadium.id} className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-1/4">
                  <h3 className="font-medium">{stadium.name}</h3>
                  <p className="text-sm text-gray-500">{stadium.city}</p>
                </div>
                <div className="md:w-1/2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        stadium.progress === 100 ? 'bg-green-500' : 
                        stadium.progress > 50 ? 'bg-yellow-500' : 
                        'bg-blue-500'
                      }`} 
                      style={{ width: `${stadium.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="md:w-1/4 flex justify-between">
                  <span className="text-sm font-medium">{stadium.progress}% Complete</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stadium.status === 'Operational' ? 'bg-green-100 text-green-800' : 
                    stadium.status === 'Under Construction' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {stadium.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StadiumsProgress;
