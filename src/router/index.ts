import {createRouter, createWebHistory} from 'vue-router'
import TaskDetailView from "@/views/TaskDetailView.vue";
import {HOME_VIEW, TASK_CREATE_VIEW, TASK_DETAIL_VIEW, TASK_UPDATE_VIEW} from "@/constants/constants";
import TaskCreateView from "@/views/TaskCreateView.vue";
import TaskUpdateView from "@/views/TaskUpdateView.vue";


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: HOME_VIEW,
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/TasksView.vue'),
        props: true
      },
      {
        path: 'tasks/:id',
        name: TASK_DETAIL_VIEW,
        component: TaskDetailView,
        props: true,
      },
      {
        path: 'tasks',
        name: TASK_CREATE_VIEW,
        component: TaskCreateView,
        props: true,
      },
      {
        path: 'tasks/:id/update',
        name: TASK_UPDATE_VIEW,
        component: TaskUpdateView,
        props: true,
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
