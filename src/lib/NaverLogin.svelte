<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import queryString from 'query-string';
	import { page } from '$app/stores';

	onMount(async () => {
		const naverScript = document.createElement('script');
		naverScript.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js';
		naverScript.type = 'text/javascript';
		document.head.appendChild(naverScript);

		// Naver sdk 스크립트 로드 완료시
		naverScript.onload = () => {
			const naverLogin = new window.naver.LoginWithNaverId({
				clientId: import.meta.env.VITE_PUBLIC_NAVER_CLIENT_ID,
				callbackUrl: 'http://localhost:3000/users/login',
				callbackHandle: true,
				isPopup: false,
				loginButton: {
					color: 'green',
					type: 3,
					height: 60
				}
			});

			naverLogin.init();
			naverLogin.logout(); // 네이버 로그인이 계속 유지되는 경우가 있다. 초기화시 로그아웃
			naverLogin.getLoginStatus((status) => {
				if (status) {
					const { id, email, gender } = naverLogin.user;
				} else {
					console.log('Naver 비 로그인 상태');
				}
			});
		};

		const { access_token, expires_in } = queryString.parse($page.url.hash);
		if (access_token) {
			const { data } = await axios.post(`/api/users`, {
				provider: 'naver',
				access_token,
				expires_at: new Date(Date.now() + parseInt(expires_in) * 1000)
			});

			console.log(data);
		}
	});
</script>

<div type="button" id="naverIdLogin" class="hidden" />
<button
	type="button"
	class="w-12 h-12"
	on:click={async () => {
		document.getElementById('naverIdLogin').firstChild.click();
	}}
>
	<img src="/naver.png" alt="" />
</button>
