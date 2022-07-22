<script>
	import Menu from '$lib/Menu.svelte';
	import { supabase } from '$lib/supabase';
	import { user, profile } from '$lib/stores';
	import {toastMessage} from '$lib/stores';
</script>

<div class="flex justify-center items-center h-14 border-b font-bold">마이페이지</div>
<div class="px-4">
	{#if $user}
		<div class="flex items-center justify-center">
			<img
				alt=""
				src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDZ8fGZhc2hpb258ZW58MHx8fHwxNjQ0NzQxNTkx&ixlib=rb-1.2.1&q=80&w=1080"
				class="w-12 h-12 border rounded-full object-cover"
			/>
			<div class="font-semibold text-sm text-gray-800">줴임스</div>
		</div>

		<a href="/contacts" class="block font-bold border-b text-left py-3 text-sm text-gray-800"
			>1:1 문의</a
		>
		<a href="/faqs" class="block font-bold border-b text-left py-3 text-sm text-gray-800">
			자주 묻는 질문
		</a>
		<a href="/notices" class="block font-bold border-b text-left py-3 text-sm text-gray-800"
			>공지사항</a
		>
		<a href="/settings" class="block font-bold border-b text-left py-3 text-sm text-gray-800"
			>알림 설정</a
		>

		<a
			href="/"
			class="mt-8 rounded border h-10 flex justify-center items-center border-blue-600 text-blue-600 text-sm"
			>회원 정보 수정</a
		>
		<button
			on:click={async () => {
				await supabase.auth.signOut();
				$user = null;
				$profile = null;
				$toastMessage ='로그아웃 되었습니다.';
			}}
			href="/"
			class="w-full mt-4 rounded border h-10 flex justify-center items-center border-blue-500 text-blue-600 text-sm"
			>로그아웃</button
		>
		<a
			href="/"
			class="mt-4 rounded border h-10 flex justify-center items-center border-gray-300 text-gray-300 text-sm"
			>회원 탈퇴</a
		>
	{:else}
	<div class = "space-y-4 mt-6">
		<div class = "space-y-2">
		<div class="text-gray-500">아직 Fingr 회원이 아니신가요?</div>
		<div class="text-2xl font-bold">가입하고 특별한 혜택을 누려보세요!</div>
		</div>
		<a
			href="/users/signup"
			class="rounded border-2 h-12 flex justify-center items-center border-gray-500 text-gray-500"
			>회원가입하기</a
		>
		<a
			href="/users/login"
			class=" rounded border-2 h-12 flex justify-center items-center border-blue-500 text-white bg-blue-500"
			>로그인하기</a
		>
		
	</div>
	{/if}
</div>

<Menu />
