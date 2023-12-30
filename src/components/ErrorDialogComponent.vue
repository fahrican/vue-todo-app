<script setup lang="ts">

import {AxiosError} from "axios";
import {defineProps, PropType, ref, watch} from "vue";

const props = defineProps({
  axiosError: Object as PropType<AxiosError>,
  modelValue: Boolean,
});

const isDialogActive = ref(false);


watch(() => props.modelValue, newVal => {
  isDialogActive.value = newVal;
});

</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogActive" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">
          An error occurred!
        </v-card-title>
        <v-card-text>
          HTTP Status Code: {{ props.axiosError.response?.status }}
        </v-card-text>
        <v-card-text>
          Error message: {{ props.axiosError.message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="text" @click="isDialogActive = false">
            Cancel
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="isDialogActive = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
