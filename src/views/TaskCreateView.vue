<script setup lang="ts">

import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskCreateComponent from "@/components/TaskCreateComponent.vue";
import {TaskCreateRequest} from "@/types/TaskCreateRequest";
import {taskService} from "@/services/TaskApi";
import {useTaskNavigation} from '@/composables/useTaskNavigation';


const {handleTaskTypeSelected, navigateToTasksView, logoClicked} = useTaskNavigation();

const createTask = (task: TaskCreateRequest) => {
  createNewTask(task);
  navigateToTasksView();
};

async function createNewTask(request: TaskCreateRequest) {
  try {
    let response = await taskService.createTask(request);
    console.log(response.data);
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}

</script>

<template>

  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskCreateComponent @create-new-task="createTask"/>
  </AppBackgroundComponent>
</template>

<style scoped>

</style>
