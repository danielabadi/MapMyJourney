import { useState } from "react";
import { Box, Button, Dialog, DialogContent, SxProps, Theme, DialogTitle, DialogActions, IconButton, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { HiX } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { filterState, showFilterState } from "../../../../states/actionbar/atom";

const Filter: React.FC = () => {
  const [showFilter, setShowFilter] = useRecoilState(showFilterState);
  const [filterValues, setFilterValues] = useRecoilState(filterState);
  const [addStatus1, setAddStatus1] = useState(filterValues.includes('ja fui'));
  const [addStatus2, setAddStatus2] = useState(filterValues.includes('quero ir'));
  const [addStatus3, setAddStatus3] = useState(filterValues.includes('planejado'));

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | undefined
  ) => { };

  const handleApply = () => { }

  return (
    <Dialog
      open={showFilter}
      onClose={handleClose}
      hideBackdrop={true}
    >
      <DialogTitle>
        <Box display='flex' flexDirection='row'>
          <Box sx={{ width: '50px' }}></Box>
          <Box flexGrow={1} >
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
          <FormControlLabel control={
            <Checkbox
              onChange={() => setAddStatus1(!addStatus1)}
              defaultChecked={addStatus1}
            />
          } label="Já fui" />
          <FormControlLabel control={
            <Checkbox
              onChange={() => setAddStatus2(!addStatus2)}
              defaultChecked={addStatus2}
            />
          } label="Quero ir" />
          <FormControlLabel control={
            <Checkbox
              onChange={() => setAddStatus3(!addStatus3)}
              defaultChecked={addStatus3}
            />
          } label="Planejado" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApply}> Aplicar </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Filter;
