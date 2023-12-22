<script setup lang="ts">

import {onMounted, reactive} from "vue";
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {taskService} from "@/services/TaskApi";
import NavbarComponent from "@/components/NavbarComponent.vue";
import TaskDetailCardComponent from "@/components/TaskDetailCardComponent.vue";
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import {useTaskNavigation} from '@/composables/useTaskNavigation';


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

onMounted(fetchTaskById);

async function fetchTaskById() {
  try {
    const response = await taskService.getTaskBydId(props.id);
    Object.assign(task, response.data);
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}

fetchTaskById()
</script>

<template>

  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskDetailCardComponent :task="task"/>
  </AppBackgroundComponent>

</template>
