import {
  Menu as MuiMenu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { HiLocationMarker, HiPencilAlt } from "react-icons/hi";

export interface MenuProps {
  anchorElement: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ anchorElement, open, onClose }) => {
  const handleEditarPerfil = () => {
    onClose();
  };

  const handleList = () => {
    onClose();
  };

  return (
    <MuiMenu
      anchorEl={anchorElement}
      open={open}
      onClose={onClose}
    >
      <MenuItem disableRipple onClick={handleEditarPerfil}>
        <HiPencilAlt size={"20px"} />
        <Typography>Editar Perfil</Typography>
      </MenuItem>
      <MenuItem disableRipple onClick={handleList}>
        <HiLocationMarker size={"20px"} />
        <Typography >Meus Marcadores</Typography>
      </MenuItem>
    </MuiMenu>
  );
};

export default Menu;
