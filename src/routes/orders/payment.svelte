<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';

	import { onMount, onDestroy } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { addComma } from '$lib/util';
	import { user, profile, itemData, cartData } from '$lib/stores';
	import axios from 'axios';
	import { toastMessage } from '$lib/stores';
	let name = '';
	let address1 = '';
	let address2 = '';
	let phone = '';
	let itemList = [];
  let cartList = [];
	let items = [];
	let option = [];
	let quantity = [];
	let sailPriceSum = 0;
	let normalPriceSum = 0;
	onMount(async () => {
		name = $profile.name;
		address1 = $profile.user_info[0].address1;
		address2 = $profile.user_info[0].address2;
		phone = $profile.user_info[0].phone;

		if ($itemData) {
			itemList = $itemData;
			for (let i = 0; i < itemList.length; i++) {
				option[i] = itemList[i].option;
				quantity[i] = itemList[i].quantity;
				let data = await supabase
					.from('item')
					.select('*,brand(*),option(*)')
					.eq('id', itemList[i].itemID);
				items.push(data.body[0]);
        sailPriceSum = countSailSum_item();
		    normalPriceSum = countNormalPriceSum_item();
			}
			items = items;
		} else if ($cartData) {
      console.log($cartData);
			cartList = $cartData;
      for(let i=0; i<cartList.length; i++){
        option[i] = cartList[i].option.option;
        quantity[i] = cartList[i].quantity;
      }
      sailPriceSum = countSailSum_cart();
      normalPriceSum = countNormalPriceSum_cart();
		}
	});
	onDestroy(() => {
		$itemData = null;
		$cartData = [];
	});
	function countSailSum_item() {
		let sailPriceSum = 0;
		for (let i = 0; i < items.length; i++) {
			sailPriceSum += items[i].normal_price * quantity[i] - items[i].price * quantity[i];
		}
		return sailPriceSum;
	}
	function countNormalPriceSum_item() {
		let priceSum = 0;
		for (let i = 0; i < items.length; i++) {
			priceSum += items[i].normal_price * quantity[i];
		}
		return priceSum;
	}
  function countSailSum_cart() {
		let sailPriceSum = 0;
		for (let i = 0; i < cartList.length; i++) {
			sailPriceSum += cartList[i].item.normal_price * quantity[i] - cartList[i].item.price * quantity[i];
		}
		return sailPriceSum;
	}
	function countNormalPriceSum_cart() {
		let priceSum = 0;
		for (let i = 0; i < cartList.length; i++) {
			priceSum += cartList[i].item.normal_price * quantity[i];
		}
		return priceSum;
	}
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
		<a href="/orders/address" class="text-blue-600 border-b border-blue-600  font-bold text-xs">
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
<div class=" p-4 border-b ">
	<div class=" text-lg font-bold">구매 상품 목록</div>
</div>
{#if itemList.length !==0}
{#each items as item, index}
	<div class="flex gap-2 p-4 border-b">
		<img src={item.image} class="flex items-end overflow-hidden w-24 h-24 rounded bg-white" />
		<div class="flex flex-col">
			<div class="flex justify-between">
				<div class="flex flex-col gap-2">
					<div class="mb-1 text-xs text-neutral-500">{item.brand.brandname}</div>
					<div class="w-48 truncate font-bold">
						{item.name}
					</div>
					<div class="flex  gap-2 items-center">
						<div class="font-semibold">{addComma(item.price)}원</div>
						<div class="font-bold line-through text-gray-400">
							{addComma(item.normal_price)}원
						</div>
					
					</div>
          <div class="flex gap-2">
            <div class="text-sm text-gray-600 ">옵션 :{option[index]}</div>
            <div class="text-sm text-gray-600">수량 : {quantity[index]}</div>
          </div>
				</div>
			</div>
		</div>
	</div>
{/each}


<div class="p-4 space-y-2 border-b">
  <div class="font-bold text-lg ">할인 정보</div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">상품 할인</div>
    <div class=" ">{addComma(sailPriceSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">등급 할인</div>
    <div class=" ">0원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm font-bold ">할인합계</div>
    <div class="text-blue-600 font-bold  ">{addComma(sailPriceSum)}원</div>
  </div>
</div>

<div class="p-4 border-b">
  <div class="font-bold text-lg ">결제 정보</div>
  <div class="grid grid-cols-3 " />
  <div class="flex justify-between gap-4 py-2">
    <button class="border-2 rounded-md w-full h-12 font-bold">신용카드</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">가상계좌</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">계좌이체</button>
  </div>
  <div class="flex justify-between gap-4 py-2">
    <button class="border-2 rounded-md w-full h-12 font-bold">휴대폰결제</button
    >
    <button class="border-2 rounded-md w-full h-12 font-bold">토스페이</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">카카오페이</button
    >
  </div>
  <div class="flex justify-between gap-4 py-2">
    <button class="border-2 rounded-md w-full h-12 font-bold">삼성페이</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">네이버페이</button
    >
    <button class="border-2 rounded-md w-full h-12 font-bold">페이코</button>
  </div>
</div>

<div class="p-4 space-y-2">
  <div class="font-bold text-lg ">최종 결제 금액</div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">상품 금액</div>
    <div class=" ">{addComma(normalPriceSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">할인 합계</div>
    <div class=" ">{addComma(sailPriceSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm font-bold ">결제 금액</div>
    <div class="text-blue-600 font-bold  ">{addComma(normalPriceSum-sailPriceSum)}원</div>
  </div>
</div>

<div class="pb-20" />
<div class="px-4 pb-4 fixed bottom-0 left-0 right-0 sm:mx-auto sm:max-w-sm bg-white ">
  <button class="w-full h-14 rounded-full  text-center text-white bg-blue-600 font-bold hover:bg-gray-600"
    >{addComma(normalPriceSum-sailPriceSum)}원 결제하기</button
  >
</div>
{:else if cartList.length!==0}
{#each cartList as list, index}
<div class="flex gap-2 p-4 border-b">
  <img src={list.item.image} class="flex items-end overflow-hidden w-24 h-24 rounded bg-white" />
  <div class="flex flex-col">
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <div class="mb-1 text-xs text-neutral-500">{list.brand}</div>
        <div class="w-48 truncate font-bold">
          {list.item.name}
        </div>
        <div class="flex  gap-2 items-center">
          <div class="font-semibold">{addComma(list.item.price)}원</div>
          <div class="font-bold line-through text-gray-400">
            {addComma(list.item.normal_price)}원
          </div>
        
        </div>
        <div class="flex gap-2">
          <div class="text-sm text-gray-600 ">옵션 :{option[index]}</div>
          <div class="text-sm text-gray-600">수량 : {quantity[index]}</div>
        </div>
      </div>
    </div>
  </div>
</div>
{/each}

<div class="p-4 space-y-2 border-b">
  <div class="font-bold text-lg ">할인 정보</div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">상품 할인</div>
    <div class=" ">{addComma(sailPriceSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">등급 할인</div>
    <div class=" ">0원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm font-bold ">할인합계</div>
    <div class="text-blue-600 font-bold  ">{addComma(sailPriceSum)}원</div>
  </div>
</div>

<div class="p-4 border-b">
  <div class="font-bold text-lg ">결제 정보</div>
  <div class="grid grid-cols-3 " />
  <div class="flex justify-between gap-4 py-2">
    <button class="border-2 rounded-md w-full h-12 font-bold">신용카드</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">가상계좌</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">계좌이체</button>
  </div>
  <div class="flex justify-between gap-4 py-2">
    <button class="border-2 rounded-md w-full h-12 font-bold">휴대폰결제</button
    >
    <button class="border-2 rounded-md w-full h-12 font-bold">토스페이</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">카카오페이</button
    >
  </div>
  <div class="flex justify-between gap-4 py-2">
    <button class="border-2 rounded-md w-full h-12 font-bold">삼성페이</button>
    <button class="border-2 rounded-md w-full h-12 font-bold">네이버페이</button
    >
    <button class="border-2 rounded-md w-full h-12 font-bold">페이코</button>
  </div>
</div>
<div class="p-4 space-y-2">
  <div class="font-bold text-lg ">최종 결제 금액</div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">상품 금액</div>
    <div class=" ">{addComma(normalPriceSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm text-gray-500 ">할인 합계</div>
    <div class=" ">{addComma(sailPriceSum)}원</div>
  </div>
  <div class="flex justify-between">
    <div class="text-sm font-bold ">결제 금액</div>
    <div class="text-blue-600 font-bold  ">{addComma(normalPriceSum-sailPriceSum)}원</div>
  </div>
</div>

<div class="pb-20" />
<div class="px-4 pb-4 fixed bottom-0 left-0 right-0 sm:mx-auto sm:max-w-sm bg-white ">
  <button class="w-full h-14 rounded-full  text-center text-white bg-blue-600 font-bold hover:bg-gray-600"
    >{addComma(normalPriceSum-sailPriceSum)}원 결제하기</button
  >
</div>
{/if}