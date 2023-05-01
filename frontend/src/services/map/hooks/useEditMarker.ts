import { useMutation } from "@tanstack/react-query";
import MapService from "../MapService";

const useEditMarker = () => {
  return useMutation(MapService.editMarker);
};

export default useEditMarker;
