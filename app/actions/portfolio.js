'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const filePath = path.join(process.cwd(), 'data', 'portfolio.json');

function getNextId(items) {
  if (items.length === 0) return 1;
  const ids = items.map(item => item.id || 0);
  return Math.max(...ids) + 1;
}

export async function getPortfolioItems() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export async function addPortfolioItem(formData) {
  // Simple password check (could be improved)
  const password = formData.get('adminPassword');
  if (password !== 'ruangrupa2026') {
    return { success: false, message: 'Password salah!' };
  }

  const items = await getPortfolioItems();
  
  const newItem = {
    id: getNextId(items),
    title: formData.get('title'),
    category: formData.get('category'),
    year: formData.get('year') || new Date().getFullYear().toString(),
    desc: formData.get('desc'),
    img: formData.get('img') || '/logo.png',
    client: formData.get('client') || 'Personal',
    slug: formData.get('title').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    authorIds: formData.getAll('authorIds'),
    externalLink: formData.get('externalLink') || '',
    tools: formData.get('tools') ? formData.get('tools').split(',').map(s => s.trim()) : [],
    isEmbed: formData.get('isEmbed') === 'on',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  items.push(newItem);
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
  
  revalidatePath('/');
  revalidatePath('/portofolio');
  
  return { success: true, message: 'Projek berhasil ditambahkan!' };
}

export async function updatePortfolioItem(formData) {
  const password = formData.get('adminPassword');
  if (password !== 'ruangrupa2026') {
    return { success: false, message: 'Password salah!' };
  }

  const id = Number(formData.get('id'));
  let items = await getPortfolioItems();
  
  const index = items.findIndex(item => Number(item.id) === id);
  if (index === -1) return { success: false, message: 'Projek tidak ditemukan!' };

  items[index] = {
    ...items[index],
    title: formData.get('title'),
    category: formData.get('category'),
    year: formData.get('year'),
    desc: formData.get('desc'),
    img: formData.get('img'),
    client: formData.get('client'),
    authorIds: formData.getAll('authorIds'),
    externalLink: formData.get('externalLink') || '',
    tools: formData.get('tools') ? formData.get('tools').split(',').map(s => s.trim()) : [],
    isEmbed: formData.get('isEmbed') === 'on',
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
  
  revalidatePath('/');
  revalidatePath('/portofolio');
  
  return { success: true, message: 'Projek berhasil diperbarui!' };
}

export async function deletePortfolioItem(id, password) {
  console.log('Admin: Request to delete project ID:', id);
  if (password !== 'ruangrupa2026') {
    return { success: false, message: 'Password salah!' };
  }

  const numericId = Number(id);
  let items = await getPortfolioItems();
  console.log('Admin: Current projects count:', items.length);
  
  // Ensure we are filtering correctly using both types for safety
  const newItems = items.filter(item => Number(item.id) !== numericId);
  
  if (newItems.length === items.length) {
    console.log('Admin: Delete failed - ID not found:', numericId);
    return { success: false, message: 'ID tidak ditemukan atau sudah terhapus!' };
  }

  fs.writeFileSync(filePath, JSON.stringify(newItems, null, 2), 'utf-8');
  console.log('Admin: Successfully deleted ID:', numericId, 'New count:', newItems.length);
  
  revalidatePath('/');
  revalidatePath('/portofolio');
  revalidatePath('/admin/dashboard');
  
  return { success: true, message: 'Projek berhasil dihapus!' };
}
