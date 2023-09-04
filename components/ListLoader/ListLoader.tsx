import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import './ListLoader.css';

export const ListLoader = () => (
  <Box className="list-loader" sx={{ position: 'relative' }}>
    <CircularProgress
      variant="determinate"
      sx={{
        color: (theme) =>
          theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
      }}
      size={50}
      thickness={3}
      value={100}
    />
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
      size={50}
      thickness={3}
    />
  </Box>
);