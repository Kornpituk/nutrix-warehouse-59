
export interface Role {
  id: string;
  name: string;
  description: string;
  usedInPermissions: number;
  isNew?: boolean;
}
