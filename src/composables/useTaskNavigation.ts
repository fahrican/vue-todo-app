import {TaskState} from '@/types/TaskState';
import router from '@/router';
import {OPEN_TASKS, CLOSED_TASKS, ALL_TASKS, HOME_VIEW} from '@/constants/constants';
import {useTaskStore} from "@/store/taskStore";

export function useTaskNavigation() {

  const taskStore = useTaskStore();

  const handleTaskTypeSelected = (taskType: string): void => {
    switch (taskType) {
      case OPEN_TASKS:
        taskStore.selectedTaskType = TaskState[TaskState.OPEN];
        break;
      case CLOSED_TASKS:
        taskStore.selectedTaskType = TaskState[TaskState.CLOSED];
        break;
      case ALL_TASKS:
        taskStore.selectedTaskType = '';
        break;
    }
    navigateToTasksView();
  };

  const navigateToTasksView = (): void => {
    router.push({name: HOME_VIEW, query: {typeOfTask: taskStore.selectedTaskType}}).then() ;
  };

  const logoClicked = (): void => {
    taskStore.selectedTaskType = TaskState[TaskState.OPEN];
    router.push({name: HOME_VIEW}).then();
  };

  return {
    handleTaskTypeSelected,
    navigateToTasksView,
    logoClicked,
  };
}
