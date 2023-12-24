import {Priority} from "@/types/priority";

export interface TaskUpdateRequest {
  description: string | null,
  isReminderSet: boolean | null,
  isTaskOpen: boolean | null,
  priority: Priority | null
}
