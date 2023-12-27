import api from "@/services/api";
import {AxiosResponse} from "axios";
import {TaskCreateRequest, TaskUpdateRequest} from "@/types/taskDto";

interface TaskService {
  getTasks: (status: string) => Promise<AxiosResponse>;
  createTask: (data: TaskCreateRequest) => Promise<AxiosResponse>;
  deleteTask: (id: number) => Promise<AxiosResponse>;
  updateTask: (id: number, data: TaskUpdateRequest) => Promise<AxiosResponse>;
}


export const taskService: TaskService = {
  getTasks(status: string) {
    return api.get(`/tasks?status=${status}`);
  },
  createTask(data: TaskCreateRequest) {
    return api.post('/tasks', data)
  },
  deleteTask(id: number) {
    return api.delete(`/tasks/${id}`)
  },
  updateTask(id: number, data: TaskUpdateRequest) {
    return api.patch(`/tasks/${id}`, data)
  }
}
