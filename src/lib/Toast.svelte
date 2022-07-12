<script>
	import { toastMessage } from '$lib/stores';
	import { fade } from 'svelte/transition';

	$: {
		if ($toastMessage) {
			setTimeout(() => {
				$toastMessage = null;
			}, 2000);
		}
	}
</script>

{#if $toastMessage}
	<div
		on:click={() => {
			$toastMessage = null;
		}}
		transition:fade
		class="z-20 text-center fixed mx-8 text-white left-0 right-0 bottom-8 bg-black opacity-80 p-3 flex items-center justify-center rounded-3xl md:max-w-sm md:mx-auto"
	>
		{$toastMessage}
	</div>
{/if}
