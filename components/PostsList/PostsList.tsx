import './PostsList.css';
import { ListLoader } from "../ListLoader/ListLoader";
import { useAuthorPostsQuery } from '@/hooks/useAuthorPostsQuery';
import { Post } from '@/types/Post';
import { formatDate } from '@/utils/formatDate';

interface Props {
  email: string,
  onSetPost: (v: Post) => void,
}

export const PostsList: React.FC<Props> = ({ email, onSetPost }) => {
  const { data: posts, isLoading } = useAuthorPostsQuery(email);

  return (
    <section className="posts">
      <div className="posts__item">
        <p className="posts__id">ID</p>
        <p className="posts__post-column">
          Post
        </p>
      </div>

      {(posts && posts.length > 0)
          ? (
            <ul className="posts__list">
              {posts?.map((post) => (
                <li
                  className="posts__item"
                  key={post.id}
                >
                  <p className="posts__id">{post.id}</p>
                  <button
                    className="posts__button"
                    onClick={() => onSetPost(post)}
                  >
                    <p className="posts__name">{post.name}</p>
                    <p className="posts__created-at">{formatDate(post.created_at)}</p>
                  </button>
                </li>
              ))}
            </ul>
          )
          : (isLoading)
              ? <ListLoader />
              : <h2 className="posts__choose-author">Choose a author</h2>
        }
    </section>
  );
}