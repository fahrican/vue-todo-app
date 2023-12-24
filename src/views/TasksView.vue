<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>

  <AppBackgroundComponent>
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
  </AppBackgroundComponent>

</template>

<script lang="ts" setup>
import CardComponent from "@/components/CardComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {taskService} from "@/services/TaskApi";
import {TASK_DETAIL_VIEW, TASK_UPDATE_VIEW} from "@/constants/constants";
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import router from "@/router";
import TaskDeleteDialog from "@/components/TaskDeleteDialogComponent.vue";
import {useTaskStore} from "@/store/taskStore";
import {useTaskNavigation} from "@/composables/useTaskNavigation";


const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const tasks = reactive<TaskFetchResponse[]>([])
const selectedTaskType = ref('');
const selectedTaskId = ref(0);
const isDeleteDialogSelected = ref(false);
const selectedTaskDescription = ref('');
const taskStore = useTaskStore();

watch(() => taskStore.selectedTaskType, (newType) => {
  fetchTasks(newType);
});

onMounted(() => {
  fetchTasks(taskStore.selectedTaskType);
});

const openDeleteDialog = (task: { id: number, description: string }) => {
  selectedTaskId.value = task.id;
  selectedTaskDescription.value = task.description;
  isDeleteDialogSelected.value = true;
};

const handleCardClicked = (id: number) => {
  selectedTaskId.value = id;
  router.push({name: TASK_DETAIL_VIEW, params: {id: id.toString()}})
};

const deleteTask = (id: number) => {
  try {
    taskService.deleteTask(id).then(() => {
      fetchTasks(selectedTaskType.value);
    });
  } catch (err) {
    console.log('error deleting task: ' + err)
  }
};

const navigateToTaskUpdateView = (task: TaskFetchResponse) => {
  taskStore.setTaskToEdit(task);
  router.push({name: TASK_UPDATE_VIEW, params: {id: task.id.toString()}})
};

async function fetchTasks(taskType: string) {
  tasks.length = 0;
  try {
    let response = await taskService.getTasks(taskType);
    response?.data.forEach((task: TaskFetchResponse) => tasks.push(task));
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}

</script>
