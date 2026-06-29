import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <Shield className='mx-auto h-12 w-12 text-primary' />
        <h1 className='mt-6 text-6xl font-bold text-primary'>404</h1>
        <h2 className='mt-2 text-2xl font-bold'>Page not found</h2>
        <p className='mt-4 text-muted-foreground'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className='mt-8 flex flex-col gap-3 sm:flex-row justify-center'>
          <Button asChild>
            <Link href='/'>
              <Home className='mr-2 h-4 w-4' />
              Back to home
            </Link>
          </Button>
          <Button asChild variant='outline'>
            <Link href='/pricing'>
              <Search className='mr-2 h-4 w-4' />
              View pricing
            </Link>
          </Button>
        </div>
        <div className='mt-12 text-sm text-muted-foreground'>
          <p>Looking for something specific?</p>
          <div className='mt-3 flex flex-wrap justify-center gap-2'>
            <Link href='/demo' className='text-primary hover:underline'>Demo</Link>
            <span className='text-muted-foreground'>·</span>
            <Link href='/integrations' className='text-primary hover:underline'>Integrations</Link>
            <span className='text-muted-foreground'>·</span>
            <Link href='/trust-center' className='text-primary hover:underline'>Trust Center</Link>
            <span className='text-muted-foreground'>·</span>
            <Link href='/contact' className='text-primary hover:underline'>Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
