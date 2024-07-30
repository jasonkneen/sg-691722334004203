import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DeviceWrapper = ({ children }) => {
  const [device, setDevice] = useState('mobile');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  const deviceSizes = {
    mobile: 'w-full h-full sm:w-[375px] sm:h-[667px]',
    tablet: 'w-full h-full sm:w-[768px] sm:h-[1024px]',
    desktop: 'w-full h-full',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={device === 'mobile' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setDevice('mobile')}
        >
          <Smartphone className="h-4 w-4" />
        </Button>
        <Button
          variant={device === 'tablet' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setDevice('tablet')}
        >
          <Tablet className="h-4 w-4" />
        </Button>
        <Button
          variant={device === 'desktop' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setDevice('desktop')}
        >
          <Monitor className="h-4 w-4" />
        </Button>
      </div>
      <div
        className={cn(
          'border-gray-300 dark:border-gray-700 overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800',
          deviceSizes[device]
        )}
      >
        <div className="w-full h-full overflow-auto bg-background">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceWrapper;