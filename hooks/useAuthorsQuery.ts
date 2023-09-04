import { ProfileType } from '@/types/ProfileType';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from 'react-query';

export function useAuthorsQuery() {
  const supabase = createClientComponentClient();

  return useQuery<ProfileType[], Error>('authors', async () => {
    const { data: profile_types, error } = await supabase
      .from('profile_types')
      .select("*")
      .eq('profile_type', 'author')
      .order('user_email', { ascending: true });

    if (error) {
      throw new Error('Posts loading error');
    }
    const data: ProfileType[] = await profile_types;
    return data;
  });
}
