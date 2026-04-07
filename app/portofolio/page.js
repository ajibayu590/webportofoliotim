import { getPortfolioData, categories } from '../../data/portfolio';
import { teamMembers } from '../../data/team';
import PortfolioClient from './PortfolioClient';

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const items = getPortfolioData();
  
  return (
    <PortfolioClient 
      initialItems={items} 
      categories={categories} 
      teamMembers={teamMembers} 
    />
  );
}
