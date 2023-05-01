import { useMutation } from "@tanstack/react-query";
import MapService from "../MapSerive";

const useCreateMarker = () => {
  return useMutation(MapService.createMarker);
};

export default useCreateMarker;
