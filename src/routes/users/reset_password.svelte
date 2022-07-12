<script>
	import Back from '$lib/Back.svelte';
	import { loading, toastMessage } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	let email;
</script>

<div class="text-lg p-4 gap-2">
	<Back />
</div>
<div class="p-4 flex flex-col h-full">
	<h1 class="pt-2 text-2xl">이메일 주소를<br /> 입력해주세요.</h1>

	<form
		class="mt-10"
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
			class="input w-full h-12 mt-2"
			placeholder="이메일 주소를 입력해주세요."
			required
		/>

		<button class="text-white font-bold text-sm mt-4 w-full rounded bg-blue-500 h-12">
			확인
		</button>
	</form>
</div>
