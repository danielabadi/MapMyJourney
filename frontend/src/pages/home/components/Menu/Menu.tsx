import {
  Menu as MuiMenu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { HiLocationMarker, HiPencilAlt } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import { showEditPerfilState } from "../../../../states/actionbar/atom";

const typographyStyles: SxProps<Theme> = {
  positon: "relative",
  width: "140px",
  marginLeft: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "20px",
  fontFamily: "Inter",
  color: "#000000",
  textAlign: "center",
};

const menuStyles: SxProps<Theme> = {
  width: "calc(100vw*0.15)",
  marginTop: "13px",

  "& .MuiPaper-root": {
    borderRadius: "10px",
    maxWidth: "300px",
  },

  "& .MuiList-root": {
    paddingTop: "0px",
    paddingBottom: "0px",
    height: "80px",
  },

  "& .MuiMenuItem-root": {
    paddingY: "3px",
    height: "40px",
  },
};

export interface MenuProps {
  anchorElement: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ anchorElement, open, onClose }) => {
  const setShowEditPerfil = useSetRecoilState(showEditPerfilState);

  const handleEditarPerfil = () => {
    setShowEditPerfil(true);
    onClose();
  };

  const handleList = () => {
    onClose();
  };

  return (
    <MuiMenu
      sx={menuStyles}
      anchorEl={anchorElement}
      open={open}
      onClose={onClose}
    >
      <MenuItem disableRipple onClick={handleEditarPerfil}>
        <HiPencilAlt size={"20px"} />
        <Typography sx={typographyStyles}>Editar Perfil</Typography>
      </MenuItem>
      <MenuItem disableRipple onClick={handleList}>
        <HiLocationMarker size={"20px"} />
        <Typography sx={typographyStyles}>Meus Marcadores</Typography>
      </MenuItem>
    </MuiMenu>
  );
};

export default Menu;
