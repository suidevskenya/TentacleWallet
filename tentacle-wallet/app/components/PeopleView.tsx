import React from 'react';
import { Users } from 'lucide-react';

const PeopleView: React.FC = () => {
  return (
    <div className="mx-4 mb-6">
      <div className="bg-gray-800 rounded-xl p-6 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-200 mb-2">People</h3>
        <p className="text-gray-400">Connect with friends and family to send and receive payments</p>
      </div>
    </div>
  );
};

export default PeopleView;
