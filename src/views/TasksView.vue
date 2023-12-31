<script lang="ts" setup>
import CardComponent from "@/components/CardComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {onMounted, ref, watch, watchEffect} from "vue";
import {TASK_DETAIL_VIEW, TASK_UPDATE_VIEW} from "@/constants/constants";
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import router from "@/router";
import TaskDeleteDialog from "@/components/TaskDeleteDialogComponent.vue";
import {useTaskStore} from "@/store/taskStore";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import {TaskFetchResponse} from "@/types/taskDto";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";
import ErrorDialogComponent from "@/components/ErrorDialogComponent.vue";
import {getTasks} from "@/composables/getTasks";
import {removeTask} from "@/composables/removeTask";


const {fetchTasks, tasks, isLoading, isNetworkError, axiosError} = getTasks();
const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const taskStore = useTaskStore();
const selectedTaskId = ref(0);
const isDeleteDialogSelected = ref(false);
const selectedTaskDescription = ref('');


onMounted(() => {
  fetchTasks(taskStore.selectedTaskType);
});

watch(() => taskStore.selectedTaskType, (newType) => {
  fetchTasks(newType);
});

watchEffect(() => {
  fetchTasks(taskStore.selectedTaskType);
});


const openDeleteDialog = (task: { id: number, description: string }) => {
  selectedTaskId.value = task.id;
  selectedTaskDescription.value = task.description;
  isDeleteDialogSelected.value = true;
};

const handleCardClicked = (id: number) => {
  router.push({name: TASK_DETAIL_VIEW, params: {id: id.toString()}}).then();
};

const navigateToTaskUpdateView = (task: TaskFetchResponse) => {
  taskStore.setTaskToEdit(task);
  router.push({name: TASK_UPDATE_VIEW, params: {id: task.id.toString()}}).then();
};

const deleteTask = (id: number) => {
  removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskStore.selectedTaskType);
};

</script>

<template>
  <NavbarComponent @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <AppBackgroundComponent>
    <ErrorDialogComponent :model-value="isNetworkError" :axios-error="axiosError"/>
    <CardComponent
      :tasks="tasks"
      @card-clicked="handleCardClicked"
      @delete-clicked="openDeleteDialog"
      @edit-clicked="navigateToTaskUpdateView"
    />
    <TaskDeleteDialog
      v-model="isDeleteDialogSelected"
      :taskDescription="selectedTaskDescription.valueOf()"
      @confirm-delete="deleteTask(selectedTaskId.valueOf())"
    />
    <SpinningLoadingComponent :is-loading="isLoading"/>
  </AppBackgroundComponent>
</template>
