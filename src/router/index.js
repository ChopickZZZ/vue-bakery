/*eslint-disable*/

import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage'
import BakeryCategory from '../components/BakeryCategory'
import BakeryInfo from '../components/BakeryInfo'

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		return { left: 0, top: 0 }
	},
	routes: [
		{
			path: '/',
			name: 'main',
			component: MainPage
		},
		{
			path: '/:bakery',
			name: 'bakery',
			component: BakeryCategory
		},
		{
			path: '/:bakery/:info',
			name: 'info',
			component: BakeryInfo
		},
	]
})

export default router