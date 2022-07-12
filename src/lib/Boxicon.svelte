<script>
	// import boxicons from 'boxicons';
	import { onMount } from 'svelte';
	export let icon = 'home';
	export let size = 24;
	let svg;

	onMount(async () => {
		const { BoxIconElement } = await import('boxicons');
		svg = await BoxIconElement.getIconSvg(icon);
	});
</script>

{#if svg}
	{@html svg}
{/if}
