'use client';

import { useState, useEffect } from 'react';

export default function TagInput({ name, initialTags = [], placeholder = "Tambah tool..." }) {
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag) => {
    const trimmed = tag.trim().replace(/,$/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputValue('');
    } else {
        setInputValue('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-ruang-green transition min-h-[58px] items-center">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-ruang-blue text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 group animate-in fade-in zoom-in duration-200"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(index)}
              className="hover:text-red-300 transition text-[10px]"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent outline-none text-sm min-w-[120px] py-1"
        />
      </div>
      {/* Hidden input to pass to FormData */}
      <input type="hidden" name={name} value={tags.join(',')} />
      <p className="text-[10px] text-slate-400 mt-2 font-medium">Tekan <strong>Tab</strong>, <strong>Enter</strong>, atau <strong>Koma</strong> untuk menambah.</p>
    </div>
  );
}
