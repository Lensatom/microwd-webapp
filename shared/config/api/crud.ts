import { api, tokenInterceptor } from "./axios";
import { IDELETE, IGET, IPOST, IPUT } from "./interfaces";

export const POST = async ({
  route,
  data,
  authorization=true,
  isFormData=false,
  isServer=false
}:IPOST) => {
  const eject = tokenInterceptor(isServer);
  const response = await api.post(
    route,
    data,
    {headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    }}
  );
  if (authorization) eject();
  return response.data;
}

export const GET = async ({
  route,
  authorization=true,
  isServer=false
}:IGET) => {
  const eject = tokenInterceptor(isServer);
  const response = await api.get(
    route,
    {headers: {"Content-Type": "application/json"}}
  );
  if (authorization) eject();
  return response.data;
}

export const PUT = async ({
  route,
  data,
  authorization=true,
  isFormData=false
}:IPUT) => {
  const eject = tokenInterceptor();
  const response = await api.put(
    route,
    data,
    {headers: {"Content-Type": isFormData ? "multipart/form-data" : "application/json"}}
  );
  if (authorization) eject();
  return response.data;
}

export const DELETE = async ({
  route,
  authorization=true
}:IDELETE) => {
  const eject = tokenInterceptor();
  const response = await api.delete(
    route
  );
  if (authorization) eject();
  return response.data;
}