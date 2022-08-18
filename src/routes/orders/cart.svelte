<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
	import Menu from '$lib/Menu.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { addComma } from '$lib/util';
	import { user, cartData } from '$lib/stores';
	import axios from 'axios';
	import { toastMessage } from '$lib/stores';

	let cartItems = [];
	let normalPriceSum = 0;
	let priceSum = 0;
	let salePriceSum = 0;
	let checkboxValue = [];
	let temp = [];
	onMount(async () => {
		let data = await supabase
			.from('order')
			.select('*,line_item(*,item(*,brand(*)),option(*))')
			.eq('user_id', $user.id)
			.eq('status', 'cart');
		cartItems = data.body[0].line_item;
		for (let i = 0; i < cartItems.length; i++) {
			checkboxValue.push(i);
		}
		checkboxValue = checkboxValue;
		console.log(checkboxValue);
		console.log(cartItems);
		normalPriceSum = sumAllNormalPrice();
		priceSum = sumAllPrice();
		salePriceSum = normalPriceSum * 1 - priceSum * 1;
	});

	function sumAllNormalPrice() {
		if (cartItems.length === 0) {
			return 0;
		}
		let sum = 0;
		for (let i = 0; i < checkboxValue.length; i++) {
			sum += cartItems[checkboxValue[i]].item.normal_price * cartItems[checkboxValue[i]].quantity;
		}
		return sum;
	}
	function sumAllPrice() {
		if (cartItems.length === 0) {
			return 0;
		}
		let sum = 0;
		for (let i = 0; i < checkboxValue.length; i++) {
			sum += cartItems[checkboxValue[i]].item.price * cartItems[checkboxValue[i]].quantity;
		}
		return sum;
	}

	async function handleItemRemove(index) {
		const response = await axios.delete('/apis/cart', {
			data: { item: cartItems[index], session: supabase.auth.session() }
		});
		if (response.status === 200) {
			let temp = cartItems.splice(index, 1);

			if (checkboxValue.includes(index)) {
				temp = checkboxValue.splice(index, 1);
				for (let i = 0; i < checkboxValue.length; i++) {
					if (checkboxValue[i] > index) {
						checkboxValue[i]--;
					}
				}
			}
			console.log(checkboxValue);
			cartItems = cartItems;
			normalPriceSum = sumAllNormalPrice();
			priceSum = sumAllPrice();
			salePriceSum = normalPriceSum * 1 - priceSum * 1;
		} else {
			$toastMessage = '오류가 발생했습니다';
		}
	}

	async function handleAmountIncrease(index) {
		const response = await axios.patch('/apis/cart', {
			data: cartItems[index],
			session: supabase.auth.session(),
			action: 'plus'
		});
		cartItems[index].quantity += 1;
		normalPriceSum = sumAllNormalPrice();
		priceSum = sumAllPrice();
		salePriceSum = normalPriceSum * 1 - priceSum * 1;
	}

	async function handleAmountDecrease(index) {
		if (cartItems[index].quantity === 1) {
			$toastMessage = '더이상 줄일 수 없습니다';
		} else {
			const response = await axios.patch('/apis/cart', {
				data: cartItems[index],
				session: supabase.auth.session(),
				action: 'minus'
			});
			cartItems[index].quantity -= 1;
			normalPriceSum = sumAllNormalPrice();
			priceSum = sumAllPrice();
			salePriceSum = normalPriceSum * 1 - priceSum * 1;
		}
	}

	async function handleBuyClick() {
		let temp = [];
		if (cartItems.length === 0) {
			$toastMessage = '장바구니에 상품이 없습니다.';
		} else {
			for (let i = 0; i < checkboxValue.length; i++) {
				console.log(checkboxValue);
				console.log(cartItems);
				temp.push(cartItems[checkboxValue[i]]);
			}
			$cartData = temp;
			goto('/orders/payment');
		}
	}

	async function handleCheckboxClick(index) {
		let indexValue = checkboxValue.indexOf(index);
		if (indexValue !== -1) {
			temp = checkboxValue.splice(indexValue, 1);
			checkboxValue = checkboxValue;
			normalPriceSum = sumAllNormalPrice();
			priceSum = sumAllPrice();
			salePriceSum = normalPriceSum * 1 - priceSum * 1;
		} else if (indexValue === -1) {
			checkboxValue.push(index);
			checkboxValue = checkboxValue;
			normalPriceSum = sumAllNormalPrice();
			priceSum = sumAllPrice();
			salePriceSum = normalPriceSum * 1 - priceSum * 1;
		}
	}
</script>

<div
	class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
>
	<Back icon="arrow" />
	<div class="flex w-full justify-center  font-bold text-base text-gray-800">장바구니</div>
</div>
<div class="pt-16" />

{#each cartItems as item, index}
	<div class="p-4 flex justify-between items-start border-b">
		<div class="text-sm flex gap-2">
			<input
				type="checkbox"
				class="rounded-full border-gray-400 w-6 h-6"
				bind:group={checkboxValue}
				value={index}
				on:click={() => {
					handleCheckboxClick(index);
				}}
			/>
			<div class="">
				<div class="text-xs text-gray-400">{item.item.brand.brandname}</div>
				<div class="font-bold">
					{item.item.name}
					<div class="text-xs text-gray-400 mt-1">옵션 : {item.option.option}</div>
					<div class="flex mt-2 gap-4">
						<img class="rounded w-24 object-cover" src={item.item.image} />
						<div>
							<div class="flex gap-2 items-center">
								<div class="font-bold text-lg">{addComma(item.item.price)}원</div>
								<div class="font-bold line-through text-gray-400">
									{addComma(item.item.normal_price)}원
								</div>
							</div>
							<div class="flex w-24 h-10 border rounded text-sm text-gray-500 mt-2">
								<button
									on:click={() => {
										handleAmountDecrease(index);
									}}
									class="w-10 h-10 px-2"
								>
									<Icon icon="minus" size={20} />
								</button>
								<input
									type="text"
									class="border-none w-6 h-9 p-0 text-center"
									value={item.quantity}
								/>
								<button
									on:click={() => {
										handleAmountIncrease(index);
									}}
									class="w-10 h-10 px-2"
								>
									<Icon icon="plus" size={20} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button
			on:click={() => {
				handleItemRemove(index);
			}}
			class="text-gray-400"
		>
			<Icon icon="x" size={24} />
		</button>
	</div>
{/each}

<div class="p-4">
	<div class="flex justify-between items-center">
		<div class="text-gray-500 text-sm">상품금액</div>
		{addComma(normalPriceSum)}원
	</div>
	<div class="flex justify-between items-center mt-2">
		<div class="text-gray-500 text-sm">상품할인금액</div>
		-{addComma(salePriceSum)}원
	</div>
	<div class="flex justify-between items-center mt-2 border-b pb-4">
		<div class="text-gray-500 text-sm">배송비</div>
		0원
	</div>
	<div class="flex justify-between mt-4 items-center">
		<div class="text-gray-500 text-sm">결제예정금액</div>
		<div class="text-lg font-bold">{addComma(normalPriceSum * 1 - salePriceSum)}원</div>
	</div>

	<button
		on:click={handleBuyClick}
		class="mt-4 block text-center w-full bg-blue-600 rounded-full h-12 text-white font-bold flex items-center justify-center"
	>
		주문하기
	</button>
</div>

<div class="pb-16" />

<Menu />
