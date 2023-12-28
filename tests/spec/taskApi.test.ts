import {describe, expect, it} from 'vitest';
import {taskService} from '../../src/services/taskApi';
import {Priority, TaskCreateRequest, TaskUpdateRequest} from '../../src/types/taskDto';

describe('taskService', () => {
  it('fetches tasks', async () => {
    const response = await taskService.getTasks('open');
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(2);
  });

  it('creates a task', async () => {
    const request: TaskCreateRequest = {
      description: 'workout',
      isReminderSet: true,
      isTaskOpen: true,
      priority: Priority[Priority.MEDIUM]
    }
    const response = await taskService.createTask(request);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(request);
  });

  it('deletes a task', async () => {
    const response = await taskService.deleteTask(9);
    expect(response.status).toBe(204);
  });

  it('updates a task', async () => {
    const request: TaskUpdateRequest = {
      description: 'buy groceries',
      isTaskOpen: true,
      isReminderSet: false,
      priority: Priority[Priority.HIGH],
    };
    const response = await taskService.updateTask(4, request);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(request);
  });
});
