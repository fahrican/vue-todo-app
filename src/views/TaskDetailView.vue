<script setup lang="ts">

import {reactive} from "vue";
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {taskService} from "@/services/TaskApi";


const props = defineProps({
  id: Number
});

const task = reactive<TaskFetchResponse>({
  id: 0,
  description: '',
  isReminderSet: null,
  isTaskOpen: null,
  createdOn: null,
  priority: null
})

async function fetchTaskById() {
  try {
    const response = await taskService.getTaskBydId(props.id);
    Object.assign(task, response.data);
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}

const formatedDate = (date: string) => {
  const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
  return new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '.');
}

fetchTaskById()
</script>

<template>

  <v-card class="mx-auto center-card-text">
    <v-list lines="two">
      <v-list-subheader>Task Detail</v-list-subheader>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Task ID: </span> {{ task.id }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Description: </span> {{ task.description }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Reminder set: </span> {{ task.isReminderSet }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Task open: </span> {{ task.isTaskOpen }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Created on: </span> {{ formatedDate(task.createdOn) }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Priority: </span> {{ task.priority }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

    </v-list>
  </v-card>

</template>

<style scoped>

.center-card-text {
  text-align: center;
}

</style>
