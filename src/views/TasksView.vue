<script lang="ts" setup>
import CardComponent from "@/components/CardComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {taskService} from "@/services/taskApi";
import {TASK_DETAIL_VIEW, TASK_UPDATE_VIEW} from "@/constants/constants";
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import router from "@/router";
import TaskDeleteDialog from "@/components/TaskDeleteDialogComponent.vue";
import {useTaskStore} from "@/store/taskStore";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import {TaskFetchResponse} from "@/types/taskDto";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";
import {AxiosError} from "axios";
import ErrorDialogComponent from "@/components/ErrorDialogComponent.vue";


const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const tasks = reactive<TaskFetchResponse[]>([])
const taskStore = useTaskStore();
const selectedTaskId = ref(0);
const isDeleteDialogSelected = ref(false);
const selectedTaskDescription = ref('');
const isLoading = ref(false);
const isNetworkError = ref(false);
const axiosError = ref<AxiosError>();


onMounted(() => {
  fetchTasks(taskStore.selectedTaskType);
});

watch(() => taskStore.selectedTaskType, (newType) => {
  fetchTasks(newType);
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

async function fetchTasks(taskType: string): Promise<void> {
  isLoading.value = true;
  tasks.length = 0;
  try {
    const response = await taskService.getTasks(taskType);
    tasks.splice(0, tasks.length, ...response.data);
    isNetworkError.value = false;
  } catch (err: AxiosError | unknown) {
    console.error(`Error loading tasks: ${err instanceof Error ? err.message : String(err)}`);
    axiosError.value = err instanceof AxiosError ? err : undefined;
    isNetworkError.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function deleteTask(id: number): Promise<void> {
  isLoading.value = true;
  await taskService.deleteTask(id).then(() => {
    fetchTasks(taskStore.selectedTaskType);
    isLoading.value = false;
  }).catch((err: AxiosError) => {
    axiosError.value = err;
    console.log('Type of error:', err.name);
    console.log('error deleting task: ' + err);
  }).finally(() => {
    isLoading.value = false;
  });
}

fetchTasks(taskStore.selectedTaskType);
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
