<script setup lang="ts">

import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import {useRoute} from "vue-router";
import TaskUpdateComponent from "@/components/TaskUpdateComponent.vue";

const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();
const route = useRoute();
const taskId = route.params.id;

</script>

<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskUpdateComponent :taskId="taskId" />
  </AppBackgroundComponent>
</template>

<style scoped>

</style>
