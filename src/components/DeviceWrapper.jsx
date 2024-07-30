import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DeviceWrapper = ({ children }) => {
  const [device, setDevice] = useState('mobile');

  const deviceSizes = {
    mobile: 'w-[375px] h-[667px]',
    tablet: 'w-[768px] h-[1024px]',
    tabletLandscape: 'w-[1024px] h-[768px]',
    desktop: 'w-[1440px] h-[900px]',
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
          'border-4 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300',
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