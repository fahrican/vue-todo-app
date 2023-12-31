import {describe, expect, it, vi} from 'vitest';
import {taskService} from "../../src/services/taskApi";
import {removeTask} from "../../src/composables/removeTask";
import {Ref, ref} from "vue";
import {AxiosError} from "axios";

vi.mock('../../src/services/taskApi', () => ({
  taskService: {
    deleteTask: vi.fn(),
  },
}));

describe('removeTask tests', () => {
  const id = 1;
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const fetchTasks = vi.fn();
  const taskType = 'completed';

  it('should handle the happy path correctly', async () => {
    taskService.deleteTask = async () => ({});

    await removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskType);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBe(null);
    expect(fetchTasks).toHaveBeenCalled();
  });

  it('should handle the error case correctly', async () => {
    const mockError = new Error('Network error');
    taskService.deleteTask = vi.fn(() => Promise.reject(mockError));

    await removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskType);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(mockError.message).toEqual('Network error');
  });
});
