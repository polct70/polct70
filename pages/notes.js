import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';

export default function NotesPage() {
  const [items, setItems] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const { data } = await supabase.from('items').select('*').eq('type', 'note').order('created_at', { ascending: false });
    setItems(data || []);
  }

  async function addItem() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('请先登录以保存内容');
    await supabase.from('items').insert([{ owner: user.id, type: 'note', title: null, content }]);
    setContent('');
    fetchItems();
  }

  async function deleteItem(id) {
    await supabase.from('items').delete().eq('id', id);
    fetchItems();
  }

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto py-8 px-6">
        <h2 className="text-2xl mb-4">随写</h2>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} className="w-full border p-2 mb-2"></textarea>
        <div className="flex gap-2 mb-6">
          <button onClick={addItem} className="px-3 py-1 bg-blue-600 text-white rounded">保存</button>
        </div>
        <ul className="space-y-4">
          {items.map(it => (
            <li key={it.id} className="p-4 border rounded">
              <div className="text-sm text-gray-500">{new Date(it.created_at).toLocaleString()}</div>
              <div className="mt-2">{it.content}</div>
              <div className="mt-2 text-right">
                <button onClick={() => deleteItem(it.id)} className="text-sm text-red-600">删除</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
