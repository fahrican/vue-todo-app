import {TaskState} from '@/types/TaskState';
import router from '@/router';
import {OPEN_TASKS, CLOSED_TASKS, ALL_TASKS, HOME_VIEW} from '@/constants/constants';
import {useTaskStore} from "@/store/taskStore";

export function useTaskNavigation() {

  const taskStore = useTaskStore();

  const handleTaskTypeSelected = (taskType: string) => {
    switch (taskType) {
      case OPEN_TASKS:
        taskStore.selectedTaskType = TaskState[TaskState.OPEN];
        console.log("handleTaskTypeSelected:" + taskStore.selectedTaskType);
        break;
      case CLOSED_TASKS:
        taskStore.selectedTaskType = TaskState[TaskState.CLOSED];
        console.log("handleTaskTypeSelected:" + taskStore.selectedTaskType);
        break;
      case ALL_TASKS:
        taskStore.selectedTaskType = '';
        console.log("handleTaskTypeSelected:" + taskStore.selectedTaskType);
        break;
    }
    navigateToTasksView();
  };

  const navigateToTasksView = () => {
    router.push({name: HOME_VIEW, query: {typeOfTask: taskStore.selectedTaskType}});
  };

  const logoClicked = () => {
    router.push({name: HOME_VIEW});
  };

  return {
    handleTaskTypeSelected,
    navigateToTasksView,
    logoClicked,
  };
}
