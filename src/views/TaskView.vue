<template>
  <NavbarComponent @taskTypeSelected="handleTaskTypeSelected"/>

  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="v-sheet-padding"
            >
              <CardComponent
                v-if="!showTaskDetails"
                :tasks="tasks"
                @card-clicked="handleCardClicked"
              />
              <TaskDetailComponent
                v-if="showTaskDetails"
                :taskId="selectedTaskId"
              />

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<script lang="ts" setup>
import CardComponent from "@/components/CardComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import {reactive, ref, onMounted} from "vue";
import {TaskFetchResponse} from "@/types/TaskFetchResponse";
import {TaskState} from "@/types/TaskState";
import {taskService} from "@/services/TaskApi";
import {ALL_TASKS, CLOSED_TASKS, OPEN_TASKS} from "@/constants/constants";
import TaskDetailComponent from "@/components/TaskDetailComponent.vue";


const tasks = reactive<TaskFetchResponse[]>([])
const selectedTaskType = ref(TaskState[TaskState.OPEN]);
const showTaskDetails = ref(false);
const selectedTaskId = ref(0);
const handleCardClicked = (id: number) => {
  showTaskDetails.value = true;
  selectedTaskId.value = id;
};

onMounted(fetchTasks);

const handleTaskTypeSelected = (taskType: string) => {
  showTaskDetails.value = false;
  tasks.length = 0;
  switch (taskType) {
    case OPEN_TASKS:
      selectedTaskType.value = TaskState[TaskState.OPEN];
      break;
    case CLOSED_TASKS:
      selectedTaskType.value = TaskState[TaskState.CLOSED];
      break;
    case ALL_TASKS:
      selectedTaskType.value = '';
      break;
  }
  fetchTasks()
};

async function fetchTasks() {
  try {
    let response = await taskService.getTasks(selectedTaskType.value);
    response?.data.forEach((task: TaskFetchResponse) => tasks.push(task));
  } catch (err) {
    console.log('error loading tasks: ' + err)
  }
}

</script>
