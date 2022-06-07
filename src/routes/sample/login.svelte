<script>
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	import { supabase } from '$lib/supabase';

	import { user } from '$lib/stores';

	// $: $user ? goto('/') : null;

	const handleSubmit = async () => {
		const { error } = await supabase.auth.signIn({ email, password });
		if (error) {
			toast.push('잘못된 로그인 정보입니다');
			return;
		} else {
			toast.push('로그인 되었습니다');
			goto('/sample');
		}
	};
	let email, password;
</script>

<form class="mx-auto md:max-w-md border p-8 m-24" on:submit|preventDefault={handleSubmit}>
	<h2 class="text-xl font-bold mb-4">로그인</h2>
	<label class="label" for="email">이메일</label>
	<input type="email" class="input" bind:value={email} required />

	<label class="label mt-2" for="password">비밀번호</label>
	<input type="password" class="input" bind:value={password} required />

	<div class="text-right">
		<a class="underline text-xs" href="/sample/reset_password">비밀번호를 잃어버리셨어요?</a>
	</div>

	<button type="submit" class="button mt-4">이메일 로그인 </button>
	<div class="text-right">
		<a class="underline text-xs" href="/sample/signup"
			>아직 계정이 없으신가요? 회원가입을 해주세요</a
		>
	</div>
</form>
