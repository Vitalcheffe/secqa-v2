import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export const metadata = {
  title: 'Sign up for SecQA',
  description: 'Create your SecQA account and start your 14-day pilot.'
};

export default function SignupPage() {
  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      <div className='w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Start with SecQA</h1>
          <p className='mt-2 text-sm text-muted-foreground'>14-day pilot at $499. Money-back if we don&apos;t hit 90-minute first draft.</p>
        </div>
        <SignUp />
        <p className='text-center text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link href='/login' className='text-primary hover:underline'>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
