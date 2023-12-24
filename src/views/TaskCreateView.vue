<script setup lang="ts">

import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskCreateComponent from "@/components/TaskCreateComponent.vue";
import {TaskCreateRequest} from "@/types/taskCreateRequest";
import {taskService} from "@/services/taskApi";
import {useTaskNavigation} from '@/composables/useTaskNavigation';


const {handleTaskTypeSelected, navigateToTasksView, logoClicked} = useTaskNavigation();

const createTask = (task: TaskCreateRequest) => {
  createNewTask(task);
  navigateToTasksView();
};

function createNewTask(request: TaskCreateRequest) {
  taskService.createTask(request)
    .catch((err) => {
      console.log('error creating task: ' + err)
      throw new Error(`Failed to create new task: ${err.message}`);
    });
}

</script>

<template>

  <NavbarComponent @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskCreateComponent @create-new-task="createTask"/>
  </AppBackgroundComponent>
</template>

<style scoped>

</style>
