import { test, expect } from 'vitest';
import {reactive, ref} from 'vue';
import { mockTasksResponse } from './mockResponse';
import {taskService} from "../../src/services/taskApi";

// Assuming tasks and isLoading are reactive variables in your component
const tasks = reactive([]);
const isLoading = ref(false);

async function fetchTasks(taskType: string): Promise<void> {
  isLoading.value = true;
  tasks.length = 0;
  try {
    const response = await taskService.getTasks(taskType);
    tasks.splice(0, tasks.length, ...response.data);
  } catch (err) {
    console.error('Error loading tasks:', err);
  } finally {
    isLoading.value = false;
  }
}

test('fetchTasks fills tasks array with mockTasksResponse', async () => {
  // Mock taskService.getTasks to return mockTasksResponse
  taskService.getTasks = async () => ({ data: mockTasksResponse });

  // Call fetchTasks
  await fetchTasks('testType');

  // Assert tasks array contains mockTasksResponse
  expect(tasks).toEqual(mockTasksResponse);
});
