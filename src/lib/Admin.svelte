<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import { adminMenus } from '$lib/constants';
	import Icon from './Icon.svelte';
	import { t } from './translation';

	const isActive = (path) => $page.url.pathname === path;

	onMount(() => {
		console.log($page.url.pathname);
		if (!$user) {
			goto('/users/login');
		}
	});
</script>

<div class="fixed w-48 overflow-y-auto bg-gray-600 h-full">
	<div class="text-white p-4">
		<a href="/admin" class="font-extrabold text-xl">CONTESTAR</a>
	</div>

	{#each adminMenus as [key, menus]}
		<a
			sveltekit:reload
			href={`/admin/${key}`}
			class={`flex justify-between items-center text-white text-sm py-3 px-4 ${
				isActive(`/admin/${key}`) ? 'bg-gray-900' : ''
			}`}
		>
			{$t(`common.model.${key}`)} 관리
			{#if menus}
				<Icon icon="chevron-down" size={16} />
			{/if}
		</a>

		{#if menus}
			<div
				class={`flex-col ${
					!isActive(`/admin/${key}`) && !menus.some((menu) => isActive(`/admin/${menu}`))
						? 'hidden'
						: ''
				}`}
			>
				{#each menus as menu}
					<a
						sveltekit:reload
						href={`/admin/${menu}`}
						class={`flex justify-between items-center text-white text-sm py-3 px-8 ${
							isActive(`/admin/${menu}`) ? 'bg-gray-900' : 'bg-gray-700 '
						}`}
					>
						{$t(`common.model.${menu}`)} 관리
					</a>
				{/each}
			</div>
		{/if}
	{/each}
	<div class="p-4 mt-4">
		<div class="text-white text-xs mb-2">
			<span class="font-bold">관리자</span>님, 환영합니다
		</div>
		<button
			class="button border-white mt-4"
			on:click={async () => {
				await supabase.auth.signOut();
				toast.push('로그아웃 하였습니다');
				goto('/');
			}}
		>
			로그아웃
		</button>
	</div>
</div>

<div class="p-4 pl-52">
	<slot />
</div>
