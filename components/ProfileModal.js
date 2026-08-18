import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ProfileModal({ profile, onClose }) {
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [bio, setBio] = useState(profile?.bio || '');

  async function save() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('请先登录');
    const payload = {
      id: user.id,
      display_name: displayName,
      bio,
      updated_at: new Date().toISOString()
    };
    await supabase.from('profiles').upsert(payload);
    onClose();
    // reload to update header profile in practice; page reload not forced here
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-semibold mb-3">个人信息</h3>
        <label className="block mb-2">名字
          <input value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full border p-1 mt-1" />
        </label>
        <label className="block mb-3">简介
          <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full border p-1 mt-1" />
        </label>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">取消</button>
          <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">保存</button>
        </div>
      </div>
    </div>
  );
}
