<script setup lang="ts">
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import TaskUpdateComponent from "@/components/TaskUpdateComponent.vue";
import {taskService} from "@/services/taskApi";
import router from "@/router";
import {TaskUpdateRequest} from "@/types/taskDto";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";
import {ref} from "vue";
import ErrorDialogComponent from "@/components/ErrorDialogComponent.vue";
import {AxiosError} from "axios";
import logRequestError from "@/composables/logRequestError";


defineProps({
  id: {
    type: String,
    required: true
  }
});

const {handleTaskTypeSelected, logoClicked, navigateToTasksView} = useTaskNavigation();
const isLoading = ref(false);
const isNetworkError = ref(false);
const axiosError = ref<AxiosError>();

const clickedAbort = () => {
  router.back();
};

async function updateTask(id: number, request: TaskUpdateRequest): Promise<void> {
  isLoading.value = true;
  isNetworkError.value = false;
  await taskService.updateTask(id, request)
    .then(() => {
      isLoading.value = false;
      navigateToTasksView();
    })
    .catch((err: AxiosError | unknown) => {
      logRequestError('updateTask', err);
      axiosError.value = err instanceof AxiosError ? err : undefined;
      isNetworkError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskUpdateComponent @updated-task="updateTask" @abort-clicked="clickedAbort"/>
    <SpinningLoadingComponent :is-loading="isLoading"/>
    <ErrorDialogComponent :model-value="isNetworkError" :axios-error="axiosError"/>
  </AppBackgroundComponent>
</template>
