import { defineStore } from 'pinia'
import {TaskFetchResponse} from "@/types/TaskFetchResponse";

export const useTaskStore = defineStore('task', {
  state: () => ({
    taskToEdit: Object as TaskFetchResponse | unknown,
  }),
  actions: {
    setTaskToEdit(task: TaskFetchResponse) {
      this.taskToEdit = task;
    },
  },
})
