import {
  Avatar,
  Box,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { HiOutlineLogout, HiPlusCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import useLogout from "../../../../services/auth/hooks/useLogout";
import { isLoggedInState } from "../../../../states/auth/atom";
import { userResponseDto } from "../../../../types/users/userResponseDto";
import Menu from "../Menu/Menu";
import { showAddMarcadorState } from "../../../../states/actionbar/atom";

const boxStyles: SxProps<Theme> = {
  height: "49px",
  width: "100vw",
  backgroundColor: "#073064",
};

const typographyStyles: SxProps<Theme> = {
  position: "absolute",
  height: "33px",
  width: "237px",
  marginLeft: "10px",
  marginTop: "9px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "30px",
  lineHeight: "32px",
  fontFamily: "Fredoka One",
  color: "#ffffff",
  textShadow: "1px solid #000000",
  verticalAlign: "center",
};

const addMarcadorButtonStyles: SxProps<Theme> = {
  position: "absolute",
  color: "#ffffff",
  height: "26px",
  width: "159px",
  right: "100px",
  marginTop: "12px",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  lineHeight: "14px",
  alignItems: "center",
  textAlign: "center",
};

const avatarStyles: SxProps<Theme> = {
  position: "absolute",
  color: "#000000",
  marginTop: "12px",
  right: "70px",
  width: "24px",
  height: "24px",
  fontSize: "14px",
  fontWeight: 500,
  backgroundColor: "#f5f5f5",
};

const logoutButtonStyles: SxProps<Theme> = {
  position: "absolute",
  color: "#ffffff",
  marginTop: "15px",
  right: "10px",
  height: "4px",
};

const ActionBar = () => {
  const navigate = useNavigate();
  const setShowAddMarcador = useSetRecoilState(showAddMarcadorState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);
  let userData: userResponseDto = JSON.parse(sessionStorage.getItem('userData')!);

  useEffect(() => {
    userData = JSON.parse(sessionStorage.getItem('userData')!);
  }, [sessionStorage.getItem('userData')])

  const { mutate: logout } = useLogout();

  const handleAddMarcador = () => {
    setShowAddMarcador(true);
  };

  const handleLogout = () => {
    logout();
    
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => setAnchorElement(null);

  return (
    <Box sx={boxStyles}>
      <div>
        <Typography sx={typographyStyles}>MapMyJourney</Typography>
        <img
          src={require("../../../../components/Logo/LogoImage.png")}
          style={{
            position: "absolute",
            display: "inline-block",
            width: "30px",
            marginTop: "10px",
            marginLeft: "236px",
          }}
        />
        <IconButton sx={addMarcadorButtonStyles} onClick={handleAddMarcador}>
          <HiPlusCircle size={"21px"} />
          Adicionar marcador
        </IconButton>
        <Avatar sx={avatarStyles} onClick={handleClickMenu}>
          {userData.name[0].toUpperCase()}
        </Avatar>
        <Menu anchorElement={anchorElement} open={open} onClose={handleClose} />
        <IconButton sx={logoutButtonStyles} onClick={handleLogout}>
          <HiOutlineLogout size={"21px"} />
        </IconButton>
      </div>
    </Box>
  );
};

export default ActionBar;
