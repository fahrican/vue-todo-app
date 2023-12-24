import { defineStore } from 'pinia'
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {TaskState} from "@/types/TaskState";

export const useTaskStore = defineStore('task', {
  state: () => ({
    taskToEdit: Object as TaskFetchResponse | unknown,
    selectedTaskType: TaskState[TaskState.OPEN],
  }),
  actions: {
    setTaskToEdit(task: TaskFetchResponse) {
      this.taskToEdit = task;
    },
    setSelectedTaskType(taskType: string) {
      this.selectedTaskType = taskType;
    },
  },
})
