<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {taskService} from "@/services/TaskApi";
import {TaskState} from "@/types/TaskState";
import {ALL_TASKS, CLOSED_TASKS, OPEN_TASKS} from "@/constants/constants";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskDetailCardComponent from "@/components/TaskDetailCardComponent.vue";
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import router from "@/router";


const props = defineProps({
  id: Number
});

const selectedTaskType = ref(TaskState[TaskState.OPEN]);

const task = reactive<TaskFetchResponse>({
  id: 0,
  description: '',
  isReminderSet: null,
  isTaskOpen: null,
  createdOn: null,
  priority: null
})

onMounted(fetchTaskById);

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
  console.log("task detail: " + selectedTaskType.value);
  router.push({name: 'Home', query: {typeOfTask: selectedTaskType.value}});
};

async function fetchTaskById() {
  try {
    const response = await taskService.getTaskBydId(props.id);
    Object.assign(task, response.data);
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}

fetchTaskById()
</script>

<template>

  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected"/>
  <AppBackgroundComponent>
    <TaskDetailCardComponent :task="task"/>
  </AppBackgroundComponent>

</template>
