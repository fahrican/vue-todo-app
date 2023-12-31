import {describe, expect, it, vi} from 'vitest';
import {taskService} from "../../src/services/taskApi";
import {mockTaskFetchResponse} from "./mockResponse";
import {getTasks} from "../../src/composables/getTasks";
import {AxiosError} from "axios";


vi.mock('../../src/services/taskApi', () => ({
  taskService: {
    getTasks: vi.fn(),
  },
}));

describe('getTasks tests', () => {
  it('handles error in fetchTasks', async () => {
    // Create a mock error
    const mockError = new AxiosError('Network Error');

    // Replace getTasks with a function that rejects with the mock error
    taskService.getTasks = vi.fn(() => Promise.reject(mockError));

    // Use the composable function
    const {fetchTasks, isLoading, isNetworkError, axiosError} = getTasks();

    // Call fetchTasks and expect it to handle the error
    await fetchTasks('testType');

    // Check the states of isLoading, isNetworkError, and axiosError
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
  });

  it('fetchTasks fills tasks array with mockTasksResponse', async () => {
    // Mock taskService.getTasks to return mockTasksResponse
    taskService.getTasks = async () => ({data: mockTaskFetchResponse});

    // Call fetchTasks
    const {fetchTasks, tasks} = getTasks();
    await fetchTasks('testType');


    // Assert tasks array contains mockTasksResponse
    expect(tasks).toEqual(mockTaskFetchResponse);
  });
});



