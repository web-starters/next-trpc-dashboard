'use client';

import { signIn, type ClientSafeProvider } from 'next-auth/react';

import { Button } from '@/components/ui/button';

interface Props {
  providers: ClientSafeProvider[];
}

export default function SignInProviders({ providers }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-8">
      {providers.map(provider => (
        <div key={provider.id}>
          <Button className="w-full" onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
