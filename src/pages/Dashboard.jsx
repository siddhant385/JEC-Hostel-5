import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserProvider } from "../contexts/userContext";
import Dash from "../pages/Dash";
import Settings from "../pages/Settings";
import Sidebar from "../components/SideBar";
import { Box, IconButton, Drawer, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";




const Dashboard = () => {
  const { currentUser } = useAuth();
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <UserProvider>
      <Box className="flex min-h-screen">
        {/* Hamburger Menu Button for Mobile */}
        <IconButton
          edge="start"
          className="text-white absolute top-4 left-4"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Sidebar (Drawer) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
            BackdropProps: {
              style: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            },
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: "240px",
              backgroundColor: "#000", // Set to pure black
              color: "white",
            },
          }}
        >
          <Sidebar active={active} setActive={setActive} />
        </Drawer>

        {/* Permanent Sidebar for Large Screens */}
        <Box sx={{ display: { xs: "none", md: "block" }, width: "240px" }}>
          <Sidebar active={active} setActive={setActive} />
        </Box>

        {/* Main Content */}
        <Box className="flex-grow min-h-screen p-6">
          <Typography variant="h6" className="text-white">
            {currentUser ? currentUser.name : "Login to see"}
          </Typography>

          {active === "dashboard" && <Dash />}
          {active === "settings" && <Settings />}
        </Box>
      </Box>
    </UserProvider>
  );
};

export default Dashboard;

