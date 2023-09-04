'use client';

import Link from "next/link";
import "../auth.css";
import { Button, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ButtonLoader } from "@/components/ButtonLoader/ButtonLoader";
import CloseIcon from '@mui/icons-material/Close';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [profileType, setProfileType] = useState('commentator');
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const supabase = createClientComponentClient();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });


    if (error || !data.user) {
      setSubmitIsLoading(false);
      setError(true);

      return;
    }

    setIsModal(true);

    const user_email = data.user.email;

    const profile_type = await supabase
      .from('profile_types')
      .insert([
        { profile_type: profileType, user_email },
      ])
      .select()

    if (profile_type.error) {
      setSubmitIsLoading(false);
      setError(true);

      return;
    }

    setSubmitIsLoading(false);
    setEmail('');
    setPassword('');
    setProfileType('commentator');
  }

  return (
    <main className="log-page">
      <Link className="log-change" href="/sign-in">Sign In</Link>
      <form
        className="log-form"
        onSubmit={handleSubmit}
      >
        <h2 className="log-title">Sign Up</h2>
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

          <RadioGroup
            className="log-radio-buttons"
            name="radio-buttons-status"
            value={profileType}
            onChange={e => setProfileType(e.target.value)}
            row
          >
            <FormControlLabel
              value="commentator"
              control={<Radio />}
              label="Commentator"
              disabled={submitIsLoading}
            />
            <FormControlLabel
              value="author"
              control={<Radio />}
              label="Author"
              disabled={submitIsLoading}
            />
          </RadioGroup>

          {(!submitIsLoading)
            ? (
              <Button
                className="log-button"
                variant="contained"
                type="submit"
                size="large"
              >
                Sign Up
              </Button>
            )
            : <ButtonLoader className="log-button" />
          }
      </form>
      {isModal && (
        <div className="log-modal">
          <p className="log-modal-box">
            Please verify your email and log in
            <IconButton
              onClick={() => setIsModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </p>
        </div>
      )}
    </main>
  );
};

export default SignUp;
