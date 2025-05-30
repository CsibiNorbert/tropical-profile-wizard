
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white rounded-lg shadow-lg border p-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <Download className="h-5 w-5 text-tropical-turquoise mr-2" />
          <h3 className="font-semibold text-gray-800">Install SoloTravel</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="p-1 h-auto"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Install our app for a better experience and offline access.
      </p>
      <div className="flex gap-2">
        <Button
          onClick={handleInstall}
          className="flex-1 bg-tropical-turquoise hover:bg-tropical-turquoise/90"
          size="sm"
        >
          Install
        </Button>
        <Button
          variant="outline"
          onClick={handleDismiss}
          size="sm"
        >
          Later
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
