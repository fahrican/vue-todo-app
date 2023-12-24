import {Priority} from "@/types/priority";

export interface TaskFetchResponse {
  id: number,
  description: string,
  isReminderSet: boolean | null,
  isTaskOpen: boolean | null,
  createdOn: string | null,
  priority: Priority | null
}
