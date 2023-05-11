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
            <Box flexGrow={1}>
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
