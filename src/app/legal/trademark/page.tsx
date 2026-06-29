'use client';
import { FadeIn, SectionDivider } from '@/components/ui/motion';

const SECTIONS = [
  {
    title: '1. SecQA Trademarks',
    paragraphs: [
      'SecQA, the SecQA logo, the SecQA wordmark, and other marks, logos, and designs used in connection with the SecQA Service (collectively, the "SecQA Marks") are trademarks of SecQA. The SecQA Marks are protected by United States and international trademark laws. This Trademark Policy describes the permitted and prohibited uses of the SecQA Marks by third parties.',
      'The current list of registered SecQA Marks includes: "SecQA" (word mark) and the SecQA logo (design mark). We may register additional marks from time to time; permitted use of any new marks will be governed by this policy. Trademark registrations are pending in the United States Patent and Trademark Office (USPTO).',
      'The SecQA Marks identify SecQA as the source of the SecQA Service. Use of the SecQA Marks in a manner that implies endorsement, partnership, or affiliation with SecQA without our prior written consent is prohibited. Use that could dilute the distinctiveness of the SecQA Marks or harm the SecQA brand is also prohibited.',
    ],
  },
  {
    title: '2. Permitted Use',
    paragraphs: [
      'You may use the SecQA Marks without prior written consent in the following circumstances: (a) referring to the SecQA Service in factual, editorial, or educational content (e.g., "We use SecQA for questionnaire automation"); (b) indicating that your product or service integrates with SecQA, provided the reference is factual and does not imply endorsement (e.g., "Integrates with SecQA via our public API"); (c) using the SecQA Marks in a directory or comparison list of compliance tools, provided the use is not misleading.',
      'Customer logo walls: customers and partners may display the "SecQA customer" or "SecQA partner" badge on their website, marketing materials, and slide decks, provided the badge is sourced from our official asset library at secqa.example/brand and is used at the size and proportions specified. Customers may not modify the badge except to scale it proportionally.',
      'Press releases and case studies: customers may mention their use of SecQA in press releases and case studies, provided the use is factual and the SecQA mark is used as an adjective, never as a verb or noun (e.g., "uses the SecQA platform" not "SecQAs their questionnaires"). We encourage customers to share their use cases with us before publication — we may be able to provide additional marketing support.',
    ],
  },
  {
    title: '3. Prohibited Use',
    paragraphs: [
      'You may not use the SecQA Marks: (a) as part of your own trademark, service mark, company name, or domain name (e.g., "SecQA-Tools.com", "SecQAPro"); (b) in a manner that implies endorsement, partnership, or affiliation with SecQA without our prior written consent; (c) in a manner that is misleading, defamatory, or otherwise harmful to the SecQA brand; (d) in connection with products or services that compete with the SecQA Service; (e) in a manner that could dilute the distinctiveness of the SecQA Marks.',
      'You may not: (a) modify the SecQA Marks in any way, including changing the color, proportions, or design elements; (b) combine the SecQA Marks with other marks, logos, or designs in a way that suggests a combined brand; (c) use the SecQA Marks on merchandise for sale (e.g., t-shirts, mugs, stickers) without our prior written consent; (d) use the SecQA Marks in metatags, keywords, or other hidden text to influence search engine ranking.',
      'You may not use the SecQA Marks in paid advertising (Google Ads, social media ads) targeting the SecQA brand name without our prior written consent. This includes bidding on "SecQA" as a keyword, using "SecQA" in ad copy, or displaying the SecQA Marks in ad creatives. We monitor for trademark misuse in advertising and may file takedown requests with advertising platforms.',
    ],
  },
  {
    title: '4. Attribution',
    paragraphs: [
      'When using the SecQA Marks in any permitted context, you must include the following attribution: "SecQA and the SecQA logo are trademarks of SecQA." The attribution should appear in a reasonable location relative to the use (e.g., in the footer of a webpage, in the credits of a presentation, or at the bottom of a press release).',
      'If you use the SecQA Marks in printed materials, the attribution should appear in the same document. If you use the SecQA Marks in digital materials (web, video, slide deck), the attribution should appear in the same medium (e.g., website footer, video credits, slide deck last slide).',
      'The first or most prominent use of the SecQA Mark in any document should be accompanied by the appropriate trademark symbol: \u2122 for unregistered marks, \u00AE for registered marks. Subsequent uses in the same document do not require the symbol. If you are unsure whether to use \u2122 or \u00AE, contact us at founder@secqa.example.',
    ],
  },
  {
    title: '5. Domain Names',
    paragraphs: [
      'You may not register or use domain names that incorporate the SecQA Marks in any form, including misspellings, transliterations, or variations. This includes domains such as secqa-tools.com, secqa-app.com, secqa-integration.com, or any other domain that could create confusion with the SecQA brand. We monitor domain registrations and may file UDRP (Uniform Domain-Name Dispute-Resolution Policy) proceedings to recover infringing domains.',
      'You may use a subdomain of your own domain that references SecQA for the limited purpose of hosting integration documentation or examples (e.g., secqa.yourcompany.com/docs). Such use must clearly indicate that the site is operated by you and is not affiliated with or endorsed by SecQA. You must include a prominent disclaimer on the site.',
      'If you have a legitimate need to use a domain that incorporates the SecQA Marks (e.g., you operate a SecQA user group), you must obtain our prior written consent. We may grant consent subject to conditions, including a license agreement, quality control requirements, and a requirement to transfer the domain to us upon termination of the license.',
    ],
  },
  {
    title: '6. Open Source Use',
    paragraphs: [
      'SecQA may publish open source software from time to time. The SecQA Marks may appear in open source project names, repository names, and documentation. Use of the SecQA Marks in connection with our open source projects is governed by the project\u2019s license and this Trademark Policy.',
      'You may fork, modify, and distribute our open source software in accordance with the applicable license. However, you may not use the SecQA Marks to identify or market your modified version of the software. You must rebrand your fork with a different name and logo that does not incorporate the SecQA Marks. You must clearly indicate that your fork is based on SecQA open source software and is not affiliated with or endorsed by SecQA.',
      'You may contribute to SecQA open source projects. By contributing, you grant us a license to use your contribution under the project\u2019s license. You retain ownership of your contribution but authorize us to use, modify, and distribute it. Contributions are subject to our Contributor License Agreement (CLA) where applicable.',
    ],
  },
  {
    title: '7. Display in Marketing Materials',
    paragraphs: [
      'Customers and partners may display the "Powered by SecQA" badge on their website, in their product UI, and in marketing materials, provided the badge is sourced from our official asset library at secqa.example/brand and is used at the size and proportions specified. The badge must link to secqa.example when displayed on a website.',
      'Partners (e.g., system integrators, consultants, resellers) may apply for "SecQA Partner" status. Approved partners receive additional brand assets, co-marketing support, and a directory listing on our website. Partner status is granted at our sole discretion and may be revoked if the partner violates this Trademark Policy or our partner agreement.',
      'You may not display the SecQA Marks in a manner that suggests SecQA endorsement of your product, service, or content beyond what is factually accurate. For example, you may not state "SecQA recommends our product" or "SecQA-certified" without our prior written consent. You may state "Integrates with SecQA" or "Built on the SecQA platform" if factually accurate.',
    ],
  },
  {
    title: '8. Quality Control',
    paragraphs: [
      'To maintain the value and integrity of the SecQA Marks, we exercise quality control over their use. We may review materials that use the SecQA Marks and require changes to ensure compliance with our brand guidelines. We may also provide updated brand assets, color palettes, and usage guidelines from time to time — these updates will be posted at secqa.example/brand and are effective immediately.',
      'If you display the SecQA Marks on a website or in marketing materials, you must keep those materials up to date with our latest brand guidelines. If we update our logo, color palette, or typography, you must update your materials within 60 days. Outdated use of the SecQA Marks may dilute the brand and is a violation of this Trademark Policy.',
      'We may request samples of materials that use the SecQA Marks for quality control purposes. You agree to provide such samples within 30 days of our request. We will treat any materials you provide as Confidential Information and will not share them with third parties without your prior written consent.',
    ],
  },
  {
    title: '9. Termination of Permission',
    paragraphs: [
      'Permission to use the SecQA Marks under this Trademark Policy terminates automatically if: (a) you cease to be a customer or partner of SecQA; (b) you violate this Trademark Policy and fail to cure the violation within 30 days of written notice; (c) we revoke permission in writing for any reason with 30 days\u2019 notice; or (d) we cease to offer the SecQA Marks under this policy.',
      'Upon termination, you must immediately stop using the SecQA Marks in all materials, including websites, marketing collateral, slide decks, videos, and merchandise. You must remove or cover up existing uses of the SecQA Marks within 30 days of termination. We may verify compliance by reviewing publicly accessible materials.',
      'Termination of permission does not affect any rights or obligations accrued before termination, including attribution obligations for prior publications. Sections of this Trademark Policy that by their nature should survive termination (including Prohibited Use, Attribution, and Quality Control) will survive.',
    ],
  },
  {
    title: '10. Infringement and Enforcement',
    paragraphs: [
      'We actively monitor for unauthorized or improper use of the SecQA Marks. We may send cease-and-desist letters, file takedown requests with hosting providers and advertising platforms, and pursue legal action against infringers. We reserve the right to defend the SecQA Marks through all available legal means, including under the Lanham Act (15 U.S.C. § 1114) and equivalent international trademark laws.',
      'If you become aware of any unauthorized or improper use of the SecQA Marks, please notify us at founder@secqa.example. Provide as much detail as possible, including the location of the infringing use, the nature of the use, and any contact information for the infringer. We appreciate community assistance in protecting the SecQA brand.',
      'If you receive a notice from us alleging that your use of the SecQA Marks violates this Trademark Policy, please respond within 14 days. We will work with you in good faith to resolve the issue, which may include modifying your use, obtaining a license, or ceasing use of the marks. Willful or repeated infringement may result in termination of your account and legal action.',
    ],
  },
  {
    title: '11. Changes to This Policy',
    paragraphs: [
      'We may update this Trademark Policy from time to time to reflect changes in our trademark portfolio, brand guidelines, or applicable law. We will post material changes on this page and update the "Last updated" date at the top of the policy.',
      'Continued use of the SecQA Marks after the effective date of any change constitutes acceptance of the updated policy. If you do not agree to a change, you must stop using the SecQA Marks and remove them from your materials within 30 days.',
      'An archive of prior versions of this Trademark Policy is maintained at secqa.example/legal/trademark/archive. We will make reasonable efforts to notify known customers and partners of material changes by email.',
    ],
  },
];

export default function LegalPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Legal</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-4'>
              Trademark Policy<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><p className='text-[13px] text-white/40'>Last updated: June 2026</p></FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[800px]' />

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card p-8 md:p-12'>
              <p className='text-[14px] text-[#999999] leading-[1.8] mb-8'>
                This Trademark Policy describes the permitted and prohibited uses of the SecQA trademarks by third parties. The SecQA Marks identify SecQA as the source of the SecQA Service.
              </p>
              <div className='space-y-12'>
                {SECTIONS.map((section) => (
                  <div key={section.title}>
                    <h2 className='text-[20px] font-bold text-white mb-4 tracking-tight'>{section.title}</h2>
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className='text-[14px] text-[#999999] leading-[1.8] mb-4 last:mb-0'>{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-[#111111]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card p-8'>
              <h2 className='text-[20px] font-bold text-white mb-4 tracking-tight'>Contact</h2>
              <p className='text-[14px] text-[#999999] leading-[1.8] mb-4'>
                For questions about this Trademark Policy, to request permission for a use not described above, or to download our official brand assets, contact us at:
              </p>
              <div className='space-y-2 text-[14px] text-[#CCCCCC]'>
                <p>SecQA (sole proprietorship)</p>
                <p>Trademark contact: founder@secqa.example</p>
                <p>Brand assets: secqa.example/brand</p>
                <p>Response time: within 5 business days</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
