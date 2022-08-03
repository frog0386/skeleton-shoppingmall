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

	let cartId;
	let cartItems = [];
  let normalPriceSum = 0;
  let priceSum = 0;
  let salePriceSum=0;
	onMount(async () => {
		let data = await supabase.from('order').select().eq('user_id', $user.id).eq('status', 'cart');
		cartId = data.body[0].id;
		let cartItemData = await supabase
			.from('line_item')
			.select('*,item(*),order(*),option(*)')
			.eq('order_id', cartId);
		cartItems = cartItemData.body;
    for(let i=0; i<cartItems.length; i++){
      let cartItemData = await supabase.from('item').select('*,brand(*)').eq('id', cartItems[i].item_id);
      cartItems[i].brand = cartItemData.body[0].brand.brandname;
    }
    console.log(cartItems);
    normalPriceSum = sumAllNormalPrice()
    priceSum = sumAllPrice();
    salePriceSum = (normalPriceSum*1) - (priceSum*1);
		

	});

  function sumAllNormalPrice(){
    if(cartItems.length === 0){
      return 0;
    }
    let sum=0;
      for(let i=0; i<cartItems.length; i++){
        sum += cartItems[i].item.normal_price * cartItems[i].quantity;
      }
      return sum; 
    }
    function sumAllPrice(){
      if(cartItems.length === 0){
      return 0;
    }
    let sum=0;
      for(let i=0; i<cartItems.length; i++){
        sum += cartItems[i].item.price * cartItems[i].quantity;
        
      }
      return sum; 
    }

  async function handleItemRemove(index){
      const response = await axios.delete('/apis/cart',{data:{item : cartItems[index],session : supabase.auth.session()}});
      if(response.status === 200){
        let temp = cartItems.splice(index,1);
      cartItems = cartItems;
      normalPriceSum = sumAllNormalPrice()
    priceSum = sumAllPrice();
    salePriceSum = (normalPriceSum*1) - (priceSum*1);
      }
      else{
        $toastMessage = "오류가 발생했습니다";
      }
    }

    async function handleAmountIncrease(index){
      const response = await axios.patch('/apis/cart',{data : cartItems[index],session : supabase.auth.session(), action : "plus"});
      cartItems[index].quantity +=1;
      normalPriceSum = sumAllNormalPrice()
    priceSum = sumAllPrice();
    salePriceSum = (normalPriceSum*1) - (priceSum*1);
    }

    async function handleAmountDecrease(index){
      if(cartItems[index].quantity === 1){
        $toastMessage = '더이상 줄일 수 없습니다';
      }
      else{
        const response = await axios.patch('/apis/cart',{data : cartItems[index],session : supabase.auth.session(), action : "minus"});
        cartItems[index].quantity -=1;
        normalPriceSum = sumAllNormalPrice()
    priceSum = sumAllPrice();
    salePriceSum = (normalPriceSum*1) - (priceSum*1);
      }
    }

    async function handleBuyClick() {
      if(cartItems.length === 0){
        $toastMessage = "장바구니에 상품이 없습니다.";
      }
      else{
        $cartData = cartItems;
        goto('/orders/payment');
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

{#each cartItems as cart, index}
	<div class="p-4 flex justify-between items-start border-b">
		<div class="text-sm flex gap-2">
			<input type="checkbox" class="rounded-full border-gray-400 w-6 h-6" />
			<div class="">
        <div class="text-xs text-gray-400">{cart.brand}</div>
				<div class = "font-bold">
					{cart.item.name}
					<div class="text-xs text-gray-400 mt-1">옵션 : {cart.option.option}</div>
					<div class="flex mt-2 gap-4">
						<img class="rounded w-24 object-cover" src={cart.item.image} />
						<div>
							<div class="flex gap-2 items-center">
								<div class="font-bold text-lg">{addComma(cart.item.price)}원</div>
								<div class="font-bold line-through text-gray-400">
									{addComma(cart.item.normal_price)}원
								</div>
							</div>
							<div class="flex w-24 h-10 border rounded text-sm text-gray-500 mt-2">
								<button on:click = {() => {handleAmountDecrease(index)}} class="w-10 h-10 px-2">
									<Icon icon="minus" size={20} />
								</button>
								<input
									type="text"
									class="border-none w-6 h-9 p-0 text-center"
									value={cart.quantity}
								/>
								<button on:click = {() => {handleAmountIncrease(index)}} class="w-10 h-10 px-2">
									<Icon icon="plus" size={20} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button on:click = {() => {handleItemRemove(index)}} class="text-gray-400">
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
    <div class="text-lg font-bold">{addComma((normalPriceSum*1)-(salePriceSum))}원</div>
  </div>

  <button on:click={handleBuyClick}
    class="mt-4 block text-center w-full bg-blue-600 rounded-full h-12 text-white font-bold flex items-center justify-center"
  >
    주문하기
  </button>
</div>

<div class="pb-16"></div>

<Menu />
