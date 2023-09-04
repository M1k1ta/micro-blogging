import { Comment } from '@/types/Comment';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from 'react-query';

export function useCommentsQuery(post_id: number | null) {
  const supabase = createClientComponentClient();

  const queryKey = ['comments', post_id];

  return useQuery<Comment[], Error>(queryKey, async () => {
    if (!post_id) {
      return [];
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post_id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Comments loading error');
    }

    const data: Comment[] = await comment;
    return data;
  });
}

