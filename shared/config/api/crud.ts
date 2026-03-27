import { api, tokenInterceptor } from "./axios";
import { IDELETE, IGET, IPOST, IPUT } from "./interfaces";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

const redirectToSignupOnServerUnauthorized = ({ error, isServer, route }: { error: unknown; isServer: boolean; route: string }) => {
  if (!isServer) {
    return;
  }

  if (!(error instanceof AxiosError)) {
    return;
  }

  if (error.response?.status !== 401) {
    return;
  }

  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
  redirect(`/signup?redirect=${encodeURIComponent(normalizedRoute)}`);
};

export const POST = async ({
  route,
  data,
  authorization=true,
  isFormData=false,
  isServer=false
}:IPOST) => {
  const eject = authorization ? tokenInterceptor(isServer) : () => {};

  try {
    const response = await api.post(
      route,
      data,
      {headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      }}
    );

    return response.data;
  } catch (error) {
    redirectToSignupOnServerUnauthorized({ error, isServer, route });
    throw error;
  } finally {
    eject();
  }
}

export const GET = async ({
  route,
  authorization=true,
  isServer=false
}:IGET) => {
  const eject = authorization ? tokenInterceptor(isServer) : () => {};

  try {
    const response = await api.get(
      route,
      {headers: {"Content-Type": "application/json"}}
    );

    return response.data;
  } catch (error) {
    redirectToSignupOnServerUnauthorized({ error, isServer, route });
    throw error;
  } finally {
    eject();
  }
}

export const PUT = async ({
  route,
  data,
  authorization=true,
  isFormData=false
}:IPUT) => {
  const eject = authorization ? tokenInterceptor() : () => {};

  try {
    const response = await api.put(
      route,
      data,
      {headers: {"Content-Type": isFormData ? "multipart/form-data" : "application/json"}}
    );

    return response.data;
  } finally {
    eject();
  }
}

export const DELETE = async ({
  route,
  authorization=true
}:IDELETE) => {
  const eject = authorization ? tokenInterceptor() : () => {};

  try {
    const response = await api.delete(
      route
    );

    return response.data;
  } finally {
    eject();
  }
}