export const metadata = {
  title: 'Sign In',
}

interface Props {
  children: React.ReactNode,
}

const SignInLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default SignInLayout;
