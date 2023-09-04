import { Button, CircularProgress, circularProgressClasses } from "@mui/material";

interface Props {
  className?: string,
}

export const ButtonLoader: React.FC<Props> = ({ className }) => (
  <Button
    className={className}
    variant="outlined"
    disabled
  >
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: '#cccccc',
        animationDuration: '550ms',
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
      size={30}
      thickness={3}
    />
  </Button>
);