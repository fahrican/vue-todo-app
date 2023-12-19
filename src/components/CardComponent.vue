<template>
  <v-card v-for="(task, index) in tasks" :key="index"
          class="mx-auto v-card-bg nice-looking-card"
          :class="getBorderColorClass(task.isTaskOpen)"
  >
    <v-card-item @click="emits('card-clicked', task.id)">
      <div>
        <div class="text-overline mb-2">
          <v-card-text class="d-flex justify-space-between align-items-center">
                        <span
                          class="mdi mdi-traffic-light-outline"
                          v-if="task.priority !== null">Priority: {{ task.priority }}
                        </span>
            <span class="mdi mdi-toggle-switch-off-outline">Reminder: {{ task.isReminderSet }}</span>
          </v-card-text>
        </div>
        <div class="text-h6 mb-2 center-text">
          {{ task.description }}
        </div>
        <div class="text-caption center-text">Created on: {{ task.createdOn }}</div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn color="blue" class="mr-2">
        <v-icon start icon="mdi-pencil-outline"></v-icon>
        Edit Task
      </v-btn>

      <v-btn color="red" class="ml-auto" @click="emits('delete-clicked', task.id)">
        Delete Task
        <v-icon end icon="mdi-trash-can-outline"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>

const props = defineProps({
  tasks: Array,
});

const emits = defineEmits(['card-clicked', 'delete-clicked']);

const getBorderColorClass = (isTaskOpen: boolean) => {
  if (isTaskOpen) {
    return 'green-border';
  } else {
    return 'black-border';
  }
};

</script>


<style scoped>

.center-text {
  text-align: center;
}

.black-border {
  border: 2px solid black;
}

.green-border {
  border: 2px solid green;
}

</style>

