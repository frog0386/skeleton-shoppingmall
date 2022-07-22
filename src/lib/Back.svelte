<script>
	import { goto } from '$app/navigation';
	import Icon from '$lib/Icon.svelte';
	export let url = null;
	export let icon = null;
</script>

{#if icon === 'arrow'}
<button
	type="button"
	class="absolute left-4 top-4 text-gray-400"
	on:click={() => {
		console.log(window.history);
		return url ? goto(url) : window.history.go(-1);
	}}
>
	<Icon icon="arrow-left" size={24} />
</button>
{:else}
<button
	type="button"
	class="absolute left-4 top-4 text-gray-400"
	on:click={() => {
		console.log(window.history);
		return url ? goto(url) : window.history.go(-1);
	}}
>
	<Icon icon="x" size={24} />
</button>{/if}