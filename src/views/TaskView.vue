<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected"/>
  <CardComponent :tasks="tasks" />
</template>

<script lang="ts" setup>
import CardComponent from "@/components/CardComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {reactive, ref, onMounted} from "vue";
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {TaskState} from "@/types/TaskState";
import {taskService} from "@/services/TaskApi";
import {ALL_TASKS, CLOSED_TASKS, OPEN_TASKS} from "@/constants/constants";


const tasks = reactive<TaskFetchResponse[]>([])
const selectedTaskType = ref(TaskState[TaskState.OPEN]);

onMounted(fetchTasks);

const handleTaskTypeSelected = (taskType: string) => {
  tasks.length = 0;
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
  fetchTasks()
};

async function fetchTasks() {
  try {
    let response = await taskService.getTasks(selectedTaskType.value);
    response?.data.forEach((task: TaskFetchResponse) => tasks.push(task));
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}

</script>
