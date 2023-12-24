<script setup lang="ts">

import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import TaskUpdateComponent from "@/components/TaskUpdateComponent.vue";
import {TaskUpdateRequest} from "@/types/taskUpdateRequest";
import {taskService} from "@/services/taskApi";
import router from "@/router";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const {handleTaskTypeSelected, logoClicked, navigateToTasksView} = useTaskNavigation();

const clickedAbort = () => {
  router.back();
};

const editedTask = (id: number, request: TaskUpdateRequest) => {
  updateTask(id, request);
  navigateToTasksView();
};

async function updateTask(id: number, request: TaskUpdateRequest) {
  try {
    await taskService.updateTask(id, request);
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}
</script>

<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskUpdateComponent @updated-task="editedTask" @abort-clicked="clickedAbort"/>
  </AppBackgroundComponent>
</template>
