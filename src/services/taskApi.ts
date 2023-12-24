import Api from "@/services/api";
import {TaskCreateRequest} from "@/types/taskCreateRequest";
import {TaskUpdateRequest} from "@/types/taskUpdateRequest";
import {AxiosResponse} from "axios";

interface TaskService {
  getTasks: (status: string) => Promise<AxiosResponse>;
  createTask: (data: TaskCreateRequest) => Promise<AxiosResponse>;
  deleteTask: (id: number) => Promise<AxiosResponse>;
  updateTask: (id: number, data: TaskUpdateRequest) => Promise<AxiosResponse>;
}


export const taskService: TaskService = {
  getTasks(status: string) {
    return Api().get(`/tasks?status=${status}`)
  },
  createTask(data: TaskCreateRequest) {
    return Api().post('/tasks', data)
  },
  deleteTask(id: number) {
    return Api().delete(`/tasks/${id}`)
  },
  updateTask(id: number, data: TaskUpdateRequest) {
    return Api().patch(`/tasks/${id}`, data)
  }
}