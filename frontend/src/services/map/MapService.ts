import apiClient from "../apiClient";

const createMarker = async (formData: any) => {
  const form = new FormData();
  form.append("status", formData.status);
  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("start_date", formData.start_date === '' ? null : formData.start_date);
  form.append("end_date", formData.end_date === '' ? null : formData.end_date);
  form.append("lat", formData.lat);
  form.append("lng", formData.lng);
  formData.photos.forEach((x: any) => {
    form.append("uploadedImages", x);
  });

  const response = await apiClient.post("/markers", form, {
    withCredentials: true,
    headers: { "Content-Type": `multipart/form-data;` },
  });

  return response.data;
};

const editMarker = async (formData: any) => {
  const form = new FormData();
  form.append("markerId", formData.markerId);
  form.append("status", formData.status);
  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("start_date", formData.start_date === '' ? null : formData.start_date); 
  form.append("end_date", formData.end_date === '' ? null : formData.end_date);
  form.append("lat", formData.lat);
  form.append("lng", formData.lng);
  formData.photos.forEach((x: any) => {
    form.append("uploadedImages", x);
  });

  const response = await apiClient.put("/markers", form, {
    withCredentials: true,
    headers: { "Content-Type": `multipart/form-data;` },
  });

  return response.data;
};

const MapService = {
  createMarker,
  editMarker
};

export default MapService;
