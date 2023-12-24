<script setup lang="ts">

import {ALL_TASKS, CLOSED_TASKS, OPEN_TASKS, TASK_CREATE_VIEW} from "@/constants/constants";
import router from "@/router";

const links: string[] = [OPEN_TASKS, CLOSED_TASKS, ALL_TASKS]

const emit = defineEmits(['task-type-selected', 'logo-clicked']);

const selectTaskType = (taskType: string) => {
  emit('task-type-selected', taskType);
};

const logoClicked = () => {
  emit('logo-clicked');
};

const createTask = () => {
  router.push({name: TASK_CREATE_VIEW});
};

</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-app-bar-title>
        <v-img src="../assets/logo.png" max-height="70" max-width="70" @click="logoClicked"></v-img>
      </v-app-bar-title>

      <v-btn
        v-for="link in links"
        :key="link"
        @click="selectTaskType(link)"
        :text="link"
        variant="text">
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        class="text-none text-subtitle-1"
        color="#05B990"
        size="small"
        variant="outlined"
        @click="createTask">
        Create Task
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
