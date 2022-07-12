<script>
	import Back from '$lib/Back.svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import KakaoLogin from '$lib/KakaoLogin.svelte';
	import NaverLogin from '$lib/NaverLogin.svelte';

	import { toastMessage, user } from '$lib/stores';

	let email, password;

	// $: $user && goto('/');
</script>

<Back />
<div class="flex flex-col h-full">
	<div class="p-4 flex-1 flex flex-col justify-center items-center">
		<h2 class="text-blue-500 text-3xl font-extrabold text-center mt-4 mb-14">
			fingr <br />
		</h2>
		<form
			on:submit|preventDefault={async () => {
				const { error } = await supabase.auth.signIn({ email, password });
				if (error) {
					$toastMessage = '잘못된 로그인 정보입니다';
					return;
				} else {
					$toastMessage = '로그인 되었습니다';
					goto('/');
				}
			}}
		>
			<input
				type="email"
				class="border-none bg-gray-100 w-full h-12 rounded mt-2 text-sm"
				placeholder="이메일"
				bind:value={email}
				required
			/>

			<input
				type="password"
				class="border-none bg-gray-100 w-full h-12 rounded mt-4 text-sm"
				placeholder="비밀번호"
				bind:value={password}
				required
			/>

			<button class="button mt-4"> 로그인 </button>
		</form>

		<div class="text-center mt-2 text-gray-500">
			<a href="/users/reset_password" class="text-sm mt-2 border-r pr-2 mr-2">비밀번호 찾기</a>
			<a href="/users/signup" class="mt-2 text-sm">회원가입</a>
		</div>

		<div class="flex justify-center mt-4 gap-4">
			<KakaoLogin />
			<NaverLogin />
			<button
				class="w-12 h-12"
				on:click={async () => {
					const { user, session, error } = await supabase.auth.signIn({
						provider: 'google'
					});
				}}
			>
				<img src="/google.png" alt="" />
			</button>
		</div>
	</div>
	<div class="text-xs p-4 text-gray-500">
		(주)인썸니아 | 대표이사 이성훈 | 사업자등록번호: 362-81-00644 <br />
		서울시 서초구 서초대로 398 539호<br />
		© 2022 INSOMENIA Inc. All rights reserved.<br />
	</div>
</div>
