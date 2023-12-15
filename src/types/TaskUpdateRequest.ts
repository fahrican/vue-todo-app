import {Priority} from "@/types/Priority";

export interface TaskUpdateRequest {
  description: string | null,
  isReminderSet: boolean | null,
  isTaskOpen: boolean | null,
  priority: Priority | null
}
