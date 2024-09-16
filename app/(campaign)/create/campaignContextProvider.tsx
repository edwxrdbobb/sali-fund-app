import React, { createContext, useState, useContext } from 'react';

interface CampaignContextType {
  campaignData: any;
  setCampaignData: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignContext = createContext<CampaignContextType | null>(null);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaignData, setCampaignData] = useState({});

  return (
    <CampaignContext.Provider value={{ campaignData, setCampaignData }}>
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (context === null) {
    throw new Error('useCampaignContext must be used within a CampaignProvider');
  }
  return context;
};