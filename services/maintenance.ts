import { MaintenanceResponse, VersionResponse } from "@/types/maintenance";
import { API_HOST } from "./host";
import { api } from "@/utils/api";

export function getMaintenance(): Promise<MaintenanceResponse> {
  return api.get(`${API_HOST}/maintenance`);
}

export function getVersion(): Promise<VersionResponse> {
  return api.get(`${API_HOST}/version`);
}
