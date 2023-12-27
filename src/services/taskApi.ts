import {AxiosResponse} from "axios";
import {TaskCreateRequest, TaskUpdateRequest} from "@/types/taskDto";
import axios, {AxiosInstance} from "axios";


const baseURL = 'https://backend4frontend-dnfm.onrender.com/api/v1/';
const api: AxiosInstance = axios.create({baseURL});

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
