import { Post } from '@/types/Post';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useMutation, useQueryClient } from 'react-query';

export function useAddPostMutation() {
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();

  const addPostMutation = useMutation<Post, Error, { name: string; post: string, author_email: string }>(
    async ({ name, post, author_email }) => {
      const response = await supabase
        .from('posts')
        .insert([{ name, post, author_email }])
        .select('*');
    
    const newPosts: Post[] = (response?.data || []) as Post[];

      return newPosts[0];
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    }
  );

  return addPostMutation;
}
