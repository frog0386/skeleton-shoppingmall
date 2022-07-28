<script>
	import feather from 'feather-icons';
	export let icon = 'home';
	export let size = 24;
	export let stroke_width = 2;
	export let fill = "none";
</script>

{#if icon === 'heart-fill'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 {size} {size}"
		fill="currentColor"
		stroke="currentColor"
		stroke-width={stroke_width}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="feather feather-heart"
		><path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/></svg
	>
{:else}
	{@html feather.icons[icon]
		? feather.icons[icon].toSvg({ width: size, height: size, 'stroke-width': stroke_width, 'fill' : fill })
		: '-'}
{/if}
