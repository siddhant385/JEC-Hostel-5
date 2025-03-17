import { Box, Divider, Typography } from "@mui/material";

const Sidebar = ({ active, setActive }) => {
  return (
    <Box className="w-60 h-full bg-gray-900 text-center flex flex-col">
      <Typography variant="h6" className="text-white p-4">Menu</Typography>
      <Divider className="border-gray-700" />

      <Box
        onClick={() => setActive("dashboard")}
        className={`cursor-pointer p-4 mx-3 my-2 rounded-2xl ${
          active === "dashboard" ? "bg-red-500 text-black" : "text-red-500"
        } border-blue-500 border-4 shadow-md`}
      >
        Dashboard
      </Box>

      <Divider className="border-gray-700 my-2" />

      <Box
        onClick={() => setActive("settings")}
        className={`cursor-pointer p-4 mx-3 my-2 rounded-2xl ${
          active === "settings" ? "bg-red-500 text-black" : "text-red-500"
        } border-blue-500 border-4 shadow-md`}
      >
        Settings
      </Box>
    </Box>
  );
};

export default Sidebar;
