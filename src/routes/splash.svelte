<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	onMount(() => {
		sessionStorage.setItem('sessionFlag', '1');
		setTimeout(() => {
			goto('/');
		}, 3000);
	});
</script>

<div
	transition:fade
	class="bg-blue-500 text-white text-3xl w-full h-screen flex items-center justify-center font-bold"
>
	fingr
</div>
