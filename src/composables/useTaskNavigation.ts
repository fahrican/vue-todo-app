import router from '@/router';
import {OPEN_TASKS, CLOSED_TASKS, ALL_TASKS, HOME_VIEW} from '@/constants/constants';
import {useTaskStore} from "@/store/taskStore";
import {TaskState} from "@/types/taskDto";

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
    router.replace({name: HOME_VIEW}).then();
  };

  const logoClicked = (): void => {
    taskStore.selectedTaskType = TaskState[TaskState.OPEN];
    router.replace({name: HOME_VIEW}).then();
  };

  return {
    handleTaskTypeSelected,
    navigateToTasksView,
    logoClicked,
  };
}
