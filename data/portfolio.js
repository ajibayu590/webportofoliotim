import fs from 'fs';
import path from 'path';
import { categories } from './portfolio-constants';

const filePath = path.join(process.cwd(), 'data', 'portfolio.json');

export { categories };

// Shared function to read from JSON (Server-side ONLY)
export function getPortfolioData() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export const portfolioItems = []; 
