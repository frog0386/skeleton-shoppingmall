<script>
	import { goto } from '$app/navigation';

	import { supabase } from '$lib/supabase';
	import { toast } from '@zerodevx/svelte-toast';
	let password;
</script>

<div class="flex mx-auto max-w-5xl mt-8 pt-20">
	<form
		class="flex-1 border p-8 "
		on:submit|preventDefault={async () => {
			const { error } = await supabase.auth.update({ password });
			if (error) {
				toast.push(error.message);
			} else {
				toast.push('비밀번호가 수정되었습니다');
				goto('/');
			}
		}}
	>
		<h2 class="text-xl font-bold mb-4">비밀번호 변경</h2>

		<label class="label mt-2" for="password">새 비밀번호</label>
		<input type="password" class="input" bind:value={password} />
		<button class="button mt-2">비밀번호 변경하기</button>
	</form>
</div>
