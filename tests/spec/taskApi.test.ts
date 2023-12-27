import { describe, it, expect } from 'vitest';
import { taskService } from '../../src/services/taskApi';
import { TaskCreateRequest, TaskUpdateRequest } from '../../src/types/taskDto';

describe('taskService', () => {
  it('fetches tasks', async () => {
    const response = await taskService.getTasks('open');
    expect(response.status).toBe(200);
    // Additional assertions as needed
  });

  it('creates a task', async () => {
    const data: TaskCreateRequest = { description: 'Test task', isTaskOpen: true, priority: 1, isReminderSet: false };
    const response = await taskService.createTask(data);
    expect(response.status).toBe(201);
    // Additional assertions as needed
  });

  it('deletes a task', async () => {
    const response = await taskService.deleteTask(1); // Example task ID
    expect(response.status).toBe(204);
    // Additional assertions as needed
  });

  it('updates a task', async () => {
    const data: TaskUpdateRequest = { description: 'Test task', isTaskOpen: true, priority: 1, isReminderSet: false };
    const response = await taskService.updateTask(1, data); // Example task ID
    expect(response.status).toBe(200);
    // Additional assertions as needed
  });
});
