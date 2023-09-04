'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader/Loader';
import { readUser } from "@/utils/readUser";

interface Props {
  children: React.ReactNode,
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const user = await readUser();

      if (user) {
        router.push('/posts');
      }
    } catch {
      console.error('Custom Error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default AuthLayout;