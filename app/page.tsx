'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader/Loader';
import { readUser } from "@/utils/readUser";

export default function Page() {
  const router = useRouter();

  const checkAuth = async () => {
    const user = await readUser();

    if (!user) {
      router.push('/sign-in');
    } else {
      router.push('/posts');
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return <Loader />;
}
