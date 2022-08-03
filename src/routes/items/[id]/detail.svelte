<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { user, itemData } from '$lib/stores';
	import { toastMessage } from '$lib/stores';
	import { addComma } from '$lib/util';
	import { page } from '$app/stores';
	import { modal } from '$lib/stores';
	import axios from 'axios';
import { goto } from '$app/navigation';
	let item = [];
	let itemID = '';
	let itemName = '';
	let itemImage = ' ';
	let itemPrice = ' ';
	let itemNormalPrice = ' ';
	let itemDescription = ' ';
	let itemBrand = ' ';
	let options = [];
	let selected;
	let selectedItems = [];
	let optionValue;
	let totalPrice=0;
	let likeFlag = false;
	let buyFlag = false;

	onMount(async () => {
		let data = await supabase.from('item').select('*,brand(*),option(*)').eq('id', $page.params.id);
		item = data.body[0];
		itemID = item.id;
		itemName = item.name;
		itemBrand = item.brand.brandname;
		itemImage = item.image;
		itemPrice = item.price;
		itemNormalPrice = item.normal_price;
		itemDescription = item.description;
		options = item.option;
		if (user) {
			let likeData = await supabase
				.from('like')
				.select()
				.eq('user_id', $user.id)
				.eq('item_id', $page.params.id);
			if (likeData.body[0]) {
				likeFlag = true;
			}
		}

	});

	onDestroy(async () => {
		$modal = null;
	});

	async function handleLike() {
		if (likeFlag) {
			await supabase.from('like').delete().eq('item_id', $page.params.id).eq('user_id', $user.id);
			likeFlag = false;
			$toastMessage = '찜하기 취소되었습니다.';
		} else {
			await supabase.from('like').insert({ item_id: $page.params.id, user_id: $user.id });
			likeFlag = true;
			$toastMessage = '상품을 찜하였습니다.';
		}
	}
	function handleOptionSelect() {
		optionValue = selected;
		let optionFlag = false;
		for(let i=0; i<selectedItems.length; i++){
			if(selectedItems[i].option ===optionValue){
				optionFlag = true;
			}
		}
		let optionID ;
		if(optionFlag === false){
			for(let i=0; i<options.length; i++){
				if(selected === options[i].option){
					optionID = options[i].id;
				}
			}
			selected = null;
		selectedItems.push({itemID : itemID, optionID : optionID, price : itemPrice, option: optionValue, quantity: 1 });
		selectedItems = selectedItems;
		totalPrice = totalPrice + itemPrice;
		}
		else{
			$modal = {
			title: '이미 선택된 옵션입니다.',
			message: '',
			buttons: [
				
				{
					title: '확인',
					onClick: () => {
						$modal = null;
					}
				}
			]
		};
		}
	}
	function handleAmountPlus(index){
		
		selectedItems[index].quantity = selectedItems[index].quantity + 1;
		totalPrice = totalPrice + itemPrice;
	}

	function handleAmountMinus(index){
		if(selectedItems[index].quantity === 1){
			$modal = {
			title: '더이상 줄일 수 없습니다.',
			message: '',
			buttons: [
				
				{
					title: '확인',
					onClick: () => {
						$modal = null;
					}
				}
			]
		};
		}
		else{
			selectedItems[index].quantity = selectedItems[index].quantity - 1;
		totalPrice = totalPrice - itemPrice;
		}
	}
	function handleItemDelete(index){
		totalPrice = totalPrice - (selectedItems[index].quantity * itemPrice);
		let tempArray = selectedItems.splice(index,1);
		selectedItems = selectedItems;
	}

	async function handleCartClick() {
		if(selectedItems.length === 0){
			$modal = {
			title: '상품을 선택해주세요.',
			message: '',
			buttons: [
				{
					title: '확인',
					onClick: () => {
						$modal = null;
					}
				}
			]
		};
		}
		else{
			try{
				const {data} = await axios.post('/apis/cart',{selectedItems,session : supabase.auth.session()});
				$modal = {
			title: '장바구니에 추가되었습니다.' +
			 '장바구니로 이동하시겠습니까?',
			message: '',
			buttons: [
				{
					title: '이동하기',
					message: 'logout',
					onClick: async () => {
						goto('/orders/cart');
					}
				},
				{
					title: '쇼핑 계속하기',
					onClick: () => {
						$modal = null;
					}
				}
			]
		};
			}catch(error){
				$toastMessage = "장바구니에 추가하던 중 오류가 발생했습니다.";
				console.log(error);
			}
		}
	}

	async function handleBuyClick() {
		if(selectedItems.length === 0) {
			$toastMessage = '상품을 선택해주세요';
		}
		else{
			$itemData = selectedItems;
			goto("/orders/payment");
		}
	}
</script>

<div
	class="fixed sm:mx-auto sm:max-w-sm top-0 right-0 left-0 bg-white h-14 px-4 items-center border-b flex justify-center"
>
	<Back icon="arrow" />
	<div class="flex font-bold text-base px-8  text-gray-800 truncate">
		{itemName}
	</div>
</div>
<div class="pt-14" />

<div class=" flex justify-center">
	<img class="h-72 w-full object-cover" src={itemImage} />
</div>

<div class="p-4">
	<div class="flex">
		<div class="font-bold text-xl flex-1 justify-between items-center">
			{itemName}
		</div>
		{#if user}
			<button
				on:click={() => {
					handleLike();
				}}
				class=" text-red-400 font-bold  bg-gray-100   py-2 px-2 rounded-full"
			>
				<div class="flex gap-2 justify-center items-center text-sm ">
					{#if likeFlag}
						<Icon icon="heart-fill" />찜하기
					{:else}
						<Icon icon="heart" />찜하기
					{/if}
				</div>
			</button>
		{/if}
	</div>
	<div class="text-gray-400 text-sm font-bold">{itemBrand}</div>
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
			너무 좋은 것 같아요 다음에도 이용하겠습니다.너무 좋은 것 같아요 다음에도 이용하겠습니다.너무
			좋은 것 같아요 다음에도 이용하겠습니다.
		</div>
	</div>
</div>
<div class="pb-20" />

{#if buyFlag == true}
	<div class="pt-40"></div>
	<div class="fixed sm:mx-auto sm:max-w-sm bottom-0 bg-white   left-0 right-0">
		<button
			on:click={() => {
				buyFlag = false;
			}}
			class="flex justify-center items-center w-full pb-2 text-gray-500"
		>
			<Icon icon="chevron-down" />
		</button>
		<div class="pb-4 px-2">
			<select
				bind:value={selected}
				on:change={() => {
					handleOptionSelect();
				}}
				class="w-full text-center rounded-md"
			>
				<option value={null}>옵션 선택</option>
				{#each options as option}
					<option value={option.option}>{option.option}</option>
				{/each}
			</select>
		</div>

			<div class="bg-gray-100 p-2">
				{#if selectedItems.length > 0}
				<div class="bg-white p-2">
					{#each selectedItems as selectedItem, index}
					<div class="pb-2">
						<div class=" flex justify-between text-sm items-center">
							<div class="text-gray-500 w-12">{selectedItem.option}</div>
							<div class="flex items-center ">
								<button on:click={()=>{handleAmountMinus(index)}} class = "w-8 h-8 bg-gray-200 flex justify-center items-center"><Icon icon = "minus"/></button>
								<div class="font-bold w-8 h-8 flex items-center justify-center">{selectedItem.quantity}</div>
								<button on:click={()=>{handleAmountPlus(index)}} class = "w-8 h-8 bg-gray-200 flex justify-center items-center"><Icon icon = "plus"/></button>
							</div>
							<div class="flex items-center gap-2">
								<div class="font-bold">{addComma(selectedItem.quantity * (itemPrice * 1))}원</div>
								<button on:click = {() => {handleItemDelete(index)}}><Icon icon="x" /></button>
								
							</div>
						</div>
					</div>
					{/each}
				</div>
				{/if}
				<div class="flex justify-between text-lg font-bold p-2">
					<div class="">상품 {selectedItems.length}개</div>
					<div class="">{addComma(totalPrice)}원</div>
				</div>
			</div>
		

		<div class="flex gap-2 p-2">
			<button on:click = {handleCartClick}
			  class="w-full h-12 border rounded-full border-blue-700 text-sm text-blue-700">
				장바구니 담기
			</button>

			<button on:click = {handleBuyClick}
				class="block text-center w-full bg-blue-500 rounded-full  h-12 text-sm text-white font-bold flex items-center justify-center"
			>
				바로구매
			</button>
		</div>
	</div>
{:else}
	<div class="fixed sm:mx-auto sm:max-w-sm bottom-0 bg-white p-2 flex gap-2  left-0 right-0">
		<button
			on:click={() => {
				buyFlag = true;
			}}
			class="w-full h-12 border rounded-md bg-blue-500 text-sm text-white font-bold"
		>
			구매하기
		</button>
	</div>
{/if}
