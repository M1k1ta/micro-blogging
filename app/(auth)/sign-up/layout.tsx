export const metadata = {
  title: 'Sign Up',
}

interface Props {
  children: React.ReactNode,
}

const SignUpLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default SignUpLayout;
