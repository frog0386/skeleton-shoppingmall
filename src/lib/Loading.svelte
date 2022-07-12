<script>
	import { Circle } from 'svelte-loading-spinners';
	import { loading } from './stores';
</script>

{#if $loading}
	<div
		class="z-10 fixed left-0 right-0 top-0 bottom-0 bg-black opacity-50 flex items-center justify-center"
	>
		<Circle color="blue" />
	</div>
{/if}
