import { Post } from '@/types/Post';
import { CommentItem } from '@/components/Comment/Comment';
import './Post.css'
import { useCommentsQuery } from '@/hooks/useCommentsQuery';
import { Button, TextareaAutosize } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useAddCommentMutation } from '@/hooks/useAddCommentMutation';
import { readUser } from "@/utils/readUser";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ButtonLoader } from '../ButtonLoader/ButtonLoader';
import { ListLoader } from '../ListLoader/ListLoader';

interface Props {
   post: Post | null,
}

export const PostComponent: React.FC<Props> = ({ post: data }) => {
  if (!data) {
    return (
      <section className="post">
        <h2 className='post__title'>Choose a post</h2>
      </section>
    );
  }

  const [comment, setComment] = useState('');
  const [isCommentator, setIsCommentator] = useState(false);
  const { data: comments, isLoading } = useCommentsQuery(data.id);
  const addCommentMutation = useAddCommentMutation();
  const supabase = createClientComponentClient();
  const { id, name, post, author_email } = data;

  const getProfileType = async () => {
    const user = await readUser();

    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from('profile_types')
      .select('*')
      .eq('user_email', user.email);

    if (data && data[0].profile_type === 'commentator') {
      setIsCommentator(true);
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const user = await readUser();

    if (!user || !user.email) {
      return;
    }

    const commentator_email = user.email;

    try {
      await addCommentMutation.mutateAsync({ comment, post_id: id, commentator_email });

      setComment('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }

  useEffect(() => {
    getProfileType();
  }, []);

  return (
    <section className="post">
      <h2 className='post__title'>{name}</h2>
      <p className='post__email'>Author: {author_email}</p>
      <p className='post__text'>{post}</p>

      {isCommentator && (
        <form
          className='post__form'
          onSubmit={handleSubmit}
        >
          <TextareaAutosize
            className='post__comment-input'
            placeholder='Comment'
            disabled={addCommentMutation.isLoading}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          {(!addCommentMutation.isLoading)
            ? (
              <Button
                variant='contained'
                type='submit'
              >
                Comment
              </Button>
            )
            : <ButtonLoader />
          }

        </form>
      )}

      {(!isLoading)
        ? (
          <>
            {comments?.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </>
        )
        : <ListLoader />
      }


    </section>
  );
}