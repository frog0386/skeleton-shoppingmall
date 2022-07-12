<script>
	import { onMount } from 'svelte';

	import 'suneditor/dist/css/suneditor.min.css';

	export let introduction;
	let editor;

	onMount(async () => {
		const suneditor = await import('suneditor');
		const { ko } = await import('suneditor/src/lang');
		const plugins = await import('suneditor/src/plugins');
		editor = suneditor.default.create('editor', {
			buttonList: [
				['fontSize', 'bold', 'italic', 'list'],
				['image', 'link']
			],
			plugins,
			lang: ko
		});
		editor.onChange = (content) => {
			introduction = content;
		};
	});

	onMount(() => {
		() => editor.destroy();
	});
</script>

<textarea id="editor" class="w-full h-48" bind:value={introduction} />
