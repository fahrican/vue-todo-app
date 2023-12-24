<script setup lang="ts">
import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import TaskUpdateComponent from "@/components/TaskUpdateComponent.vue";
import {taskService} from "@/services/taskApi";
import router from "@/router";
import {TaskUpdateRequest} from "@/types/taskDto";
import SpinningLoadingComponent from "@/components/SpinningLoadingComponent.vue";
import {ref} from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const {handleTaskTypeSelected, logoClicked, navigateToTasksView} = useTaskNavigation();
const isLoading = ref(false);

const clickedAbort = () => {
  router.back();
};

const editedTask = (id: number, request: TaskUpdateRequest) => {
  updateTask(id, request);
  navigateToTasksView();
};

async function updateTask(id: number, request: TaskUpdateRequest): Promise<void> {
  isLoading.value = true;
  await taskService.updateTask(id, request).then(() => {
    isLoading.value = false;
  }).catch((err) => {
    console.log('error updating task: ' + err)
    throw new Error(`Failed to update task: ${err.message}`);
  }).finally(() => {
    isLoading.value = false;
  });
}
</script>

<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskUpdateComponent @updated-task="editedTask" @abort-clicked="clickedAbort"/>
    <SpinningLoadingComponent :is-loading="isLoading"/>
  </AppBackgroundComponent>
</template>
