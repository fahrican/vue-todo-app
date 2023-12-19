<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useField, useForm} from 'vee-validate'
import {Priority} from "@/types/Priority";
import {TaskCreateRequest} from "@/types/TaskCreateRequest";

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
const description = useField('description')
const select = useField('select')
const isReminderSet = useField('isReminderSet')
const isTaskOpen = useField('isTaskOpen')
const priority = ref([
  Priority[Priority.LOW],
  Priority[Priority.MEDIUM],
  Priority[Priority.HIGH],
])
const request = reactive<TaskCreateRequest>({
  description: description.value.value,
  priority: select.value.value,
  isReminderSet: isReminderSet.value.value,
  isTaskOpen: isTaskOpen.value.value,
});
const emit = defineEmits(['create-new-task']);


const submit = handleSubmit(values => {
  request.description = values.description;
  request.isReminderSet = values.isReminderSet !== undefined;
  request.isTaskOpen = values.isTaskOpen !== undefined;
  request.priority = values.select;
  emit('create-new-task', request);
})

</script>

<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="description.value.value"
      :counter="10"
      :error-messages="description.errorMessage.value"
      label="Description"
    ></v-text-field>

    <v-checkbox
      v-model="isReminderSet.value.value"
      :error-messages="isReminderSet.errorMessage.value"
      value="1"
      label="Reminder"
      type="checkbox"
    ></v-checkbox>

    <v-checkbox
      v-model="isTaskOpen.value.value"
      :error-messages="isTaskOpen.errorMessage.value"
      value="1"
      label="Open"
      type="checkbox"
    ></v-checkbox>

    <v-select
      v-model="select.value.value"
      :items="priority"
      :error-messages="select.errorMessage.value"
      label="Priority"
    ></v-select>

    <v-btn class="mb-4 clear-btn" @click="handleReset">clear</v-btn>

    <v-btn class="mb-4 submit-btn" type="submit">submit</v-btn>

  </form>
</template>

<style scoped>

.v-btn.clear-btn {
  width: 49%;
  background-color: red;
  color: #EEEEEE;
  margin: 0 0.2rem;
}

.v-btn.submit-btn {
  width: 49%;
  background-color: green;
  color: #EEEEEE;
  margin: 0 0.2rem;
}

</style>
