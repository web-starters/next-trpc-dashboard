import { useTranslations } from 'next-intl';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Props {
  title: string;
  handleSubmit: () => void;
}

export default function AlertDialogTemplate({ title, handleSubmit }: Props) {
  const t = useTranslations('global');

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit}>{t('submit')}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
