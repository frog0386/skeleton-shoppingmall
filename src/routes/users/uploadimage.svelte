<script>
	import { detectMediaType, getKey, getUrl } from '$lib/util';
	import { user, profile } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { loading } from '$lib/stores';
  import {toastMessage} from '$lib/stores';
	
	let fileinput;
	
	const onFileSelected = async (event) => {
		let image = event.target.files[0];
    $loading = true;
		const key = await getKey(image);
    console.log(key);
    const publicURL = await getUrl(key);
    console.log(publicURL);
    const {error} = await supabase.from('user_info').update({profileimage:publicURL}).eq('user_id',$user.id);
    $loading = false;
    $toastMessage = "업로드가 완료되었습니다."
	};
</script>


<div
	class=""
	on:click={() => {
		fileinput.click();
	}}
>
	Choose Image
</div>
<input
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png"
	on:change={(e) => onFileSelected(e)}
	bind:this={fileinput}
/>
