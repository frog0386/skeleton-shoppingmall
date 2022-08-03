<script>
  import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';

  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
	import { addComma } from '$lib/util';
	import { user, profile } from '$lib/stores';
  import axios from 'axios';
  import { toastMessage } from '$lib/stores';
  let name = '';
  let address1 = '';
  let address2 = '';
  let phone = '';
  onMount ( async () => {
    console.log($profile);
    name = $profile.name;
    address1 = $profile.user_info[0].address1;
    address2 = $profile.user_info[0].address2;
    phone = $profile.user_info[0].phone;
  })

</script>

<div
	class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
>
	<Back icon="arrow" />
	<div class="flex w-full justify-center  font-bold text-base text-gray-800">주문서 작성</div>
</div>
<div class="pt-16" />

<div class="p-4 space-y-2 border-b">
  <div class="flex justify-between items-center">
    <div class="font-bold text-lg ">배송 정보</div>
    <a href = "/orders/address" class="text-blue-600 border-b border-blue-600  font-bold text-xs">
      배송지 변경
    </a>
  </div>
  <div class="">{name}</div>
  <div class="text-sm text-gray-500 ">{phone}</div>
  <div class=" flex">
  <div class="text-sm text-gray-600">{address1}&nbsp;</div>
  <div class="text-sm text-gray-600">{address2}</div>
</div>

  <input
    type="text"
    class="w-full h-10 border-gray-300 rounded text-sm placeholder-neutral-400"
    placeholder="배송 시 요청사항을 적어주세요"
  />
</div>