import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NFTViewer from '../components/NFTViewer';

interface LocationState {
  eventName: string;
}

const NFTPage: React.FC = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const location = useLocation();
  const { eventName } = location.state as LocationState;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900">Visualizar NFT</h1>
          <p className="text-gray-500">Visualize seu ingresso NFT em 3D</p>
        </div>

        <div className="bg-gray-100/50 backdrop-blur-sm rounded-3xl p-8 shadow-sm">
          <NFTViewer tokenId={tokenId || ''} eventName={eventName} />
        </div>
      </div>
    </div>
  );
};

export default NFTPage; 