'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DatabasePage from './page';

export default function DatabaseClient() {
  const router = useRouter();

  useEffect(() => {
    const isAuthed =
      localStorage.getItem('vybe_employee_auth') === 'true';

    if (!isAuthed) {
      router.push('/mitarbeiter');
    }
  }, [router]);

  return <DatabasePage />;
}