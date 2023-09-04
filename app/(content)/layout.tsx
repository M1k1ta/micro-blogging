'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader/Loader';
import { readUser } from "@/utils/readUser";
import { Navigation } from '../ui/Navigation';

export const metadata = {
  title: 'MicroBlogging',
}

const navLinks = [
  {
    name: 'Posts',
    link: '/posts',
  },
  {
    name: 'Authors',
    link: '/authors',
  }
];

interface Props {
  children: React.ReactNode,
}

const ContentLayout: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const user = await readUser();

      if (!user) {
        router.push('/sign-in');
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
      <body>
        <Navigation navLinks={navLinks} />
        {children}
      </body>
    </html>
  )
}

export default ContentLayout;