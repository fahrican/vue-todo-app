import {Priority} from "@/types/Priority";

export interface TaskCreateRequest {
  description: string,
  isReminderSet: boolean,
  isTaskOpen: boolean,
  priority: Priority
}
