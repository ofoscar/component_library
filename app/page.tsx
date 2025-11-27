import Link from 'next/link';
import ProductCard from './components/ProductCard';

export default function Home() {
  return (
    <main>
      <div className='p-4 flex flex-col items-center'>
        <h1>Hello World</h1>
        <Link href='/users'>Users</Link>
        <ProductCard />
      </div>
    </main>
  );
}
