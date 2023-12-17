<script setup lang="ts">

import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {ALL_TASKS, CLOSED_TASKS, HOME_VIEW, OPEN_TASKS} from "@/constants/constants";
import {TaskState} from "@/types/TaskState";
import router from "@/router";
import {ref} from "vue";
import TaskCreateComponent from "@/components/TaskCreateComponent.vue";


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

</script>

<template>

  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskCreateComponent/>
  </AppBackgroundComponent>
</template>

<style scoped>

</style>
