import {Priority} from "@/types/priority";

export interface TaskCreateRequest {
  description: string,
  isReminderSet: boolean,
  isTaskOpen: boolean,
  priority: Priority
}
