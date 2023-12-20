<script setup lang="ts">

import {ref, watch} from "vue";

const props = defineProps({
  modelValue: Boolean,
});
const dialog = ref(false);
const emits = defineEmits(['confirm-delete', 'update:modelValue']);

watch(() => props.modelValue, newVal => {
  dialog.value = newVal;
});

const confirmDelete = () => {
  emits('confirm-delete');
  dialog.value = false;
  emits('update:modelValue', false);
};

</script>

<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this task?
        </v-card-title>
        <v-card-text>
          Task Description:
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="confirmDelete"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
