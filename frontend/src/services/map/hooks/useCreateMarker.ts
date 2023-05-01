import { useMutation } from "@tanstack/react-query";
import MapService from "../MapService";

const useCreateMarker = () => {
  return useMutation(MapService.createMarker);
};

export default useCreateMarker;
