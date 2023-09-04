import { Post } from '@/types/Post';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from 'react-query';

export function usePostsQuery() {
  const supabase = createClientComponentClient();

  return useQuery<Post[], Error>('posts', async () => {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Posts loading error');
    }
    const data: Post[] = await posts;
    return data;
  });
}
