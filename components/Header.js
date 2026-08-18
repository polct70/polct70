import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProfileModal from './ProfileModal';

export default function Header() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s2) => {
      setSession(s2);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadProfile() {
      const user = session?.user;
      if (!user) { setProfile(null); return; }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data || null);
    }
    loadProfile();
  }, [session]);

  const signIn = async () => {
    const email = prompt('输入邮箱用于登录（会发送魔法链接）');
    if (!email) return;
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.href } });
    alert('已发送登录魔法链接到邮箱，请查收并通过链接登录。');
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const avatarUrl = profile?.avatar_url || 'https://www.gravatar.com/avatar?d=mp';

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 shadow-sm">
      <div className="text-xl font-medium">我的个人网站</div>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex gap-4">
          <a href="/notes" className="hover:underline">随写</a>
          <a href="/work" className="hover:underline">工作</a>
          <a href="/interests" className="hover:underline">兴趣</a>
        </nav>
        {session?.user ? (
          <>
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <button onClick={signOut} className="ml-2 text-sm">登出</button>
          </>
        ) : (
          <button onClick={signIn} className="px-3 py-1 border rounded">登录 / 注册</button>
        )}
      </div>
      {open && <ProfileModal profile={profile} onClose={() => setOpen(false)} />}
    </header>
  );
}
