import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} sx={{ backgroundColor: "#f5f5f5" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            focusRipple={false}
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: "#0000FF" }} />
          </IconButton>
          <Typography
            variant="body1"
            noWrap
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                color: "#0000FF",
                fontWeight: "bold",
              },
            }}
          >
            ustudio
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
