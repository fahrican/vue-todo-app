<script setup lang="ts">
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskCreateComponent from "@/components/TaskCreateComponent.vue";
import {useTaskNavigation} from '@/composables/useTaskNavigation';
import {TaskCreateRequest} from "@/types/taskDto";
import {ref} from "vue";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";
import {AxiosError} from "axios";
import ErrorDialogComponent from "@/components/ErrorDialogComponent.vue";
import {generateTask} from "@/composables/generateTask";


const {handleTaskTypeSelected, logoClicked, navigateToTasksView} = useTaskNavigation();
const isLoading = ref(false);
const isNetworkError = ref(false);
const axiosError = ref<AxiosError>();


const createTask = (request: TaskCreateRequest) => {
  generateTask(request, isLoading, isNetworkError, axiosError, navigateToTasksView);
};

</script>

<template>
  <NavbarComponent @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskCreateComponent @create-new-task="createTask"/>
    <SpinningLoadingComponent :is-loading="isLoading"/>
    <ErrorDialogComponent :model-value="isNetworkError" :axios-error="axiosError"/>
  </AppBackgroundComponent>
</template>

