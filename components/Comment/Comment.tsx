import { formatDate } from '@/utils/formatDate';
import './Comment.css';
import { Comment } from '@/types/Comment';

interface Props {
  comment: Comment,
}

export const CommentItem: React.FC<Props> = ({ comment: data }) => {
  const { comment, commentator_email, created_at } = data;

  return (
    <article className='comment'>
      <div className='comment__header'>
        <p className='comment__email'>{commentator_email}</p>
        <p className='comment__created-at'>{formatDate(created_at)}</p>
      </div>
      <p className='comment__main'>
        {comment}
      </p>
    </article>
  );
}