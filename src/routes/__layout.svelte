<script context="module">
	import { locale, loadTranslations } from '$lib/translation';

	export const load = async ({ url }) => {
		const { pathname } = url;
		const defaultLocale = 'ko'; // get from cookie, user session, ...
		const initLocale = locale.get() || defaultLocale; // set default if no locale already set
		await loadTranslations(initLocale, pathname); // keep this just before the `return`
		return {};
	};
</script>

<script>
	import '../app.css';
	import { user, modal, profile, loading } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { fade } from 'svelte/transition';
	import Icon from '$lib/Icon.svelte';
	import Loading from '$lib/Loading.svelte';
	import { page } from '$app/stores';
	import Toast from '$lib/Toast.svelte';
	import { getProfile } from '$lib/util';

	$user = supabase.auth.user();

	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			$user = session?.user;
		}
	});

	const loadProfile = async () => {
		$profile = await getProfile($user);
	};

	$: $user && loadProfile();
	
	console.log($profile);
</script>

<div
	class="bg-white w-full h-screen overflow-y-auto left-0 top-0 {$page.url.pathname.includes(
		'/admin'
	)
		? ''
		: 'sm:mx-auto sm:max-w-sm shadow-lg '}relative"
>
	<slot />
</div>
{#if $modal}
	<div
		transition:fade
		class="fixed w-full h-full top-0 left-0 bg-black/70 flex items-center justify-center"
		on:click={() => {
			$modal = null;
		}}
	>
		<div class="bg-white rounded md:max-w-sm md:w-96 md:mx-auto p-4">
			<h4 class="font-bold flex justify-between">
				{$modal.title}
				<button
					class="text-gray-500"
					on:click={() => {
						$modal = null;
					}}
				>
					<Icon icon="x" size={20} />
				</button>
			</h4>
			<p class="text-gray-500 my-2 text-sm ">{$modal.message}</p>
			{#if $modal.buttons}
				<div class = "flex gap-4">
				{#each $modal.buttons as button}
					<button on:click={button.onClick} class="button-outline mt-2 text-white {button.message === "logout"? 'bg-blue-500' : 'bg-gray-200'}">
						{button.title}
					</button>
				{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
<Loading />
<Toast />
