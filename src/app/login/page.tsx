import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export const metadata = {
  title: 'Sign in to SecQA',
  description: 'Sign in to your SecQA dashboard.'
};

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      <div className='w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Welcome back</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Sign in to your SecQA dashboard</p>
        </div>
        <SignIn />
        <p className='text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='text-primary hover:underline'>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
