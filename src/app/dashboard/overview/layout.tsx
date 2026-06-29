import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>SecQA Dashboard 👋</h2>
          <Badge variant='outline'>Pro tier</Badge>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Questionnaires This Month</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                12
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +3
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                8 of 20 monthly limit used <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>12 questionnaires processed</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Time Saved</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                168 hours
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +42h
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                vs. 14h baseline per questionnaire
              </div>
              <div className='text-muted-foreground'>~$20,160 engineering time saved</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Avg Confidence</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                92%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Answer library growing <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>87 answers in library</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Deals Unblocked</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                4
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +2
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Enterprise pipeline $240K <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>2 deals in final review</div>
            </CardFooter>
          </Card>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Questionnaire Volume (6 months)</CardTitle>
              <CardDescription>
                Trend of questionnaires processed per month
              </CardDescription>
            </CardHeader>
            {bar_stats}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Saved Cumulative</CardTitle>
              <CardDescription>
                Engineering hours saved per month
              </CardDescription>
            </CardHeader>
            {area_stats}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questionnaire Status</CardTitle>
              <CardDescription>
                Breakdown by draft / review / approved
              </CardDescription>
            </CardHeader>
            {pie_stats}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Questionnaires</CardTitle>
              <CardDescription>
                Last 5 questionnaires processed
              </CardDescription>
            </CardHeader>
            {sales}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
