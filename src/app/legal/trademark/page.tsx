import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Trademark Policy — SecQA',
  description: 'Trademark usage policy for SecQA brand assets.'
};

export default function LegalPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <Badge variant='secondary'>Legal</Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Trademark Policy</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Last updated: June 2026</p>
        </div>
      </section>
      <section>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
        <h2 className='mt-8 text-xl font-semibold'>1. SecQA Trademarks</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>SecQA, the SecQA logo, and other SecQA brand assets are trademarks of SecQA. This policy describes how third parties may use these marks.</div>
        <h2 className='mt-8 text-xl font-semibold'>2. Permitted Use</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You may use the SecQA name and logo: (a) to refer to our Service in factual, non-defamatory ways (e.g., "we use SecQA for questionnaire automation"); (b) in comparison tables or reviews, provided the comparison is factual and not misleading; (c) in news articles or blog posts about SecQA.

You may use our logo only with our written permission. To request permission, email founder@secqa.example.</div>
        <h2 className='mt-8 text-xl font-semibold'>3. Prohibited Use</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You may not: (a) use SecQA trademarks in a way that implies endorsement, partnership, or affiliation without our written consent; (b) use SecQA trademarks as part of your own trademark or domain name; (c) modify our logo or use it in a defamatory way; (d) use SecQA trademarks in connection with illegal activities.</div>
        <h2 className='mt-8 text-xl font-semibold'>4. Trademark Attribution</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>When using SecQA trademarks, include the following attribution: "SecQA is a trademark of SecQA. All rights reserved."</div>
        <h2 className='mt-8 text-xl font-semibold'>5. Contact</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>For trademark questions or permission requests, contact founder@secqa.example.</div>
        </div>
      </section>
    </div>
  );
}
