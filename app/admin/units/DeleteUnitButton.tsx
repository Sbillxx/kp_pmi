'use client';

import { deleteUnit } from './actions';

export default function DeleteUnitButton({ id }: { id: number }) {
  const handleDelete = async () => {
    if (confirm('Yakin ingin menghapus unit ini?')) {
      const formData = new FormData();
      formData.append('id', id.toString());
      await deleteUnit(formData);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      style={{ 
        background: '#ffe6e6', 
        color: '#cc0000', 
        padding: '8px 15px', 
        borderRadius: '4px', 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: '14px' 
      }}
    >
      Hapus
    </button>
  );
}
