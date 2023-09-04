'use client';

import './authors.css';
import { AuthorsList } from "@/components/AuthorsList/AuthorsList";
import { PostComponent } from '@/components/Post/Post';
import { PostsList } from "@/components/PostsList/PostsList";
import { Post } from '@/types/Post';
import { useState } from 'react';

const AuthorsPage: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [post, setPost] = useState<Post | null>(null);

  return (
      <main className="page__authors">
        <AuthorsList onSetAuthor={(email: string) => setAuthor(email)} />
        <PostsList email={author} onSetPost={(post: Post) => setPost(post)} />
        <PostComponent post={post} />

      </main>
  );
};

export default AuthorsPage;
