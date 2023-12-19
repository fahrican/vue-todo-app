import {ref} from 'vue';
import {TaskState} from '@/types/TaskState';
import router from '@/router';
import {OPEN_TASKS, CLOSED_TASKS, ALL_TASKS, HOME_VIEW} from '@/constants/constants';

export function useTaskNavigation() {
  const selectedTaskType = ref(TaskState[TaskState.OPEN]);

  const handleTaskTypeSelected = (taskType: string) => {
    switch (taskType) {
      case OPEN_TASKS:
        selectedTaskType.value = TaskState[TaskState.OPEN];
        break;
      case CLOSED_TASKS:
        selectedTaskType.value = TaskState[TaskState.CLOSED];
        break;
      case ALL_TASKS:
        selectedTaskType.value = '';
        break;
    }
    navigateToTasksView();
  };

  const navigateToTasksView = () => {
    router.push({name: HOME_VIEW, query: {typeOfTask: selectedTaskType.value}});
  };

  const logoClicked = () => {
    router.push({name: HOME_VIEW});
  };

  return {
    selectedTaskType,
    handleTaskTypeSelected,
    navigateToTasksView,
    logoClicked,
  };
}
