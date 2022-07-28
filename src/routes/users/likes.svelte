
<script>import Icon from '$lib/Icon.svelte';
import Back from '$lib/Back.svelte';
import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
</script>

<div class="fixed top-0 left-0 right-0 sm:mx-auto sm:max-w-sm bg-white h-14 px-4 items-center border-b flex">
	<button class="text-gray-400">
		<Back icon="arrow" />
	</button>
	<div class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800">
		찜한 상품
	</div>
</div>
<div class="pt-12"></div>