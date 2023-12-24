<script setup lang="ts">
import {onMounted, reactive} from "vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskDetailCardComponent from "@/components/TaskDetailCardComponent.vue";
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import {useTaskNavigation} from '@/composables/useTaskNavigation';
import {useTaskStore} from "@/store/taskStore";
import {TaskFetchResponse} from "@/types/taskDto";

const props = defineProps({
  id: String
});

const task = reactive<TaskFetchResponse>({
  id: 0,
  description: '',
  isReminderSet: null,
  isTaskOpen: null,
  createdOn: null,
  priority: null
})

const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const taskStore = useTaskStore();

onMounted(showTaskDetails);

function showTaskDetails() {
  Object.assign(task, taskStore.taskToEdit);
}
</script>

<template>
  <NavbarComponent @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskDetailCardComponent :task="task"/>
  </AppBackgroundComponent>
</template>
