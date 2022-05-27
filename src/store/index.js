/*eslint-disable*/
import { createStore } from "vuex"

export default createStore({
	state: {
		user: null
	},
	getters: {
		getUser(state) {
			return state.user
		}
	},
	mutations: {
		SET_USER(state, payload) {
			state.user = payload
		},
		REMOVE_USER(state) {
			state.user = null
		}
	},
	actions: {
		setUser({ commit }, payload) {
			commit('SET_USER', payload)
		},
		removeUser({ commit }) {
			commit('REMOVE_USER')
		}
	}
})
