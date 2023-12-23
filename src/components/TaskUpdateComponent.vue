<script setup lang="ts">

import {reactive, ref} from "vue";
import {useField, useForm} from "vee-validate";
import {Priority} from "@/types/Priority";
import {TaskUpdateRequest} from "@/types/TaskUpdateRequest";
import {useTaskStore} from "@/store/taskStore";


const {handleSubmit, handleReset} = useForm({
  validationSchema: {
    description(value) {
      if (value?.length >= 3) return true
      return 'Description needs to be at least 3 characters.'
    },
    select(value) {
      if (value) return true
      return 'Select a priority!.'
    },
  },
})
const description = useField('description');
const select = useField('select');
const isReminderSet = useField('isReminderSet');
const isTaskOpen = useField('isTaskOpen');
const priority = ref([
  Priority[Priority.LOW],
  Priority[Priority.MEDIUM],
  Priority[Priority.HIGH],
]);
const request = reactive<TaskUpdateRequest>({
  description: description.value.value,
  priority: select.value.value,
  isReminderSet: isReminderSet.value.value,
  isTaskOpen: isTaskOpen.value.value,
});
const emit = defineEmits(['updated-task']);
const taskStore = useTaskStore();


const submit = handleSubmit(values => {
  request.description = values.description;
  request.isReminderSet = values.isReminderSet !== undefined;
  request.isTaskOpen = values.isTaskOpen !== undefined;
  request.priority = values.select;
  emit('updated-task', request);
})

</script>

<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="taskStore.taskToEdit.description"
      :counter="10"
      :error-messages="description.errorMessage.value"
      label="Description"
    />

    <v-checkbox
      v-model="taskStore.taskToEdit.isReminderSet"
      :error-messages="isReminderSet.errorMessage.value"
      label="Reminder"
      type="checkbox"
    ></v-checkbox>

    <v-checkbox
      v-model="taskStore.taskToEdit.isTaskOpen"
      :error-messages="isTaskOpen.errorMessage.value"
      label="Open"
      type="checkbox"
    ></v-checkbox>

    <v-select
      v-model="taskStore.taskToEdit.priority"
      :items="priority"
      :error-messages="select.errorMessage.value"
      label="Priority"
    ></v-select>

    <v-btn class="mb-4 clear-btn" @click="handleReset">clear</v-btn>

    <v-btn class="mb-4 submit-btn" type="submit">update</v-btn>

  </form>
</template>


<style scoped>

</style>
