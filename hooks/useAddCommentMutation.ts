import { Comment } from '@/types/Comment';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useMutation, useQueryClient } from 'react-query';

export function useAddCommentMutation() {
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();

  const addPostMutation = useMutation<Comment, Error, { comment: string; post_id: number, commentator_email: string }>(
    async ({ comment, post_id, commentator_email }) => {
      const response = await supabase
        .from('comments')
        .insert([{ comment, post_id, commentator_email }])
        .select('*');
    
    const newPosts: Comment[] = (response?.data || []) as Comment[];

      return newPosts[0];
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
      },
    }
  );

  return addPostMutation;
}
