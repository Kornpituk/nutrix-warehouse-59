
export type NotificationType = "warning" | "danger" | "success" | "info";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}
