<script>
  import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
import { supabase } from "$lib/supabase";
  import {user,profile} from "$lib/stores";
  import {onMount} from "svelte";
  import DaumPostcode from 'svelte-daum-postcode';

  let defaultAddress1 = "";
  let defaultAddress2 = "";
  let defaultPhone = "";
  let defaultZipCode = "";
  let defaultName = "";
  let addressList = [];
  let addressOption;
  let zipcode = "";
  let address1 = "";
  let address2 = "";
  let phone = "";
  let name = "";
  let addressName = '';
  let handleFlag = false;
  let addressFlag = false;
  onMount ( async() => {
    defaultAddress1 = $profile.user_info[0].address1;
    defaultAddress2 = $profile.user_info[0].address2;
    defaultPhone = $profile.user_info[0].phone;
    defaultZipCode = $profile.user_info[0].zipcode;
    defaultName = $profile.name;
    addressList.push({
      address1: defaultAddress1,
      address2: defaultAddress2,
      phone: defaultPhone,
      zipcode: defaultZipCode,
      name: defaultName,
      addressName:"기본 배송지",
    });
    let data = await supabase.from('user_address').select().eq("user_id",$user.id);
    let temp = data.body;
    for(let i=0; i<temp.length; i++){
      addressList.push({
        address1: temp[i].address1,
        address2: temp[i].address2,
        phone: temp[i].phone,
        zipcode: temp[i].zipcode,
        name: temp[i].name,
        addressName: temp[i].name,
      });
    }
    addressList = addressList;
    addressOption = addressList[0];
    console.log(addressOption);
    
  })
  async function saveChange(){
    const {error} = await supabase.from('user_address').insert({address1 : address1, address2 : address2, phone : phone, zipcode : zipcode, name : name, address_name : addressName ,user_id : $user.id});
    addressList.push({
      address1: address1,
      address2: address2,
      phone: phone,
      zipcode: zipcode,
      name: name,
      addressName: addressName,
    });
    addressList = addressList;
    handleFlag = false;
  }

  const handleComplete = ({ detail: { data }}) => {
      address1 = data.address;
      address2 = '';
      zipcode = data.zonecode;
      addressFlag = false;
    }

  async function handleDelete(){
    console.log(addressOption);
    const data = await supabase.from('user_address').select().eq('address1',addressOption.address1).eq('address2',addressOption.address2).eq('phone',addressOption.phone).eq('zipcode',addressOption.zipcode).eq('name',addressOption.name).eq('address_name',addressOption.addressName).eq('user_id',$user.id);
    console.log(data);
  }
  
</script>

<div
	class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
>
	<Back icon="arrow" />
	<div class="flex w-full justify-center  font-bold text-base text-gray-800">배송지 관리</div>
</div>
<div class="pt-16" />


{#if handleFlag === true}
{#if addressFlag === true}
<DaumPostcode on:complete={handleComplete} autoClose = "true"/>
{:else}
<form class = "space-y-2 p-4" on:submit|preventDefault = {async () => {
  saveChange();
}}>
  <input
    type="text"
    class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
    placeholder="배송지 이름"
    bind:value = {addressName}
    required
  />
  <label for="" class=" mt-4  font-bold block text-gray-500 mb-2"
    >수령인 정보</label
  >
  
  <input
    type="text"
    class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
    placeholder="이름"
    bind:value = {name}
    required
  />
  <input
    type="text"
    class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
    placeholder="휴대폰 번호"
    bind:value = {phone}
    required
  />
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
    <button on:click = {() => {addressFlag = true;}}
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
    required
  />
  

<div class=" sm:mx-auto sm:max-w-sm px-4 pb-4 fixed bottom-0 left-0 right-0 w-full bg-white ">
  <button
    class="w-full h-12 rounded-full  text-center text-white bg-blue-600  hover:bg-gray-300"
    >저장하기</button
  >
</div>
</form>
{/if}
{:else}
<div class="flex bg-white">
  <div class="flex gap-1 overflow-x-auto px-4">
    <button on:click = {() => {handleFlag = true;}} class = "w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-full p-2"><Icon icon = "plus"/></button>
    {#each addressList as address, index}
      <button on:click = {() => {addressOption = address;}}
      class="whitespace-pre px-3 h-10 rounded-full text-sm border flex items-center justify-center  {address === addressOption? 'text-blue-500 border-2 border-blue-500 font-bold' : ''}"
    >
      {address.addressName}
    </button>
    {/each}
  </div>
</div>
{#if addressOption}
<div class="p-4 border-b flex justify-between">
<div class="font-bold">{addressOption.addressName}</div>
{#if addressOption !== addressList[0]}
<button on:click = {handleDelete} class="text-red-500 underline text-sm">삭제하기</button>
{/if}
</div>
<div class="px-4 space-y-2 border-b py-6">
  <div class="flex gap-6">
    <div class="text-gray-400 w-20">수령인</div>
    <div class="flex-1">{addressOption.name}</div>
  </div>
  <div class="flex gap-6">
    <div class="text-gray-400 w-20">휴대폰</div>
    <div class="flex-1">{addressOption.phone}</div>
  </div>
  <div class="flex gap-6">
    <div class="text-gray-400 w-20">우편번호</div>
    <div class="flex-1">{addressOption.zipcode}</div>
  </div>
  <div class="flex gap-6">
    <div class="text-gray-400 w-20 ">주소</div>
    <div class="flex-1">{addressOption.address1}&nbsp{addressOption.address2}</div>
  </div>
</div>
{/if}
{/if}