<script>
	import { goto } from '$app/navigation';
	import Icon from '$lib/Icon.svelte';
	export let url = null;
</script>

<button
	type="button"
	class="absolute left-4 top-4 "
	on:click={() => {
		console.log(window.history);
		return url ? goto(url) : window.history.go(-1);
	}}
>
	<Icon icon="arrow-left" size={24} />
</button>
