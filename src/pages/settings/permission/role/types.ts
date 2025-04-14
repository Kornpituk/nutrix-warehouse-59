
export interface Role {
  id: string;
  name: string;
  description: string;
  usedInPermissions: number;
  isNew?: boolean;
  permissions?: string[]; // เพิ่มเพื่อเก็บรายการ ID ของสิทธิ์ที่เชื่อมโยงกับบทบาทนี้
}

export interface RoleFormData {
  id?: string;
  name: string;
  description: string;
}
