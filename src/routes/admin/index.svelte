<script>
	import { goto } from '$app/navigation';

	import Admin from '$lib/Admin.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		goto('/admin/profile');
	});
</script>

<Admin />
