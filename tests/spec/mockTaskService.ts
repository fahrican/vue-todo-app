import { vi } from 'vitest';

export const mockTaskService = () => {
  vi.mock('../../src/services/taskApi', () => ({
    taskService: {
      getTasks: vi.fn(),
      // Add other methods as needed
    },
  }));
};
