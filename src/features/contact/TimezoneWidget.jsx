'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const TimezoneWidget = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 bg-bg-secondary border border-border-primary p-6 flex flex-col gap-4 max-w-sm">
      <div className="flex items-center gap-3 text-text-secondary">
        <MapPin size={18} className="text-[#0070f3]" />
        <span className="text-sm font-mono tracking-widest uppercase">
          Location & Time
        </span>
      </div>
      <div>
        <p className="text-xl font-semibold text-text-primary">
          Kathmandu, Nepal
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Clock size={16} className="text-text-secondary" />
          <span className="text-text-secondary font-mono text-lg">
            {time || '--:--:--'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimezoneWidget;
