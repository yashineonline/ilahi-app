import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SongList from '../components/SongList.vue'
import SongPlayer from '../components/SongPlayer.vue'
import TestView from '../views/TestView.vue'
import BookView from '../views/BookView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  },
  {
    path: '/book',
    name: 'Book',
    component: BookView
  },
  {
    path: '/songs',
    name: 'SongList',
    component: SongList
  },
  {
    path: '/player/:id',
    name: 'SongPlayer',
    component: SongPlayer
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
