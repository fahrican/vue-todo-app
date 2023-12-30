import {test, expect} from 'vitest';
import {reactive, ref} from 'vue';
import {taskService} from "../../src/services/taskApi";
import {mockTaskFetchResponse} from "./mockResponse";
import {fetchTasks} from "../../src/views/TasksView";

// Assuming tasks and isLoading are reactive variables in your component
const tasks = reactive([]);
const isLoading = ref(false);


test('fetchTasks fills tasks array with mockTasksResponse', async () => {
  // Mock taskService.getTasks to return mockTasksResponse
  taskService.getTasks = async () => ({data: mockTaskFetchResponse});

  // Call fetchTasks
  await fetchTasks('testType');

  // Assert tasks array contains mockTasksResponse
  expect(tasks).toEqual(mockTaskFetchResponse);
});
