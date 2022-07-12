<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { toastMessage, user } from '$lib/stores';

	onMount(async () => {
		const kakaoScript = document.createElement('script');
		kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
		document.head.appendChild(kakaoScript);

		kakaoScript.onload = () => {
			window.Kakao.init(import.meta.env.VITE_PUBLIC_KAKAO_CLIENT_ID);
			window.Kakao.Auth.createLoginButton({
				container: '#kakao-login-btn',
				success: async (kakaoAuth) => {
					const { data } = await axios.post(`/api/users`, {
						provider: 'kakao',
						access_token: kakaoAuth.access_token,
						refresh_token: kakaoAuth.refresh_token,
						expires_at: new Date(Date.now() + parseInt(kakaoAuth.expires_in, 10) * 1000)
					});
					await supabase.auth.signIn({ email: data.email, password: data.password });
					$toastMessage = data.message;
					goto('/');
				},
				fail: (err) => {
					$toastMessage = `로그인에 실패했습니다 ${err}`;
				}
			});
		};
	});
</script>

<button type="button" id="kakao-login-btn" class="hidden" />
<button
	type="button"
	class="w-12 h-12"
	on:click={() => {
		document.getElementById('kakao-login-btn').click();
	}}
>
	<img src="/kakao.png" alt="" />
</button>
