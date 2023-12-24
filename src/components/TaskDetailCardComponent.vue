<script setup lang="ts">

import {PropType} from "vue";
import {formattedDate} from "@/composables/formattedDate";
import {TaskFetchResponse} from "@/types/taskDto";

const props = defineProps({
  task: Object as PropType<TaskFetchResponse>
});

</script>

<template>
  <v-card class="mx-auto center-card-text">
    <v-list lines="two">
      <v-list-subheader>Task Detail</v-list-subheader>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Task ID: </span> {{ props.task.id }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Description: </span> {{ props.task.description }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Reminder set: </span> {{ props.task.isReminderSet }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Task open: </span> {{ props.task.isTaskOpen }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Created on: </span> {{ formattedDate(props.task.createdOn) }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Priority: </span> {{ props.task.priority }}
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
