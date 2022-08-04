<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { itemData, user } from '$lib/stores';
	import { dateFormat } from '$lib/util';
	import { addComma } from '$lib/util';

	let orderList = [];
	let loadFlag = false;
	onMount(async () => {
		let order = await supabase
			.from('order')
			.select('*,line_item(*)')
			.eq('user_id', $user.id)
			.eq('status', 'paid')
      .order('created_at', { ascending: false });
		orderList = order.body;
		for (let i = 0; i < orderList.length; i++) {
			for (let j = 0; j < orderList[i].line_item.length; j++) {
				let itemInfo = await supabase
					.from('item')
					.select('*,brand(*)')
					.eq('id', orderList[i].line_item[j].item_id);
				orderList[i].line_item[j].brand = itemInfo.body[0].brand.brandname;
				orderList[i].line_item[j].itemname = itemInfo.body[0].name;
				orderList[i].line_item[j].image = itemInfo.body[0].image;
				let optionInfo = await supabase
					.from('option')
					.select('option')
					.eq('id', orderList[i].line_item[j].option_id);
				orderList[i].line_item[j].option = optionInfo.body[0].option;
			}
		}
    console.log(orderList);
		loadFlag = true;
	});
</script>

<div
	class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
>
	<Back icon="x" url="/users/mypage" />
	<div class="flex w-full justify-center  font-bold text-base text-gray-800">주문내역</div>
</div>
<div class="pt-12" />

{#if loadFlag === true}
	{#each orderList as order}
		<div class="py-2">
			<div class="flex justify-between text-gray-400 p-4 border-b border-t">
				<div class=" font-bold">{dateFormat(order.created_at)}</div>
				<div class="">
					<Icon icon="chevron-right" size={24} />
				</div>
			</div>
			{#each order.line_item as item}
				<a href = "/items/{item.item_id}/detail" class="flex gap-2 p-4 border-b">
					<img
						src={item.image}
						class="flex items-end overflow-hidden w-24 h-24 border rounded bg-white"
					/>
					<div class="flex flex-col">
						<div class="flex justify-between">
							<div class="flex flex-col mt-2">
								<div class="mb-1 text-xs text-neutral-500">{item.brand}</div>
								<div class="w-48 text-sm font-bold">
									{item.itemname}
								</div>
								<div class="text-xs text-gray-500 mt-1">
									옵션 : {item.option} 수량 : {item.quantity}
								</div>
								<div class="mt-1 font-semibold">{addComma(item.price)}원</div>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/each}
{/if}
