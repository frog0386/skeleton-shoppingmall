<script>
import { goto } from '$app/navigation';
  import Icon from '$lib/Icon.svelte';
  import { user, profile } from '$lib/stores';
  import { supabase } from '$lib/supabase';
  import {onMount} from 'svelte';
  import {modal} from '$lib/stores';
  import Back from '$lib/Back.svelte' ;

  let user_info = $profile.user_info[0];
  let username = $profile.user_info[0].username;
  let name = $profile.name;
  let email = $profile.email;
  

  let flag_info = false;
  let flag_address = false;
  onMount(() => {
    if(user_info.phone === null){
      flag_info = true;
    }
    if(user_info.address1 === null){
      flag_address = true;
    }
	});
  
  function handleModal(){
    $modal = {title : "로그아웃 하시겠습니까?", message : "", buttons : [
      {
        title : "로그아웃",
        message : "logout",
        onClick : async () => {
          await supabase.auth.signOut();
          $user = null;
          $profile = null;
          goto('/');
        },
      },
      {
        title : "취소",
        onClick : () => {
          $modal = null;
        }
      }
    ]};
  }
</script>

<div class="bg-white h-14 px-4 items-center border-b flex">
  <Back/>
  <div
    class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800"
  >
    내정보관리
  </div>
</div>

<div class="flex justify-between items-center p-4">
  <div class="flex items-center gap-4 ">
    <div class="relative flex justify-center w-16 h-16">
      {#if user_info.profileimage === null}
				<img alt = "profileImage_none" src="https://mblogthumb-phinf.pstatic.net/MjAxNzEyMTdfMjYy/MDAxNTEzNTEyMDk1MjIy.kvBTUStr5otnfzCcABVd7yXmVoY7mCZOljrv93z8E1wg.W4e90cbW47lOcvB3TQCDOZlPK9hQNAEqud95xoUrBt4g.PNG.brhyme/%EA%B3%B5%ED%8F%AC%EC%9D%98_%EC%B9%B4%ED%86%A1_%EA%B8%B0%EB%B3%B8_%ED%94%84%EC%82%AC.png?type=w800" class="w-16 h-16 rounded-full" />
				{:else}
				<img
					alt = "profileImage" src={user_info.profileimage}
					class="w-16 h-16 border rounded-full object-cover"
				/>
				{/if}
      <div
        class="absolute left-10 top-8 flex items-center justify-center w-9 h-9 border rounded-full bg-white text-gray-400"
      >
        <Icon icon="camera" size={16} />
      </div>
    </div>

    <div class="font-bold text-lg ml-4">{username}</div>
  </div>

  <div class=" text-xs text-right  h-8 w-320 ">
    <div class="text-gray-400">다른 고객님이라면,</div>
    <button on:click = {handleModal} class="text-blue-500 ">로그아웃</button>
  </div>
</div>
<div class="p-4 font-bold border-y">회원정보</div>
{#if flag_info === true}
  <a href = "/users/editprofile" class="text-gray-400 h-40 flex justify-center items-center space-x-2">
    <Icon icon = "smartphone" size = {32}/>
    <div class="">휴대폰 인증을 진행해주세요.</div>
  </a>
{:else}
<div class="px-4 space-y-2 border-t py-6">
  <div class="flex gap-6">
    <div class="text-gray-400 w-14 ">고객명</div>
    <div class="">{name}</div>
    <a href = "/users/editprofile" class="flex flex-1 text-blue-500 justify-end">
      회원정보 수정<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-right"
        ><polyline points="9 18 15 12 9 6" /></svg
      >
    </a>
  </div>
  <div class="flex gap-6">
    <div class="text-gray-400 w-14 ">이메일</div>
    <div class="">{email}</div>
  </div>
  <div class="flex gap-6">
    <div class="text-gray-400 w-14 ">닉네임</div>
    <div class="">{username}</div>
  </div>
  <div class="flex gap-6">
    <div class="text-gray-400 w-14">연락처</div>
    <div class="">{user_info.phone}</div>
  </div>
</div>
{/if}

<div class="p-4 font-bold border-y">배송지 관리</div>
{#if flag_address === true}
<a href = "/users/editaddress" class="text-gray-400 h-40 flex justify-center items-center space-x-4">
  <Icon icon = "map" size = {32}/>
  <div class="">주소를 등록해주세요.</div>
</a>
{:else}
<div class="px-4 space-y-2 border-b py-6">
  <div class="flex gap-6">
    <div class="text-gray-400 w-14">우편번호</div>
    <div class="">{user_info.zipcode}</div>
    <a href = "/users/editaddress" class="flex flex-1 text-blue-500 justify-end">
      배송지 수정<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-right"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>
  </div>
  <div class="flex gap-6">
    <div class="text-gray-400 w-14 ">주소</div>
    <div class="">{user_info.address1 + ' '}{user_info.address2}</div>
  </div>
  
</div>
{/if}


<div class="mx-4">
  <button
    class="mt-4 w-full rounded-full  border h-10 flex justify-center items-center border-gray-300 text-gray-300 text-sm hover:bg-gray-400 "
    >회원 탈퇴</button
  >
</div>