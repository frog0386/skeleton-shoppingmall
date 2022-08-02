<script>
	import Icon from '$lib/Icon.svelte';
	import { supabase } from '$lib/supabase';
	import { profile } from '$lib/stores';
	import Back from '$lib/Back.svelte';
	import { goto } from '$app/navigation';
	import { toastMessage } from '$lib/stores';

  let user_info = $profile.user_info[0];
	let username = $profile.user_info[0].username;
	let phone = $profile.user_info[0].phone;

  async function saveChange(){
    const {error} = await supabase.from('user_info').update({username : username, phone:phone}).match({user_id:user_info.user_id});
    $profile.user_info[0].phone = phone;
    $profile.user_info[0].username = username;
    $toastMessage = "저장되었습니다.";
    goto("/users/edit");
  }
</script>

<div class="bg-white h-14 px-4 items-center border-b flex">
	<Back url = "/users/edit"/>
	<div class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800">회원정보 수정</div>
</div>

<div class = "p-4">
<label for="" class=" mt-4  font-bold block text-gray-500 mb-2">닉네임</label>
<input
	type="text"
	class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
	placeholder="닉네임을 입력해주세요."
	bind:value={username}
/>

<label for="" class=" mt-4  font-bold block text-gray-500 mb-2">휴대폰</label>
<div class="flex gap-2 mt-2">
	<input
		type="text"
		class="flex-1 h-14 border-gray-300 font-bold rounded-md text-sm placeholder-neutral-400"
		placeholder="휴대폰 번호"
		bind:value={phone}
	/>
	<button
		on:click={() => {$toastMessage = "인증이 완료되었습니다."}}
		class="text-center p-2 border border-gray-300 rounded-md h-14 text-sm text-white font-bold flex items-center justify-center bg-blue-500 hover:bg-gray-300"
	>
		휴대폰 인증
	</button>
</div>
</div>

<div class="sm:mx-auto sm:max-w-sm px-4 pb-4 fixed bottom-0 w-full bg-white ">
  <button on:click = {saveChange}
    class="w-full h-12 rounded-full hover:bg-gray-300  text-center text-white bg-blue-600 "
    >저장하기</button
  >
</div>