'use server';

import fs from 'fs';
import path from 'path';

export async function submitContactForm(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const project = formData.get('project');
    const message = formData.get('message');

    // Create message object
    const newMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      project,
      message,
    };

    // Define the path to the messages.json file
    const filePath = path.join(process.cwd(), 'data', 'messages.json');

    // Read the existing messages file
    let messages = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      try {
        messages = JSON.parse(fileData);
      } catch (parseError) {
        // If file is empty or corrupted, start fresh
        messages = [];
      }
    }

    // Push the new message and save
    messages.push(newMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');

    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return { 
      success: true, 
      message: 'Pesan berhasil dikirim dan disimpan secara lokal.' 
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { 
      success: false, 
      message: 'Gagal mengirim pesan. Coba lagi.' 
    };
  }
}
