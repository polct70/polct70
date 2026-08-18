import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">你好，我是 [你的名字]</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/notes" className="p-6 border rounded hover:shadow">随写</a>
          <a href="/work" className="p-6 border rounded hover:shadow">工作</a>
          <a href="/interests" className="p-6 border rounded hover:shadow">兴趣</a>
        </div>
      </main>
    </div>
  );
}
