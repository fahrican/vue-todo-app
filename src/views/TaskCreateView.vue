<script setup lang="ts">
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskCreateComponent from "@/components/TaskCreateComponent.vue";
import {taskService} from "@/services/taskApi";
import {useTaskNavigation} from '@/composables/useTaskNavigation';
import {TaskCreateRequest} from "@/types/taskDto";
import {ref} from "vue";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";
import {AxiosError} from "axios";
import logRequestError from "@/composables/logRequestError";
import ErrorDialogComponent from "@/components/ErrorDialogComponent.vue";


const {handleTaskTypeSelected, logoClicked, navigateToTasksView} = useTaskNavigation();
const isLoading = ref(false);
const isNetworkError = ref(false);
const axiosError = ref<AxiosError>();


async function createTask(request: TaskCreateRequest): Promise<void> {
  isLoading.value = true;
  isNetworkError.value = false;
  await taskService.createTask(request)
    .then(() => {
      isLoading.value = false;
      navigateToTasksView();
    })
    .catch((err: AxiosError | unknown) => {
      logRequestError('createNewTask', err);
      axiosError.value = err instanceof AxiosError ? err : undefined;
      isNetworkError.value = true;
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
    <ErrorDialogComponent :model-value="isNetworkError" :axios-error="axiosError"/>
  </AppBackgroundComponent>
</template>

