import { CampaignProvider } from './campaignContextProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CampaignProvider>
      {children}
    </CampaignProvider>
  );
}