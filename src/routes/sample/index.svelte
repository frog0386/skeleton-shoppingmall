<script>
	import { user } from '$lib/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { supabase } from '$lib/supabase';
</script>

<div class="p-4">
	{#if $user}
		{$user.email}님 반갑습니다
		<button
			on:click={async () => {
				await supabase.auth.signOut();
				user.set(null);
				toast.push('로그아웃하였습니다');
			}}
			class="button-outline w-24">로그아웃</button
		>
	{:else}
		로그인이 필요합니다
		<a href="/sample/login" class="button w-24 ">로그인</a>
	{/if}
</div>
