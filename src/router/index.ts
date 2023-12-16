import {createRouter, createWebHistory} from 'vue-router'
import TaskDetailView from "@/views/TaskDetailView.vue";


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/TasksView.vue'),
        props: true
      },
      {
        path: 'tasks/:id',
        name: 'TaskDetail',
        component: TaskDetailView,
        props: true,
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
