import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import QuizIcon from "@mui/icons-material/Quiz";

import { useNavigate } from "react-router-dom";

import MenuAppBar from "../Header/MenuAppBar";
import QuestionManagement from "./Child/QuestionManagement/QuestionManagement";


const drawerWidth = 220;

export default function ClippedDrawer() {
  const navigate = useNavigate();

  const hanldePlay = () => {
    navigate("../getlistquestion");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <MenuAppBar />
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText>User Management</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QuizIcon />
                  </ListItemIcon>
                  <ListItemText>Question Management</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
            <ListItem disablePadding onClick={hanldePlay}>
              <ListItemButton>
                <ListItemIcon>
                  <PlayCircleIcon />
                </ListItemIcon>
                <ListItemText>Play Page</ListItemText>
              </ListItemButton>
            </ListItem>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <QuestionManagement />
        </Box>
      </Box>
    </>
  );
}
