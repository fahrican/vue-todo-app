<script setup lang="ts">
import {ALL_TASKS, CLOSED_TASKS, OPEN_TASKS, TASK_CREATE_VIEW} from "@/constants/constants";
import router from "@/router";
import {computed, ref} from 'vue'
import {useDisplay} from 'vuetify'

const display = useDisplay()

const isMobile = computed(() => {
  return display.mobile
})

const links: string[] = [OPEN_TASKS, CLOSED_TASKS, ALL_TASKS]
const drawer = ref(false);

const emit = defineEmits(['task-type-selected', 'logo-clicked']);

const selectTaskType = (taskType: string) => {
  emit('task-type-selected', taskType);
  drawer.value = false;
};

const logoClicked = () => {
  emit('logo-clicked');
};

const createTask = () => {
  router.push({name: TASK_CREATE_VIEW}).then();
  drawer.value = false;
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
        variant="text"
        v-if="!isMobile.value"/>

      <v-spacer/>

      <v-btn
        class="text-none text-subtitle-1"
        color="#05B990"
        size="small"
        variant="outlined"
        @click="createTask"
        v-if="!isMobile.value">
        Create Task
      </v-btn>

      <v-app-bar-nav-icon v-if="isMobile.value" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary v-if="isMobile.value">
    <v-list>
      <v-list-item
        v-for="link in links"
        :key="link"
        @click="selectTaskType(link)">
        <v-list-item-title>{{ link }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="createTask">
        <v-list-item-title>Create Task</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>
