'use client';

import { FormEvent, useState } from "react";
import "../auth.css";
import { Button, Link, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ButtonLoader } from "@/components/ButtonLoader/ButtonLoader";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push('/posts');
    }

    setError(true);
  }

  return (
    <main className="log-page">
      <Link className="log-change" href="/sign-up">Sign Up</Link>
      <form
        className="log-form"
        onSubmit={handleSubmit}
      >
        <h2 className="log-title">Sign In</h2>
        <TextField 
            label="Email"
            required
            variant="outlined"
            type="email"
            sx={{mb: 3}}
            fullWidth
            disabled={submitIsLoading}
            value={email}
            error={error}
            onChange={e => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
          <TextField 
            label="Password"
            required
            variant="outlined"
            type="password"
            sx={{mb: 3}}
            fullWidth
            disabled={submitIsLoading}
            value={password}
            error={error}
            onChange={e => {
              setPassword(e.target.value);
              setError(false);
            }}
          />

          {(!submitIsLoading)
            ? (
              <Button
                className="log-button"
                variant="contained"
                type="submit"
                size="large"
              >
                Sign In
              </Button>
            )
            : <ButtonLoader className="log-button" />
          }
      </form>
    </main>
  );
};

export default SignIn;
