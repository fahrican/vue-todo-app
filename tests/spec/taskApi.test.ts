import {describe, expect, it} from 'vitest';
import {taskService} from '../../src/services/taskApi';
import {Priority, TaskCreateRequest, TaskUpdateRequest} from '../../src/types/taskDto';
import {HTTP_STATUS} from "../../src/constants/constants";
import {rest} from "msw";
import {server} from "../../src/setupTests";

describe('taskService Unit Tests', () => {
  it('fetches tasks', async () => {
    const response = await taskService.getTasks('open');
    expect(response.status).toBe(HTTP_STATUS.OK);
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
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.data).toEqual(request);
  });

  it('deletes a task', async () => {
    const response = await taskService.deleteTask(9);
    expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
  });

  it('updates a task', async () => {
    const request: TaskUpdateRequest = {
      description: 'buy groceries',
      isTaskOpen: true,
      isReminderSet: false,
      priority: Priority[Priority.HIGH],
    };
    const response = await taskService.updateTask(4, request);
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.data).toEqual(request);
  });

  it('handles 400 error on task creation', async () => {
    server.use(
      rest.post("https://backend4frontend-dnfm.onrender.com/api/v1/tasks", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: "Bad Request" }));
      })
    );

    const request: TaskCreateRequest = {
      description: 'workout',
      isReminderSet: true,
      isTaskOpen: true,
      priority: Priority.MEDIUM
    };

    let errorResponse;
    try {
      await taskService.createTask(request);
    } catch (error) {
      errorResponse = error;
    }

    expect(errorResponse).toBeDefined();
    expect(errorResponse.response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(errorResponse.response.data.message).toBe("Bad Request");
  });

  it('handles 500 error on task creation', async () => {
    server.use(
      rest.post("https://backend4frontend-dnfm.onrender.com/api/v1/tasks", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
      })
    );

    const request: TaskCreateRequest = {
      description: 'workout',
      isReminderSet: true,
      isTaskOpen: true,
      priority: Priority.MEDIUM
    };

    let errorResponse;
    try {
      await taskService.createTask(request);
    } catch (error) {
      errorResponse = error;
    }

    expect(errorResponse).toBeDefined();
    expect(errorResponse.response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(errorResponse.response.data.message).toBe("Internal Server Error");
  });
});
