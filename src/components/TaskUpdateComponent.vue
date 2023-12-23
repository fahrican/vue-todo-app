<script setup lang="ts">

import {reactive, ref} from "vue";
import {TaskUpdateRequest} from "@/types/TaskUpdateRequest";
import {useTaskStore} from "@/store/taskStore";
import {Priority} from "@/types/Priority";
import {useField} from "vee-validate";


const priority = ref([
  Priority[Priority.LOW],
  Priority[Priority.MEDIUM],
  Priority[Priority.HIGH],
]);
const taskStore = useTaskStore();
const request = reactive<TaskUpdateRequest>({
  description: taskStore.taskToEdit.description,
  isReminderSet: taskStore.taskToEdit.isReminderSet,
  isTaskOpen: taskStore.taskToEdit.isTaskOpen,
  priority: taskStore.taskToEdit.priority,
});
const description = useField('description');
const emit = defineEmits(['updated-task', 'abort-clicked']);


const handleSubmit = () => {
  if (request.description.length >= 3) {
    emit('updated-task', taskStore.taskToEdit.id, request);
  } else {
    description.errorMessage.value = 'Description needs to be at least 3 characters.';
  }
};

const handleReset = () => {
  emit('abort-clicked');
};

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="request.description"
      :counter="10"
      :error-messages="description.errorMessage.value"
      label="Description"
    />

    <v-checkbox
      v-model="request.isReminderSet"
      label="Reminder"
      type="checkbox"
    ></v-checkbox>

    <v-checkbox
      v-model="request.isTaskOpen"
      label="Open"
      type="checkbox"
    ></v-checkbox>

    <v-select
      v-model="request.priority"
      :items="priority"
      label="Priority"
    ></v-select>

    <v-btn class="mb-4 clear-btn" @click="handleReset">abort</v-btn>

    <v-btn class="mb-4 submit-btn" type="submit">update</v-btn>

  </form>
</template>
