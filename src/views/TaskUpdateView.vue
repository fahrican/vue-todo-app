<script setup lang="ts">

import AppBackgroundComponent from "@/components/AppBackgroundComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {useTaskNavigation} from "@/composables/useTaskNavigation";
import TaskUpdateComponent from "@/components/TaskUpdateComponent.vue";

const {handleTaskTypeSelected, logoClicked} = useTaskNavigation();


</script>

<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected" @logoClicked="logoClicked"/>
  <AppBackgroundComponent>
    <TaskUpdateComponent />
  </AppBackgroundComponent>
</template>
