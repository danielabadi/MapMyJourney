import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
} from "@mui/material";
import { HiFilter, HiX } from "react-icons/hi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterState, showFilterState, showMarkersListState } from "../../../../states/actionbar/atom";
import { markersState } from "../../../../states/markers/atom";
import moment from "moment";

const dialogStyles: SxProps<Theme> = {
  "& .MuiDialog-paper": {
    width: "400px",
    minHeight: "200px",
    maxHeight: "500px",
    borderRadius: "10px",
    color: "#000000",
    position: "absolute",
    top: "60px",
    right: "14px",
    margin: "0",
  },

  "& .MuiDialogTitle-root": {
    height: "50px",
    borderBottom: "1px solid #000000",
    padding: "0",
  },

  "& .MuiDialogContent-root": {
    padding: "0",
  },

  "& .MuiList-root": {
    padding: "0",
  },

  "& .MuiListItemButton-root": {
    padding: "0",
  },

  "& .MuiListItemText-primary": {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "20px",
  },

  "& .MuiListItemText-secundary": {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(0, 0, 0, 0.7)",
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

const MarkersList: React.FC = () => {
  const markersValues: any[] = useRecoilValue(markersState);
  const [showMarkersList, setShowMarkersList] =
    useRecoilState(showMarkersListState);
  const setShowFilter = useSetRecoilState(showFilterState);
  const filterValues = useRecoilValue(filterState);

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | undefined
  ) => { };

  const handleClickItem = (element: any) => { };

  return (
    <>
      <Dialog
        sx={dialogStyles}
        open={showMarkersList}
        onClose={handleClose}
        hideBackdrop={true}
      >
        <DialogTitle>
          <Box display='flex' flexDirection='row'>
            <Box display='flex'>
              <IconButton
                onClick={() => { }}
                sx={{ paddingTop: "15px", color: "#808080", paddingX: "13px" }}
              >
                <HiFilter size={"20px"} />
              </IconButton>
            </Box>
            <Box flexGrow={1} sx={typographyStyles}>
              Meus marcadores
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
          <List>
            {markersValues
              .filter((element) => filterValues.includes(element.status))
              .map((element) => (
                <ListItemButton
                  key={element.id}
                  onClick={() => {
                    handleClickItem(element);
                  }}
                  sx={{ height: "72px" }}
                >
                  <ListItemIcon sx={{ paddingX: "18px" }}>
                    <span
                      style={{
                        height: "30px",
                        width: "30px",
                        backgroundColor:
                          element.status === "ja fui"
                            ? "#073064"
                            : element.status === "quero ir"
                              ? "green"
                              : "#dede09",
                        borderRadius: "50%",
                        marginRight: "6px",
                        display: "inline-block",
                      }}
                    ></span>
                  </ListItemIcon>
                  <ListItemText
                    primary={element.title}
                    secondary={
                      element.start_date
                        ? `${moment(element.start_date).format(
                          "DD/MM/YYYY"
                        )} - ${moment(element.end_date).format("DD/MM/YYYY")}`
                        : ""
                    }
                  />
                </ListItemButton>
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarkersList;
