<script>
  import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { addComma, dateFormat, } from '$lib/util';
	import { user} from '$lib/stores';
  import { page } from '$app/stores';
  
  let orderId = '';
  let orderInfo = [];
  let orderTime = '';
  let items = [];
  let options = [];
  let name = '';
  let phone = '';
  let address1 = '';
  let address2 = '';
  let normalPriceSum = 0; 
  let saleSum = 0;
  let paidSum = 0;
  let orderFlag = false;
  onMount(async () => {
    orderId = $page.params.id;
    let data = await supabase.from('order').select('*,line_item(*,item(*,brand(*)),option(*)),user_address(*)').eq('id', orderId);
    orderInfo = data.body[0];
    console.log(orderInfo);
    orderTime = dateFormat(orderInfo.created_at);
    name = orderInfo.user_address.name;
    phone = orderInfo.user_address.phone;
    address1 = orderInfo.user_address.address1;
    address2 = orderInfo.user_address.address2;
    orderFlag = true;
    /*
    for(let i=0; i<orderInfo.line_item.length; i++){
      let itemData = await supabase.from('item').select('*,brand(*)').eq('id',orderInfo.line_item[i].item_id);
      items[i] = itemData.body[0];
      let optionData = await supabase.from('option').select().eq('id',orderInfo.line_item[i].option_id);
      options[i] = optionData.body[0];
    }
    let addressData = await supabase.from('user_address').select('*').eq('id',orderInfo.address_id);
    address = addressData.body[0];
    */
    for(let i=0; i<orderInfo.line_item.length; i++){
      normalPriceSum += orderInfo.line_item[i].quantity * orderInfo.line_item[i].item.normal_price;
      saleSum += orderInfo.line_item[i].quantity * (orderInfo.line_item[i].item.normal_price - orderInfo.line_item[i].item.price);
    }
    paidSum = normalPriceSum - saleSum;
  })

</script>

<div
	class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
>
	<Back icon="arrow" />
	<div class="flex w-full justify-center  font-bold text-base text-gray-800">주문 상세내역</div>
</div>
<div class="pt-16" />

<div class="font-bold text-sm px-4 py-2 border-b">
  <div class="">주문번호 : {orderId}</div>
  <div class="">주문일시 : {orderTime}</div>
</div>

{#if orderFlag === true}
{#each orderInfo.line_item as item, index}
<div class="flex gap-2 p-4 border-b">
  <img src = {item.item.image}
    class="flex items-end overflow-hidden w-24 h-24 border rounded bg-white"
  />
  <div class="flex flex-col">
    <div class="flex gap-2 justify-between">
      <div class="flex flex-col mt-2">
        <div class="mb-1 text-xs text-neutral-500">{item.item.brand.brandname}</div>
        <div class="w-48 text-sm truncate">
          {item.item.name}
        </div>
        <div class="text-xs text-gray-400">옵션 : {item.option.option}, 수량 : {item.quantity}</div>
        <div class=" font-semibold">{addComma(item.item.price)}원</div>
      </div>
    </div>
  </div>
</div>
{/each}
{/if}


<div class="space-y-2 p-4 space-y-4 border-b">
  <div class="font-bold ">배송지 정보</div>
  <div class="flex justify-between ">
    <div class="text-gray-500 text-sm">수령인</div>
    <div class="">{name}</div>
  </div>
  <div class="flex justify-between">
    <div class="text-gray-500 text-sm">연락처</div>
    <div class="">{phone}</div>
  </div>
  <div class="flex justify-between">
    <div class="text-gray-500 text-sm">배송지</div>
    <div class="">{address1}&nbsp{address2}</div>
  </div>
</div>

<div class="space-y-2 p-4 space-y-4 border-b">
  <div class="font-bold ">결제 정보</div>
  <div class="flex justify-between ">
    <div class="text-gray-500 text-sm">결제 수단</div>
    <div class="">체크카드 / 일시불</div>
  </div>
  <div class="flex justify-between">
    <div class="text-gray-500 text-sm">상품 총 금액</div>
    <div class="">{addComma(normalPriceSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-gray-500 text-sm">총 할인</div>
    <div class="">{addComma(saleSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-gray-500 text-sm">결제금액</div>
    <div class="font-bold text-blue-600">{addComma(paidSum)}원</div>
  </div>
</div>
