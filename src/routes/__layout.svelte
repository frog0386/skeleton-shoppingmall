<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';

	$user = supabase.auth.user();
	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			$user = session?.user;
		}
	});
</script>

<div class="pb-20">
	<slot />
</div>
<SvelteToast options={{}} />
