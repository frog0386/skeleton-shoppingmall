<script>
import Icon from '$lib/Icon.svelte';
  import Back from '$lib/Back.svelte';
  import {onMount} from 'svelte';
  import { supabase } from '$lib/supabase';
  import {user} from '$lib/stores'
  import {toastMessage} from '$lib/stores';
  import { addComma } from '$lib/util';
  import { page } from '$app/stores';
  let item = [];
  let itemName='';
  let itemImage = ' ';
  let itemPrice = ' ';
  let itemNormalPrice = ' ';
  let itemDescription = ' ';
  let likeFlag = false;
  
  onMount ( async () => {
    let data = await supabase.from('item').select('*').eq('id',$page.params.id);
    item = data.body[0];
    itemName = item.name;
    itemImage = item.image;
    itemPrice = item.price;
    itemNormalPrice = item.normal_price;
    itemDescription = item.description;
    if(user){
      let likeData = await supabase.from('like').select().eq('user_id',$user.id).eq('item_id',$page.params.id);  
      if(likeData.body[0]){
        likeFlag = true;
      }
    }
  });

  async function handleLike() {
    if(likeFlag){
      await supabase.from('like').delete().eq('item_id',$page.params.id).eq('user_id',$user.id);
      likeFlag = false;
      $toastMessage='찜하기 취소되었습니다.';
    }
    else{
      await supabase.from('like').insert({item_id : $page.params.id, user_id : $user.id});
      likeFlag = true;
      $toastMessage='상품을 찜하였습니다.';
    }
  }
</script>

<div
  class="fixed sm:mx-auto sm:max-w-sm top-0 right-0 left-0 z-10 bg-white h-14 px-4 items-center border-b flex justify-center"
>
  <Back icon = "arrow"/>
  <div
    class="flex font-bold text-base px-8 text-gray-800 truncate"
  >
    {itemName}
  </div>
</div>
<div class="pt-14" />

<div class="relative flex justify-center">
  <img
    class="h-72 w-full object-cover"
    src={itemImage}
  />
</div>

<div class="p-4">
  <h1 class="font-bold flex justify-between items-center">
    {itemName}
    {#if user}
    <button on:click = {() => {handleLike()}}
      class=" text-red-400 font-bold  bg-gray-100   py-2 px-2 rounded-full"
    >
      <div class="flex gap-2 justify-center items-center text-sm ">
        {#if likeFlag}
        <Icon icon="heart-fill"  />찜하기
        {:else}
        <Icon icon="heart"  />찜하기
        {/if}
      </div>
    </button>
    {/if}
  </h1>
  <div class="mt-1 flex justify-between">
    <div>
      <span class="text-xl font-bold">{addComma(itemPrice)}원</span>
      <span class="line-through text-gray-400">{addComma(itemNormalPrice)}원</span>
    </div>
    <div class="text-sm text-gray-500 flex items-center gap-1">
      <span class="text-yellow-300">
        <Icon icon="star" size={16} />
      </span>
      4.9(2,321)
    </div>
  </div>
<!---
  <h3 class="font-bold my-4 border-t pt-2">상품정보</h3>
  <div class="flex text-sm mt-2">
    <div class="text-gray-500 w-24">판매단위</div>
    <div class="col-span-2">팩</div>
  </div>
  <div class="flex text-sm mt-2">
    <div class="text-gray-500 w-24">중량/용량</div>
    <div class="col-span-2">6~9입</div>
  </div>
  <div class="flex text-sm mt-2">
    <div class="text-gray-500 w-24">배송구분</div>
    <div class="col-span-2">새벽배송/택배배송</div>
  </div>
  <div class="flex text-sm mt-2">
    <div class="text-gray-500 w-24">원산지</div>
    <div class="col-span-2">국산</div>
  </div>
--->
  <h3 class="font-bold my-4 border-t pt-2">상품 상세설명</h3>

  <div class="mb-4 text-gray-500 text-sm mt-2">
    {itemDescription}
  </div>

  <h3 class="font-bold my-4 border-t pt-2">리뷰 1</h3>

  <div class="rounded bg-gray-100 p-4 mt-2">
    <div class="flex items-center gap-2 text-sm ">
      <span class="font-bold"> 줴임스 </span>
      <div class="span text-yellow-300 flex">
        <Icon icon="star" size={14} />
        <Icon icon="star" size={14} />
        <Icon icon="star" size={14} />
        <Icon icon="star" size={14} />
        <Icon icon="star" size={14} />
      </div>
      <span class="flex-1 text-right text-gray-400 "> 3일 전 </span>
    </div>
    <div class="text-sm mt-2">
      너무 좋은 것 같아요 다음에도 이용하겠습니다.너무 좋은 것 같아요 다음에도
      이용하겠습니다.너무 좋은 것 같아요 다음에도 이용하겠습니다.
    </div>
  </div>
</div>
<div class="pb-20" />
