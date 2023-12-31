import {describe, expect, it, vi} from 'vitest';
import {taskService} from "../../src/services/taskApi";
import {generateTask} from "../../src/composables/generateTask";
import {Ref, ref} from "vue";
import {AxiosError} from "axios";
import {mockTaskCreateRequest, mockTaskUpdateRequest} from "./mockResponse";

vi.mock('../../src/services/taskApi', () => ({
  taskService: {
    createTask: vi.fn(),
  },
}));

describe('generateTask tests', () => {
  const request = { title: 'New Task', completed: false };
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const navigateToTasksView = vi.fn();

  it('should handle the happy path correctly', async () => {
    taskService.createTask = async () => ({data: mockTaskCreateRequest});

    await generateTask(request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBe(null);
    expect(navigateToTasksView).toHaveBeenCalled();
  });

  it('should handle the error case correctly', async () => {
    const mockError = new Error('Network error');
    taskService.createTask = vi.fn(() => Promise.reject(mockError));

    await generateTask(request, isLoading, isNetworkError, axiosError, navigateToTasksView);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(mockError.message).toEqual('Network error');
  });
});
