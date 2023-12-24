<script setup lang="ts">
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import TaskUpdateComponent from "@/components/TaskUpdateComponent.vue";
import {taskService} from "@/services/taskApi";
import router from "@/router";
import {TaskUpdateRequest} from "@/types/taskDto";

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

function updateTask(id: number, request: TaskUpdateRequest): void {
  taskService.updateTask(id, request).catch((err) => {
    console.log('error updating task: ' + err)
    throw new Error(`Failed to update task: ${err.message}`);
  });
}
</script>

<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskUpdateComponent @updated-task="editedTask" @abort-clicked="clickedAbort"/>
  </AppBackgroundComponent>
</template>
