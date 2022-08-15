import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useUserStore = defineStore('user', () => {
	const user = ref(null);
	const token = ref(null);
	const exp = ref(null);

	const login = async (email, password) => {
		try {
			const res = await api.post('auth/login', { email, password });
			token.value = res.data.token.token;
			exp.value = res.data.token.expiresIn;
			localStorage.setItem('mevn_user', true);
			setTime();
		} catch (error) {
			if (error.response) {
				//console.log(error.response.data);
				throw error.response.data;
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			throw { error: "error de servidor" };
		}
	}

	const register = async (email, password, repassword) => {
		try {
			const res = await api.post('auth/register', { email, password, repassword });
			token.value = res.data.token.token;
			exp.value = res.data.token.expiresIn;
			localStorage.setItem('mevn_user', true);
			setTime();
		} catch (error) {
			if (error.response) {
				//console.log(error.response.data);
				throw error.response.data;
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			throw { error: "error de servidor" };
		}
	}

	const setTime = () => {
		setTimeout(() => {
			refreshToken();
		}, exp.value * 1000 - 6000);
	}

	const refreshToken = async () => {
		console.log('refreshToken');
		try {
			const res = await api.get('auth/refresh');
			token.value = res.data.token;
			exp.value = res.data.expiresIn;
			localStorage.setItem('mevn_user', true);
			setTime();
		} catch (error) {
			console.error(error);
			localStorage.removeItem('mevn_user');
		}
	}

	const logout = async () => {
		try {
			await api.get('auth/logout');
		} catch (error) {
			console.error(error);
		} finally {
			resetStore();
			localStorage.removeItem('mevn_user');
		}
	};

	const resetStore = () => {
		user.value = null;
		token.value = null;
		exp.value = null;
	}

	return {
		user,
		token,
		exp,
		login,
		refreshToken,
		logout,
		register
	}
});