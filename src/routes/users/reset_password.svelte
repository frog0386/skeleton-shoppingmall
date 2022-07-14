<script>
	import Back from '$lib/Back.svelte';
	import { loading, toastMessage } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	let email;
</script>

<div class="text-lg p-4 h-12 gap-2">
	<Back />
</div>
<h1 class="px-4 text-2xl">비밀번호 찾기</h1>

<form
	class="p-4"
	on:submit|preventDefault={async () => {
		$loading = true;
		const { error } = await supabase.auth.api.resetPasswordForEmail(email);
		if (error) {
			$toastMessage = error.message;
		} else {
			$toastMessage = '이메일로 로그인 가능한 링크를 보내드렸습니다. 비밀번호 재설정을 해주세요';
		}
		$loading = false;
	}}
>
	<label class="label" for="">이메일 주소</label>

	<input
		bind:value={email}
		type="email"
		class="input mt-2"
		placeholder="이메일 주소를 입력해주세요."
		required
	/>

	<button class="button mt-4"> 확인 </button>
</form>
