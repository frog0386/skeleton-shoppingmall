<script>
	import { fade } from 'svelte/transition';

	export let show,
		title = '알림',
		callback = () => {
			show = false;
		};
</script>

{#if show}
	<div
		class="z-10 fixed top-0 left-0 right-0 bottom-0 bg-black/[.3] flex items-center justify-center"
		transition:fade
		on:click={callback}
	>
		<div class="z-10 w-96 text-center flex flex-col justify-center bg-white rounded-2xl p-4">
			<div>{title}</div>
			<div class="text-lg my-2"><slot /></div>
			<div class="flex justify-center p-2">
				<button
					on:click={callback}
					class="bg-blue-500 rounded-full text-neutral-100 h-8 px-8 text-sm">확인</button
				>
			</div>
		</div>
	</div>
{/if}
