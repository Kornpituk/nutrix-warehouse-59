
export interface PermissionItem {
  CreatedAt: string; // ISO string format (date-time)
  CreatedBy: number | null;
  CreatedByName: string | null;
  Description: string | null;
  ModifiedAt: string | null;
  ModifiedBy: number | null;
  ModifiedByName: string | null;
  PermissionCode: string;
  PermissionId: number;
  PermissionName: string;
  UsedInRols: number;
}

export interface PermissionResponse {
  CreatedAt: string; // ISO string format (date-time)
  CreatedBy: number | null;
  CreatedByName: string | null;
  Description: string | null;
  ModifiedAt: string | null;
  ModifiedBy: number | null;
  ModifiedByName: string | null;
  PermissionCode: string;
  PermissionId: number;
  PermissionName: string;
  UsedInRols: number;
}

export interface PermissionNew {
  Description: string | null;
  PermissionCode: string;
  PermissionId: number;
  PermissionName: string;
  UsedInRols: number;
}
