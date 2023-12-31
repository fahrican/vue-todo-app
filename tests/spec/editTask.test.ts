import {describe, expect, it, vi} from 'vitest';
import {taskService} from "../../src/services/taskApi";
import {mockTaskFetchResponse, mockTaskUpdateRequest} from "./mockResponse";
import {getTasks} from "../../src/composables/getTasks";
import {editTask} from "../../src/composables/editTask";
import {AxiosError} from "axios";
import {ref, Ref} from "vue";


vi.mock('../../src/services/taskApi', () => ({
  taskService: {
    getTasks: vi.fn(),
  },
}));

describe('editTask tests', () => {
  const id = 1;
  const request = {title: 'New Task', completed: false};
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const navigateToTasksView = vi.fn();

  it('should handle the happy path correctly', async () => {
    taskService.updateTask = async () => ({data: mockTaskUpdateRequest});


    await editTask(id, request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBe(null);
  });

  it('should handle the error case correctly', async () => {
    const mockError = new Error('Network error');
    taskService.updateTask = vi.fn(() => Promise.reject(mockError));

    await editTask(id, request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    console.log('message' + mockError.message);
    console.log('axios' + axiosError.value);
    expect(mockError.message).toEqual('Network error');
    expect(navigateToTasksView).toHaveBeenCalled();
  });
});
