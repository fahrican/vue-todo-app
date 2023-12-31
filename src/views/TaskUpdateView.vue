<script setup lang="ts">
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import TaskUpdateComponent from "@/components/TaskUpdateComponent.vue";
import router from "@/router";
import {TaskUpdateRequest} from "@/types/taskDto";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";
import {ref} from "vue";
import ErrorDialogComponent from "@/components/ErrorDialogComponent.vue";
import {AxiosError} from "axios";
import {editTask} from "@/composables/editTask";


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

const updateTask = (id: number, request: TaskUpdateRequest) => {
  editTask(id, request, isLoading, isNetworkError, axiosError, navigateToTasksView);
};

</script>

<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskUpdateComponent @updated-task="updateTask" @abort-clicked="clickedAbort"/>
    <SpinningLoadingComponent :is-loading="isLoading"/>
    <ErrorDialogComponent :model-value="isNetworkError" :axios-error="axiosError"/>
  </AppBackgroundComponent>
</template>
