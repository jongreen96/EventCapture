'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Plan } from '@/db/schema';
import { useState } from 'react';
import Guests from './guests';
import Overview from './overview';
import Photos from './photos';
import PlanSelector from './plan-selector';
import Settings from './settings';
import Usage from './usage';

export default function Dashboard({ plans }: { plans: Plan[] }) {
  let [tab, setTab] = useState('overview');

  return (
    <main className='container mx-auto mt-6 space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold tracking-tight'>Dashboard</h1>
        <PlanSelector plans={plans} />
      </div>

      <Tabs value={tab}>
        <TabsList className='mb-4'>
          <TabsTrigger value='overview' onClick={() => setTab('overview')}>
            Overview
          </TabsTrigger>
          <TabsTrigger value='photos' onClick={() => setTab('photos')}>
            Photos
          </TabsTrigger>
          <TabsTrigger value='guests' onClick={() => setTab('guests')}>
            Guests
          </TabsTrigger>
          <TabsTrigger value='usage' onClick={() => setTab('usage')}>
            Usage
          </TabsTrigger>
          <TabsTrigger value='settings' onClick={() => setTab('settings')}>
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value='overview'>
          <Overview plan={plans[0]} setTab={setTab} />
        </TabsContent>
        <TabsContent value='photos'>
          <Photos />
        </TabsContent>
        <TabsContent value='guests'>
          <Guests />
        </TabsContent>
        <TabsContent value='usage'>
          <Usage />
        </TabsContent>
        <TabsContent value='settings'>
          <Settings />
        </TabsContent>
      </Tabs>
    </main>
  );
}
