<script setup lang="ts">
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskCreateComponent from "@/components/TaskCreateComponent.vue";
import {taskService} from "@/services/taskApi";
import {useTaskNavigation} from '@/composables/useTaskNavigation';
import {TaskCreateRequest} from "@/types/taskDto";
import {ref} from "vue";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";

const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const isLoading = ref(false);

const createTask = (task: TaskCreateRequest) => {
  createNewTask(task);
  logoClicked();
};

async function createNewTask(request: TaskCreateRequest): Promise<void> {
  isLoading.value = true;
  await taskService.createTask(request)
    .then(() => {
      isLoading.value = false;
    })
    .catch((err) => {
      console.log('error creating task: ' + err);
      throw new Error(`Failed to create new task: ${err.message}`);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <NavbarComponent @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskCreateComponent @create-new-task="createTask"/>
    <SpinningLoadingComponent :is-loading="isLoading"/>
  </AppBackgroundComponent>
</template>

