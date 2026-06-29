import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Contact SecQA — Talk to the founder directly',
  description: 'No sales reps, no ticketing system. Email the founder directly, book a 15-min demo, or join our Slack community.'
};

export default function ContactPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>Contact SecQA</h1>
          <p className='mt-4 text-lg text-muted-foreground'>No sales reps. No ticketing system. You talk directly to the founder.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='rounded-lg border p-6'>
              <Mail className='h-8 w-8 text-primary' />
              <h3 className='mt-4 font-semibold'>Email</h3>
              <p className='mt-2 text-sm text-muted-foreground'>For anything: questions, feedback, support, partnerships.</p>
              <a href='mailto:founder@secqa.example' className='mt-3 inline-block text-sm text-primary hover:underline'>founder@secqa.example</a>
              <p className='mt-2 text-xs text-muted-foreground'>Response SLA: 24 hours</p>
            </div>
            <div className='rounded-lg border p-6'>
              <Calendar className='h-8 w-8 text-primary' />
              <h3 className='mt-4 font-semibold'>Book a demo</h3>
              <p className='mt-2 text-sm text-muted-foreground'>15 minutes. We process your last questionnaire live as the demo.</p>
              <a href='#book' className='mt-3 inline-block text-sm text-primary hover:underline'>Open calendar</a>
              <p className='mt-2 text-xs text-muted-foreground'>Available Mon-Fri, 8am-6pm ET</p>
            </div>
            <div className='rounded-lg border p-6'>
              <MessageCircle className='h-8 w-8 text-primary' />
              <h3 className='mt-4 font-semibold'>Slack community</h3>
              <p className='mt-2 text-sm text-muted-foreground'>Join 80+ SaaS founders discussing compliance and security reviews.</p>
              <a href='#slack' className='mt-3 inline-block text-sm text-primary hover:underline'>Request invite</a>
              <p className='mt-2 text-xs text-muted-foreground'>Free, no purchase required</p>
            </div>
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-2xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Send a message</h2>
          <form className='space-y-4'>
            <div><label className='block text-sm font-medium mb-1'>Name</label><input type='text' className='w-full rounded border p-2' required /></div>
            <div><label className='block text-sm font-medium mb-1'>Email</label><input type='email' className='w-full rounded border p-2' required /></div>
            <div><label className='block text-sm font-medium mb-1'>Company (optional)</label><input type='text' className='w-full rounded border p-2' /></div>
            <div><label className='block text-sm font-medium mb-1'>ARR range (helps us prioritize)</label><select className='w-full rounded border p-2'><option>Under $1M</option><option>$1M-$5M</option><option>$5M-$20M</option><option>$20M+</option></select></div>
            <div><label className='block text-sm font-medium mb-1'>Message</label><textarea rows={5} className='w-full rounded border p-2' placeholder='What would you like to discuss?' required></textarea></div>
            <Button type='submit' className='w-full'>Send message</Button>
          </form>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Other ways to reach us</h2>
          <div className='flex justify-center gap-4'>
            <Button asChild variant='outline'><Link href='https://github.com/Vitalcheffe/secqa-v2'>GitHub</Link></Button>
            <Button asChild variant='outline'><Link href='/changelog'>Changelog</Link></Button>
            <Button asChild variant='outline'><Link href='/trust-center'>Trust Center</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
