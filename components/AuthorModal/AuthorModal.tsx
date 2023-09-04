import { Button, IconButton, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
import CloseIcon from '@mui/icons-material/Close';
import './AuthorModal.css';
import { FormEvent, useState } from "react";
import { ButtonLoader } from "../ButtonLoader/ButtonLoader";
import { useAddPostMutation } from "@/hooks/useAddPostMutation";
import { readUser } from "@/utils/readUser";

interface Props {
  onChangeIsModal: (v: boolean) => void;
}

export const AuthorModal: React.FC<Props> = ({ onChangeIsModal }) => {
  const [name, setName] = useState('');
  const [post, setPost] = useState('');

  const addPostMutation = useAddPostMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = await readUser();

    if (!user || !user.email) {
      return;
    }

    const author_email = user.email;

    try {
      await addPostMutation.mutateAsync({ name, post, author_email });

      onChangeIsModal(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <section className="author-modal">
      <form
        className="author-modal__form"
        onSubmit={handleSubmit}
      >
        <IconButton
          className="author-modal__close"
          onClick={() => onChangeIsModal(false)}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <h2 className="author-modal__title">Create post</h2>

        <TextField
          name="PostName"
          label="Named Your New Post"
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{mb: 3}}
          fullWidth
          disabled={addPostMutation.isLoading}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextareaAutosize
          className="author-modal__textarea"
          minRows={5}
          placeholder="Text"
          disabled={addPostMutation.isLoading}
          value={post}
          onChange={e => setPost(e.target.value)}
        />

        {(!addPostMutation.isLoading)
          ? (
            <Button
              className="author-modal__button"
              variant="contained"
              type="submit"
              size="large"
              fullWidth
            >
              Create Post
            </Button>
          )
          : <ButtonLoader className="author-modal__button" />
        }
      </form>
    </section>
  );
}