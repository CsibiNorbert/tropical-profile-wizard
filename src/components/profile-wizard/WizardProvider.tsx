
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';

export interface UserProfile {
  name: string;
  age: number | null;
  gender: Gender | null;
  bio: string;
  photo: File | null;
  photoURL: string;
  preferences: {
    travelStyle: number; // 0-100 (Relaxation to Adventure)
    budget: number; // 0-100 (Budget to Luxury)
    pace: number; // 0-100 (Slow to Fast-paced)
  };
  languages: string[];
  experience: number; // 0-4 (Novice to Expert)
}

interface WizardContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isComplete: boolean;
  setComplete: (value: boolean) => void;
}

const defaultProfile: UserProfile = {
  name: '',
  age: null,
  gender: null,
  bio: '',
  photo: null,
  photoURL: '',
  preferences: {
    travelStyle: 50,
    budget: 50,
    pace: 50,
  },
  languages: [],
  experience: 1,
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isComplete, setIsComplete] = useState(false);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <WizardContext.Provider value={{ 
      profile, 
      updateProfile, 
      isComplete, 
      setComplete: setIsComplete 
    }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
