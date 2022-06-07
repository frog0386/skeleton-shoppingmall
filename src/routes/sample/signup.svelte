<script>
	import { goto } from '$app/navigation';

	import { supabase } from '$lib/supabase';
	import { getKey } from '$lib/util';
	import { toast } from '@zerodevx/svelte-toast';

	let email,
		name,
		password,
		files = [];

	const handleSubmit = async () => {
		const { user, session, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			toast.push('회원가입에 실패했습니다');
			return;
		} else {
			const key = await getKey(files[0]);
			const { error } = await supabase.from('profile').insert({
				user_id: user.id,
				email,
				name,
				image: key
			});
		}
		goto('/sample');
	};
</script>

<form class="mx-auto max-w-md border p-8 m-24" on:submit|preventDefault={handleSubmit}>
	<h2 class="text-xl font-bold mb-4">회원가입</h2>
	<label class="label" for="email">이메일</label>
	<input type="email" class="input" bind:value={email} required />
	<label class="label mt-2" for="password">비밀번호</label>
	<input type="password" class="input" bind:value={password} required />
	<label class="label mt-2" for="name">이름</label>
	<input type="text" class="input" bind:value={name} required />
	<label class="label mt-2" for="name">프로필 이미지</label>
	<input
		type="file"
		name=""
		id=""
		bind:files
		class="border w-full text-sm input p-1.5"
		accept="image/*"
	/>

	<p class="text-xs mt-2 text-center">
		회원가입 버튼을 누르시면 <a href="/contents/tos" class="underline" target="_blank">이용약관</a
		>과
		<a href="/contents/privacy" class="underline" target="_blank">개인정보보호방침</a>에
		<br />
		동의하신 것으로 간주합니다
	</p>

	<button type="submit" class="button mt-4"> 이메일 회원가입 </button>
	<div class="text-right">
		<a class="underline text-xs" href="/sample/login">이미 가입하셨나요? 로그인을 해주세요</a>
	</div>
</form>
