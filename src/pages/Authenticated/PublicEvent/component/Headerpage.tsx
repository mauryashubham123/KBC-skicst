
import { EventType } from '@/types/typedef';
import {Trophy, } from 'lucide-react';

// Event Header Component
export const EventHeader = ({ event }: { event?: EventType }) => {
  return (
    <div className="bg-gradient-to-r from-amber-900 to-yellow-800 p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Trophy className="text-yellow-300" size={32} />
            {event?.name || "Loading Event..."}
          </h1>
          <p className="text-amber-100">{event?.description}</p>
        </div>
        <div className="text-right">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            event?.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {event?.is_active ? 'LIVE' : 'OFFLINE'}
          </div>
        </div>
      </div>
    </div>
  );
};