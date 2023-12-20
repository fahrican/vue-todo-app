<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>

  <AppBackgroundComponent>
    <CardComponent
      :tasks="tasks"
      @card-clicked="handleCardClicked"
      @delete-clicked="openDeleteDialog"
    />
    <TaskDeleteDialog v-model="isDeleteDialogSelected" @confirm-delete="deleteTask(selectedTaskId.valueOf())"/>
  </AppBackgroundComponent>

</template>

<script lang="ts" setup>
import CardComponent from "@/components/CardComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {reactive, ref, onMounted} from "vue";
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {TaskState} from "@/types/TaskState";
import {taskService} from "@/services/TaskApi";
import {ALL_TASKS, CLOSED_TASKS, HOME_VIEW, OPEN_TASKS, TASK_DETAIL_VIEW} from "@/constants/constants";
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import router from "@/router";
import {useRoute} from 'vue-router';
import TaskDeleteDialog from "@/components/TaskDeleteDialog.vue";


const tasks = reactive<TaskFetchResponse[]>([])
const selectedTaskType = ref('');
const selectedTaskId = ref(0);
const route = useRoute();
const isDeleteDialogSelected = ref(false);


onMounted(() => {
  if (typeof route.query.typeOfTask === 'string') {
    fetchTasks(route.query.typeOfTask);
  } else {
    fetchTasks(TaskState[TaskState.OPEN]);
  }
});

const openDeleteDialog = (id: number) => {
  console.log('openDeleteDialog called with id:', id);
  selectedTaskId.value = id;
  isDeleteDialogSelected.value = true;
  console.log('openDeleteDialog: ', isDeleteDialogSelected.value);
};

const handleCardClicked = (id: number) => {
  selectedTaskId.value = id;
  router.push({name: TASK_DETAIL_VIEW, params: {id: id.toString()}})
};


const handleTaskTypeSelected = (taskType: string) => {
  switch (taskType) {
    case OPEN_TASKS:
      selectedTaskType.value = TaskState[TaskState.OPEN];
      break;
    case CLOSED_TASKS:
      selectedTaskType.value = TaskState[TaskState.CLOSED];
      break;
    case ALL_TASKS:
      selectedTaskType.value = '';
      break;
  }
  fetchTasks(selectedTaskType.value);
};

const logoClicked = () => {
  route.query.typeOfTask = TaskState[TaskState.OPEN];
  router.push({name: HOME_VIEW});
  fetchTasks(TaskState[TaskState.OPEN])
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
