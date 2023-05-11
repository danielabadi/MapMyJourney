import { useState } from "react";
import { Box, Button, Dialog, DialogContent, SxProps, Theme, DialogTitle, DialogActions, IconButton, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { HiX } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { filterState, showFilterState } from "../../../../states/actionbar/atom";

const dialogStyles: SxProps<Theme> = {
  "& .MuiDialog-paper": {
    width: "200px",
    height: "230px",
    borderRadius: "10px",
    color: "#000000",
    position: "absolute",
    top: "60px",
    right: "425px",
    margin: "0",
  },

  "& .MuiDialogTitle-root": {
    height: "50px",
    borderBottom: "1px solid #000000",
    padding: "0",
  },

  "& .MuiDialogContent-root": {
    padding: "0",
    height: '130px',
    borderBottom: "1px solid #000000",
  },

  "& .MuiDialogActions-root": {
    height: "50px",
    padding: "0",
  }
};

const buttonStyles: SxProps<Theme> = {
  height: "30px",
  backgroundColor: "#073064",
  color: "#ffffff",
  borderRadius: "5px",
  fontFamily: "Zen Kurenaido",
  marginTop: "0px",
  fontSize: "16px",
  lineHeight: "20px",
  width: "100px",
  marginX: 'auto',

  "&:hover": {
    backgroundColor: "#073064",
  },
};

const typographyStyles: SxProps<Theme> = {
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "25px",
  lineHeight: "30px",
  fontFamily: "Inter",
  color: "#000000",
  textShadow: "1px solid #000000",
  textAlign: "center",
  paddingY: "10px",
};

const checkboxStyles: SxProps<Theme> = {
  marginLeft: '10px',
}

const Filter: React.FC = () => {
  const [showFilter, setShowFilter] = useRecoilState(showFilterState);
  const [filterValues, setFilterValues] = useRecoilState(filterState);
  const [addStatus1, setAddStatus1] = useState(filterValues.includes('ja fui'));
  const [addStatus2, setAddStatus2] = useState(filterValues.includes('quero ir'));
  const [addStatus3, setAddStatus3] = useState(filterValues.includes('planejado'));

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | undefined
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;

    setShowFilter(false);
  };

  const handleApply = () => {
    let newFilter: string[] = [];

    if (addStatus1) newFilter.push('ja fui');
    if (addStatus2) newFilter.push('quero ir');
    if (addStatus3) newFilter.push('planejado');

    setFilterValues(newFilter);
    handleClose({}, undefined);
  }

  return (
    <Dialog
      sx={dialogStyles}
      open={showFilter}
      onClose={handleClose}
      hideBackdrop={true}
    >
      <DialogTitle>
        <Box display='flex' flexDirection='row'>
          <Box sx={{ width: '50px' }}></Box>
          <Box flexGrow={1} sx={typographyStyles}>
            Filtro
          </Box>
          <Box display='flex'>
            <IconButton
              onClick={() => {
                handleClose({}, undefined);
              }}
              sx={{ paddingTop: "10px", color: "#808080" }}
            >
              <HiX size={"30px"} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel sx={checkboxStyles} control={
            <Checkbox
              onChange={() => setAddStatus1(!addStatus1)}
              defaultChecked={addStatus1}
            />
          } label="Já fui" />
          <FormControlLabel sx={checkboxStyles} control={
            <Checkbox
              onChange={() => setAddStatus2(!addStatus2)}
              defaultChecked={addStatus2}
            />
          } label="Quero ir" />
          <FormControlLabel sx={checkboxStyles} control={
            <Checkbox
              onChange={() => setAddStatus3(!addStatus3)}
              defaultChecked={addStatus3}
            />
          } label="Planejado" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button sx={buttonStyles} onClick={handleApply}> Aplicar </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Filter;
