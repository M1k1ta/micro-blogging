import "./index.css";

export const metadata = {
  title: 'MicroBlogging',
}

interface Props {
  children: React.ReactNode,
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
