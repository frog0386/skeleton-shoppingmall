<script>
	import { page } from '$app/stores';
	import List from '$lib/List.svelte';
	import { adminFields } from '$lib/constants';
</script>

<List modelName={$page.params.modelName} {...adminFields[$page.params.modelName]} />
