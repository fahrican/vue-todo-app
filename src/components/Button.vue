<template>
  <v-btn v-bind="$props">
    {{ label }}
  </v-btn>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: "Button",
  },
});
</script>
