<script>
	import { goto } from '$app/navigation';
	import Back from '$lib/Back.svelte';

	import { supabase } from '$lib/supabase';
	import { getKey } from '$lib/util';
	import {toastMessage} from '$lib/stores';
	import { each } from 'svelte/internal';

	import * as yup from 'yup';
	import { Form, Message, isInvalid } from 'svelte-yup';
	let schema = yup.object().shape({
		name: yup
			.string()
			.required('이름을 입력해주세요.')
			.matches(/^[ㄱ-ㅎ가-힣A-Za-z0-9]{2,10}/, '이름은 2글자 이상 10글자 이하로 입력해주세요.'),
		email: yup
			.string()
			.required('이메일을 입력해주세요.')
			.email('올바른 형식의 이메일을 입력해주세요.'),
		password: yup
			.string()
			.required('비밀번호를 입력해주세요.')
			.matches(
				/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				'비밀번호에는 하나 이상의 문자, 숫자, 특수문자가 포함되어야 하며 8자 이상이어야 합니다.'
			),
		password_confirmation: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 다릅니다.')
	});
	let fields = {
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	};

	let genderOptions = [
			['남자', 'male'],
			['여자', 'female'],
			['비공개', 'private']
		],
		gender = genderOptions[0][1],
		files = [],
		checked = false;
	let submitted = false;
	let isValid;
	async function formSubmit() {
		console.log(fields.name);
		submitted = true;
		isValid = schema.isValidSync(fields);
		if (isValid) {
			const {user,session,error} = await supabase.auth.signUp({email : fields.email, password : fields.password});
			if(error){
				$toastMessage = "회원가입에 실패하였습니다.(Internal Server Error)"
				return;
			}
			else{
				$toastMessage = '회원가입에 성공하였습니다.'
				await supabase.from('user').update({
				name:fields.name
			}).eq('id',user.id);
				await supabase.from("user_info").insert({user_id:user.id, gender : gender});
				goto('/users/login');
			}
		}
	}
	$: invalid = (name) => {
		if (submitted) {
			return isInvalid(schema, name, fields);
		}
		return false;
	};
</script>

<!-- grid-cols-3 grid-cols-4 grid-cols-5 -->

<div class="flex justify-center items-center h-14 border-b font-bold">
	<Back icon="arrow" />
	회원가입
</div>

<Form class="form p-4" {schema} {fields} submitHandler={formSubmit} {submitted}>
	<!---
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
>
--->
	<div>
		<label for="name" class="text-sm font-bold text-gray-400 block mb-1">이름</label>
		<input
			id="name"
			type="text"
			class="input"
			bind:value={fields.name}
			class:invalid={invalid('name')}
			placeholder="이름을 입력하세요"
		/>
		<Message name="name" />
	</div>
	<div>
		<label for="email" class="text-sm font-bold text-gray-400 block mb-1 mt-3">이메일</label>
		<input
			id="email"
			type="text"
			class="input"
			bind:value={fields.email}
			class:invalid={invalid('email')}
			placeholder="이메일을 입력하세요"
		/>
		<Message name="email" />
	</div>
	<div>
		<label for="password" class="text-sm font-bold text-gray-400 block mb-1 mt-3">비밀번호</label>
		<input
			id="password"
			type="password"
			class="input"
			bind:value={fields.password}
			placeholder="비밀번호를 입력하세요"
		/>
		<Message name="password" />
	</div>
	<div>
		<label for="password_confirmation" class="text-sm font-bold text-gray-400 block mb-1 mt-3"
			>비밀번호 확인</label
		>
		<input
			id="password_confirmation"
			type="password"
			class="input"
			bind:value={fields.password_confirmation}
			placeholder="비밀번호를 한번 더입력하세요"
		/>
		<Message name="password_confirmation" />
	</div>

	<div
		class="grid grid-cols-{genderOptions.length} divide-x h-10 border mt-4 rounded text-sm text-gray-500"
	>
		{#each genderOptions as option}
			<button
				type="button"
				class="h-10 {option[1] === gender ? 'bg-gray-100 font-bold' : ''}"
				on:click={() => (gender = option[1])}>{option[0]}</button
			>
		{/each}
	</div>
	<label class="flex items-center mt-4 mb-5 pb-4 border-b text-xs">
		<input
			class="h-5 w-5 mr-2 border border-gray-400 rounded-full bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
			type="checkbox"
			bind:value={checked}
		/>
		필수 약관 전체 동의하기
	</label>
	<label class="flex justify-between items-center mt-1 text-xs form-check">
		<div class="flex items-center">
			<input
				class="h-5 w-5 mr-2 border border-gray-400 rounded-full bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
				type="checkbox"
				required {checked}
			/>
			<label class="inline-block text-gray-700" for="agree2"> (필수) 서비스 이용약관 동의 </label>
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
				required {checked}
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
				required {checked}
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
</Form>
