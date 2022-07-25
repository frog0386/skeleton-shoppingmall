<script>

  import Icon from "$lib/Icon.svelte";
  import { supabase } from "$lib/supabase";
  import {profile} from "$lib/stores";
  import DaumPostcode from 'svelte-daum-postcode';
  import Back from "$lib/Back.svelte";
import { goto } from "$app/navigation";
import {toastMessage} from '$lib/stores';


  let user_info = $profile.user_info[0];
  let address1 = user_info.address1;
  let address2 = user_info.address2;
  let zipcode = user_info.zipcode;
  console.log(user_info);
  
  let handleflag = false;

  const handleComplete = ({ detail: { data }}) => {
      address1 = data.address;
      address2 = '';
      zipcode = data.zonecode;
      handleflag = false;
    }

  async function saveChange(){
    const {error} = await supabase.from('user_info').update({address1 : address1, address2 : address2, zipcode : zipcode}).match({user_id:user_info.user_id});
    $profile.user_info[0].address1 = address1;
    $profile.user_info[0].address2 = address2;
    $profile.user_info[0].zipcode = zipcode;
    $toastMessage = "저장되었습니다.";
    goto('/users/edit');
  }
</script>
<div class="bg-white h-14 px-4 items-center border-b flex">
  <Back icon = "arrow"/>
  <div
    class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800"
  >
    배송지 변경
  </div>
</div>

{#if handleflag === true}
<DaumPostcode on:complete={handleComplete} autoClose = "true"/>
{:else}
  <div class = "space-y-2 p-4">
    <label for="" class=" mt-4  font-bold block text-gray-500 mb-2"
      >주소</label
    >
    <div class="flex gap-2 mt-2">
      <input
        type="text"
        class="flex-1 h-14 border-gray-300 font-bold rounded-md text-sm placeholder-neutral-400"
        placeholder="우편번호"
        bind:value = {zipcode}
        disabled
      />
      <button on:click = {() => {handleflag = true;}}
        class="text-center p-2 border border-gray-300 rounded-md h-14 text-sm text-white font-bold flex items-center justify-center bg-blue-500 hover:bg-gray-300"
      >
        우편번호 검색
      </button>
    </div>

    <input
      type="text"
      class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
      placeholder="주소"
      bind:value = {address1}
      disabled
    />
    <input
      type="text"
      class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
      placeholder="상세주소"
      bind:value = {address2}
    />
  </div>

  <div class=" sm:mx-auto sm:max-w-sm px-4 pb-4 fixed bottom-0 w-full bg-white ">
    <button on:click = {saveChange}
      class="w-full h-12 rounded-full  text-center text-white bg-blue-600  hover:bg-gray-300"
      >저장하기</button
    >
  </div>
{/if}

