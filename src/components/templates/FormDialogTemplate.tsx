import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function FormDialogTemplate({ title, children, className }: Props) {
  return (
    <DialogContent className={cn('sm:max-w-[425px]', className)}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">{children}</div>
    </DialogContent>
  );
}
