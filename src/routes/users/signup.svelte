<script>
	import { goto } from '$app/navigation';
	import Back from '$lib/Back.svelte';

	import { supabase } from '$lib/supabase';
	import { getKey } from '$lib/util';
	import { toast } from '@zerodevx/svelte-toast';
	import { each } from 'svelte/internal';

	let email,
		name,
		password,
		genderOptions = [
			['남자', 'male'],
			['여자', 'female'],
			['비공개', 'private']
		],
		gender = genderOptions[0][1],
		ageOptions = [
			['10대', '10'],
			['20~30대', '2030'],
			['40~50대', '4050'],
			['60대 이상', '60']
		],
		age = ageOptions[0][1],
		files = [],
		checked = false;
</script>

<!-- grid-cols-3 grid-cols-4 grid-cols-5 -->

<div class="flex justify-center items-center h-14 border-b font-bold">
	<Back />
	회원가입
</div>

<form
	on:submit|preventDefault={async () => {
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
	}}
	class="p-4"
>
	<label for="" class="text-sm font-bold text-gray-400 block mb-1">이름</label>
	<input type="text" class="input" bind:value={name} placeholder="이름을 입력하세요" required />
	<label for="" class="text-sm font-bold text-gray-400 block mb-1 mt-3">이메일</label>
	<input type="text" class="input" bind:value={email} placeholder="이메일을 입력하세요" required />
	<label for="" class="text-sm font-bold text-gray-400 block mb-1 mt-3">비밀번호</label>
	<input
		type="password"
		class="input"
		bind:value={password}
		placeholder="비밀번호를 입력하세요"
		required
	/>
	<label for="" class="text-sm font-bold text-gray-400 block mb-1 mt-3">성별</label>

	<div
		class="grid grid-cols-{genderOptions.length} divide-x h-10 border rounded text-sm text-gray-500"
	>
		{#each genderOptions as option}
			<button
				type="button"
				class="h-10 {option[1] === gender ? 'bg-gray-100 font-bold' : ''}"
				on:click={() => (gender = option[1])}>{option[0]}</button
			>
		{/each}
	</div>
	<label for="" class="text-sm font-bold text-gray-400 block mb-1 mt-3">나이대</label>

	<div
		class="grid grid-cols-{ageOptions.length} divide-x h-10 border rounded text-sm text-gray-500"
	>
		{#each ageOptions as option}
			<button
				type="button"
				class="h-10 {option[1] === age ? 'bg-gray-100 font-bold' : ''}"
				on:click={() => (age = option[1])}>{option[0]}</button
			>
		{/each}
	</div>

	<label class="flex items-center mt-4 mb-5 pb-4 border-b text-xs">
		<input
			class="h-5 w-5 mr-2 border border-gray-400 rounded-full bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
			type="checkbox"
			bind:value={checked}
		/>
		전체 약관에 동의합니다.
	</label>
	<label class="flex justify-between items-center mt-1 text-xs form-check">
		<div class="flex items-center">
			<input
				class="h-5 w-5 mr-2 border border-gray-400 rounded-full bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
				type="checkbox"
				required
				{checked}
			/>
			(필수) 서비스 이용약관에 동의
		</div>
		<a href="/pages/tos" class="text-gray-500 text-xs">자세히 보기</a>
	</label>
	<label class="flex justify-between items-center mt-1 text-xs">
		<div class="flex items-center">
			<input
				class="h-5 w-5 border mr-2 border-gray-400 rounded-full bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
				type="checkbox"
				value=""
				id="agree2"
			/>
			<label class="inline-block text-gray-700" for="agree2"> (필수) 위치정보 이용약관 동의 </label>
		</div>
		<a href="/clause" class="text-gray-500 text-xs">자세히 보기</a>
	</label>
	<div class="flex justify-between items-center mt-1 text-xs form-check">
		<div class="flex items-center">
			<input
				class="h-5 w-5 mr-2 border border-gray-400 rounded-full bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
				type="checkbox"
				value=""
				id="agree3"
			/>
			<label class="inline-block text-gray-700" for="agree3">
				(필수) 개인정보처리방침에 동의
			</label>
		</div>
		<a href="/clause" class="text-gray-500 text-xs">자세히 보기</a>
	</div>
	<div class="flex justify-between items-center text-xs form-check mt-1">
		<div class="flex items-center">
			<input
				class="h-5 w-5 mr-2 border border-gray-400 rounded-full bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
				type="checkbox"
				value=""
				id="agree4"
			/>
			<label class="inline-block text-gray-700" for="agree4"> (선택) 마케팅 수신에 동의 </label>
		</div>
		<a href="/clause" class="text-gray-500 text-xs">자세히 보기</a>
	</div>
	<button class="bg-blue-600 rounded text-sm h-10 w-full text-white font-bold mt-8">회원가입</button
	>
	<div class="text-center mt-4">
		<a class="underline text-xs" href="/users/login">이미 가입하셨나요? 로그인을 해주세요</a>
	</div>
</form>
