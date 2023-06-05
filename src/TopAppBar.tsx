import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const TopAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Set the desired margin bottom
  backgroundColor: "#52295F", // Set the desired background color
  borderRadius: "10pt", // Set the desired border radius
  width: "100%", // Set the width to 100% to span the full page
  //boxShadow: "none",
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(4), // Adjust the margin for larger screens if needed
  },
}));

const LeftTitlesContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const TitleText = styled("span")(({ theme }) => ({
  marginRight: theme.spacing(1),
  fontWeight: "normal",
  fontSize: "30px", // Set the desired font size
  color: theme.palette.common.white,
}));

const Separator = styled("div")(({ theme }) => ({
  width: "6px", // Set the desired width
  height: "35pt", // Set the desired height to span the full height of the app bar
  backgroundColor: "#6AABD7",
  margin: theme.spacing(0, 1),
  borderRadius: "10pt", // Add margin to adjust the position of the separator
}));
const RightButtonsContainer = styled("div")({
  marginLeft: "auto",
});

const ButtonWrapper = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  backgroundColor: "#6AABD7",
  color: theme.palette.common.white,
  borderRadius: "50%",
  minWidth: 0,
  padding: theme.spacing(1),
}));

const TopAppBarComponent: React.FC = () => {
  return (
    <TopAppBar position="static">
      <Toolbar>
        <LeftTitlesContainer>
          <TitleText>Quantified Student</TitleText>
          <Separator />
          <TitleText>Performance Dashboard</TitleText>
        </LeftTitlesContainer>
        <RightButtonsContainer>
          <ButtonWrapper>
            <SettingsIcon style={{ color: "#52295F" }} />
          </ButtonWrapper>
          <ButtonWrapper>
            <MessageIcon style={{ color: "#52295F" }} />
          </ButtonWrapper>
          <ButtonWrapper>
            <NotificationsIcon style={{ color: "#52295F" }} />
          </ButtonWrapper>
          <ButtonWrapper>
            <AccountCircleIcon style={{ color: "#52295F" }} />
          </ButtonWrapper>
        </RightButtonsContainer>
      </Toolbar>
    </TopAppBar>
  );
};

export default TopAppBarComponent;
