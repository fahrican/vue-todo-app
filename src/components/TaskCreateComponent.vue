<script setup lang="ts">
import TaskFormComponent from "@/components/TaskFormComponent.vue";


const emit = defineEmits(['create-new-task']);

const submit = (request) => {
  console.log(`submit started: ${request}`);
  emit('create-new-task', request);
  console.log(`submit done: ${request}`);
}


</script>

<template>
  <TaskFormComponent
    @form-submitted="submit"/>
</template>
