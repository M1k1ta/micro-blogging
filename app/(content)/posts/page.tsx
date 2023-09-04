'use client';

import { useEffect, useState } from "react";
import './posts.css';
import '@/components/PostsList/PostsList.css';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import { AuthorModal } from "@/components/AuthorModal/AuthorModal";
import { usePostsQuery } from "@/hooks/usePostsQuery";
import { ListLoader } from "@/components/ListLoader/ListLoader";
import { readUser } from "@/utils/readUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatDate } from "@/utils/formatDate";
import { PostComponent } from "@/components/Post/Post";
import { Post } from "@/types/Post";

const Posts: React.FC = () => {
  const { data: posts, isLoading } = usePostsQuery();
  const [isModal, setIsModal] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const supabase = createClientComponentClient();

  const getProfileType = async () => {
    const user = await readUser();

    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from('profile_types')
      .select('*')
      .eq('user_email', user.email);

    if (data && data[0].profile_type === 'author' && !error) {
      setIsAuthor(true);
    }
  }

  useEffect(() => {
    getProfileType();
  }, []);

  return (
      <main className="page__posts">
        <section className="posts">
          <div className="posts__item">
            <p className="posts__id">
              {(isAuthor)
                ? (
                  <IconButton
                    className="posts__plus"
                    onClick={() => setIsModal(true)}
                  >
                    <AddIcon fontSize="large" color="primary" />
                  </IconButton>
                )
                : (<p> ID </p>)}
            </p>
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
                      onClick={() => setPost(post)}
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

        <PostComponent post={post} />

        {isModal && (
          <AuthorModal onChangeIsModal={setIsModal} />
        )}
      </main>
  );
};

export default Posts;
