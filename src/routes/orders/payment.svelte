<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';

	import { onMount, onDestroy } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { addComma } from '$lib/util';
	import { user, profile, itemData, cartData } from '$lib/stores';
	import axios from 'axios';
	import { toastMessage } from '$lib/stores';
	import { goto } from '$app/navigation';
	import DaumPostcode from 'svelte-daum-postcode';
	let addressList = [];
	let itemList = [];
	let cartList = [];
	let items = [];
	let option = [];
	let quantity = [];
	let sailPriceSum = 0;
	let normalPriceSum = 0;
	let addressOption;
	let addressFlag = false;
	let addressEditFlag = false;
	let addressSearchFlag = false;
	let addressName = '';
	let name = '';
	let phone = '';
	let zipcode = '';
	let address1 = '';
	let address2 = '';
	let request = '';
	onMount(async () => {
		let addressData = await supabase.from('user_address').select().eq('user_id', $user.id).eq('status','active');
		addressList = addressData.body;
		addressOption = addressList[0];

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
				items[i].option = option[i];
				items[i].quantity = quantity[i];
				let optionIdValue = await supabase
					.from('option')
					.select('id')
					.eq('option', items[i].option)
					.eq('item_id', items[i].id);
				items[i].optionId = optionIdValue.body[0].id;
				sailPriceSum = countSailSum_item();
				normalPriceSum = countNormalPriceSum_item();
			}
			items = items;
		} else if ($cartData) {
			console.log($cartData);
			cartList = $cartData;
			for (let i = 0; i < cartList.length; i++) {
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
			sailPriceSum +=
				cartList[i].item.normal_price * quantity[i] - cartList[i].item.price * quantity[i];
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
	async function handlePayClick() {
		if(!addressOption){
			$toastMessage = "배송지를 지정해주세요."
		}
		else{
			addressOption.request = request;
			if ($itemData) {
			let response = await axios.post('/apis/pay', {
				data: {items,addressOption},
				session: supabase.auth.session(),
				flag: 0
			});
			if (response.status === 200) {
				$toastMessage = '결제가 완료되었습니다.';
				goto('/orders/success');
			} else {
				$toastMessage = '오류가 발생했습니다.';
			}
		} else if ($cartData) {
			let response = await axios.post('/apis/pay', {
				data: {cartList,addressOption},
				session: supabase.auth.session(),
				flag: 1
			});
			if (response.status === 200) {
				$toastMessage = '결제가 완료되었습니다.';
				goto('/orders/success');
			} else {
				$toastMessage = '오류가 발생했습니다.';
			}
		}
		}

	}

	const handleComplete = ({ detail: { data } }) => {
		address1 = data.address;
		address2 = '';
		zipcode = data.zonecode;
		addressSearchFlag = false;
	};

	async function saveAddress(){
		const {data} = await supabase.from('user_address').insert({name : name, address_name : addressName, zipcode : zipcode, address1 : address1, address2 : address2, phone : phone, user_id : $user.id, status : "active"});
		let id = data[0].id
		addressList.push({
      address1: address1,
      address2: address2,
      phone: phone,
      zipcode: zipcode,
      name: name,
      address_name: addressName,
			id : id
    });
		addressList = addressList;
		addressEditFlag = false;
		name = '';
		addressName = '';
		zipcode = '';
		address1 = '';
		address2 = '';
		phone = '';
	}
	async function handleDelete(){
		await supabase.from('user_address').update({status : "inactive"}).eq('id',addressOption.id);
		let index = addressList.indexOf(addressOption);
		let temp = addressList.splice(index,1);
		addressList = addressList;
		addressOption = null;
	}
	function handleAddressUseClick(){

		addressFlag = false;
	}
</script>

{#if addressFlag === true}
	{#if addressEditFlag === true}
		{#if addressSearchFlag === true}
		<div
				class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
			>
				<button
					on:click={() => {
						addressSearchFlag = false;
					}}
					class="absolute left-4 top-4 text-gray-400"
				>
					<Icon icon="x" />
				</button>
				<div class="flex w-full justify-center  font-bold text-base text-gray-800">주소 검색</div>
			</div>
			<div class="pt-16"> </div>
			<DaumPostcode on:complete={handleComplete} autoClose="true" />
		{:else}
			<div
				class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
			>
				<button
					on:click={() => {
						addressEditFlag = false;
					}}
					class="absolute left-4 top-4 text-gray-400"
				>
					<Icon icon="x" />
				</button>
				<div class="flex w-full justify-center  font-bold text-base text-gray-800">배송지 추가</div>
			</div>
			<form class="space-y-2 p-4" on:submit|preventDefault={async () => {saveAddress();}}>
				<div class="pt-12" />
				<label for="" class=" mt-4  font-bold block text-gray-500 mb-2">배송지명</label>
				<input
					type="text"
					class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
					placeholder="배송지 이름"
					bind:value={addressName}
					required
				/>
				<label for="" class=" mt-4  font-bold block text-gray-500 mb-2">수령인 정보</label>

				<input
					type="text"
					class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
					placeholder="이름"
					bind:value={name}
					required
				/>
				<input
					type="text"
					class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
					placeholder="휴대폰 번호"
					bind:value={phone}
					required
				/>
				<label for="" class=" mt-4  font-bold block text-gray-500 mb-2">주소</label>
				<div class="flex gap-2 mt-2">
					<input
						type="text"
						class="flex-1 h-14 border-gray-300 font-bold rounded-md text-sm placeholder-neutral-400"
						placeholder="우편번호"
						bind:value={zipcode}
						disabled
					/>
					<button
						on:click={() => {
							addressSearchFlag = true;
						}}
						type="button"
						class="text-center p-2 border border-gray-300 rounded-md h-14 text-sm text-white font-bold flex items-center justify-center bg-blue-500 hover:bg-gray-300"
					>
						우편번호 검색
					</button>
				</div>

				<input
					type="text"
					class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
					placeholder="주소"
					bind:value={address1}
					disabled
				/>
				<input
					type="text"
					class="w-full h-14 border-gray-300 rounded text-sm placeholder-neutral-400"
					placeholder="상세주소"
					bind:value={address2}
					required
				/>

				<div
					class=" sm:mx-auto sm:max-w-sm px-4 pb-4 fixed bottom-0 left-0 right-0 w-full bg-white "
				>
					<button
						class="w-full h-12 rounded-full  text-center text-white bg-blue-600  hover:bg-gray-300"
						>저장하기</button
					>
				</div>
			</form>
		{/if}
	{:else}
		<div
			class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
		>
			<button
				on:click={() => {
					addressFlag = false;
				}}
				class="absolute left-4 top-4 text-gray-400"
			>
				<Icon icon="x" />
			</button>
			<div class="flex w-full justify-center  font-bold text-base text-gray-800">배송지 관리</div>
		</div>
		<div class="pt-16" />
		<div class="flex bg-white">
			<div class="flex gap-1 overflow-x-auto px-4">
				<button
					on:click={() => {
						addressEditFlag = true;
					}}
					class="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-full p-2"
					><Icon icon="plus" /></button
				>
				{#each addressList as address, index}
					<button
						on:click={() => {
							addressOption = address;
						}}
						class="whitespace-pre px-3 h-10 rounded-full text-sm border flex items-center justify-center  {address ===
						addressOption
							? 'text-blue-500 border-2 border-blue-500 font-bold'
							: ''}"
					>
						{address.address_name}
					</button>
				{/each}
			</div>
		</div>
		{#if addressOption}
			<div class="p-4 border-b flex justify-between">
				<div class="font-bold">{addressOption.address_name}</div>
				<button on:click = {handleDelete} class="text-red-500 underline text-sm">삭제하기</button>
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
			<div class="p-4"><button on:click = {handleAddressUseClick} class="w-full bg-blue-500 h-12 rounded-full text-white hover:bg-gray-200">사용하기</button></div>
			
		{/if}
	{/if}
{:else if addressFlag === false}
	<div
		class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
	>
		<Back icon="arrow" />
		<div class="flex w-full justify-center  font-bold text-base text-gray-800">주문서 작성</div>
	</div>
	<div class="pt-16" />
	{#if !addressOption}
		<div class=" p-4 space-y-2">
			<div class="font-bold text-lg border-b pb-2">배송 정보</div>
			<div class="text-gray-500 text-center pt-2">배송지를 추가하거나 선택해주세요.</div>
			<button
				on:click={() => {
					addressFlag = true;
				}}
				class="text-blue-500 underline flex items-center justify-center w-full"
			>
				추가하기</button
			>
		</div>
	{:else}
		<div class="p-4 space-y-2 border-b">
			<div class="flex justify-between items-center">
				<div class="font-bold text-lg ">배송 정보</div>
				<button
					on:click={() => {
						addressFlag = true;
					}}
					class="text-blue-600 border-b border-blue-600  font-bold text-xs"
				>
					배송지 변경
				</button>
			</div>
			<div class="">{addressOption.address_name}</div>
			<div class="">{addressOption.name}</div>
			<div class="text-sm text-gray-500 ">{addressOption.phone}</div>
			<div class=" flex">
				<div class="text-sm text-gray-600">{addressOption.address1}&nbsp;</div>
				<div class="text-sm text-gray-600">{addressOption.address2}</div>
			</div>

			<input
			bind:value = {request}
				type="text"
				class="w-full h-10 border-gray-300 rounded text-sm placeholder-neutral-400"
				placeholder="배송 시 요청사항을 적어주세요"
			/>
		</div>
	{/if}
	<div class=" p-4 border-b ">
		<div class=" text-lg font-bold">구매 상품 목록</div>
	</div>
	{#if itemList.length !== 0}
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
				<button class="border-2 rounded-md w-full h-12 font-bold">휴대폰결제</button>
				<button class="border-2 rounded-md w-full h-12 font-bold">토스페이</button>
				<button class="border-2 rounded-md w-full h-12 font-bold">카카오페이</button>
			</div>
			<div class="flex justify-between gap-4 py-2">
				<button class="border-2 rounded-md w-full h-12 font-bold">삼성페이</button>
				<button class="border-2 rounded-md w-full h-12 font-bold">네이버페이</button>
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
				<div class="text-blue-600 font-bold  ">{addComma(normalPriceSum - sailPriceSum)}원</div>
			</div>
		</div>

		<div class="pb-20" />
		<div class="px-4 pb-4 fixed bottom-0 left-0 right-0 sm:mx-auto sm:max-w-sm bg-white ">
			<button
				on:click={handlePayClick}
				class="w-full h-14 rounded-full  text-center text-white bg-blue-600 font-bold hover:bg-gray-600"
				>{addComma(normalPriceSum - sailPriceSum)}원 결제하기</button
			>
		</div>
	{:else if cartList.length !== 0}
		{#each cartList as list, index}
			<div class="flex gap-2 p-4 border-b">
				<img
					src={list.item.image}
					class="flex items-end overflow-hidden w-24 h-24 rounded bg-white"
				/>
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
				<button class="border-2 rounded-md w-full h-12 font-bold">휴대폰결제</button>
				<button class="border-2 rounded-md w-full h-12 font-bold">토스페이</button>
				<button class="border-2 rounded-md w-full h-12 font-bold">카카오페이</button>
			</div>
			<div class="flex justify-between gap-4 py-2">
				<button class="border-2 rounded-md w-full h-12 font-bold">삼성페이</button>
				<button class="border-2 rounded-md w-full h-12 font-bold">네이버페이</button>
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
				<div class="text-blue-600 font-bold  ">{addComma(normalPriceSum - sailPriceSum)}원</div>
			</div>
		</div>

		<div class="pb-20" />
		<div class="px-4 pb-4 fixed bottom-0 left-0 right-0 sm:mx-auto sm:max-w-sm bg-white ">
			<button
				on:click={handlePayClick}
				class="w-full h-14 rounded-full  text-center text-white bg-blue-600 font-bold hover:bg-gray-600"
				>{addComma(normalPriceSum - sailPriceSum)}원 결제하기</button
			>
		</div>
	{/if}
{/if}
