<script>
	import Icon from '$lib/Icon.svelte';
	import Menu from '$lib/Menu.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { addComma, isEmpty } from '$lib/util';

	let categories = [];
	let items = [];
	let itemsCount = [];
	let itemDataArray = [];
	let rankItem = [];
	let recentItems = [];
	let recentItemsInfo = [];
	let rankFlag = false;
	onMount(async () => {
		let rankData = await supabase.rpc('get_item_rank');
		console.log(rankData);

		rankItem = rankData.body;
		for (let i = 0; i < rankItem.length; i++) {
			let itemData = await supabase.from('item').select('*,brand(*)').eq('id', rankItem[i].item_id);
			rankItem[i].itemInfo = itemData.body[0];
			if (i === 9) {
				rankFlag = true;
			}
		}
		let temp = localStorage.getItem('recentItem');
		if (isEmpty(temp)) {
			recentItems = [];
		} else {
			recentItems = JSON.parse(temp);
		}
		for (let i = 0; i < recentItems.length; i++) {
			let itemData = await supabase.from('item').select().eq('id', recentItems[i]);
			recentItemsInfo.push(itemData.body[0]);
		}
		recentItemsInfo = recentItemsInfo;
		console.log(recentItemsInfo);
		let data = await supabase.from('category').select();
		categories = data.body;
		for (let i = 0; i < categories.length; i++) {
			let count = await supabase
				.from('item')
				.select('*', { count: 'exact', head: true })
				.eq('category_id', categories[i].id);
			itemsCount[i] = count.count;
			let randomArray = await selectIndex(itemsCount[i] - 1, 4);
			for (let j = 0; j < 4; j++) {
				let itemData = await supabase
					.from('item')
					.select('*,brand(*)')
					.eq('category_id', categories[i].id)
					.range(randomArray[j], randomArray[j]);
				itemDataArray.push(itemData.body[0]);
			}
			items = [...items, itemDataArray];
			itemDataArray = [];
		}
	});
	async function selectIndex(totalIndex, selectingNumber) {
		let randomIndexArray = [];
		for (let i = 0; i < selectingNumber; i++) {
			//check if there is any duplicate index
			let randomNum = Math.floor(Math.random() * totalIndex);
			if (randomIndexArray.indexOf(randomNum) === -1) {
				randomIndexArray.push(randomNum);
			} else {
				//if the randomNum is already in the array retry
				i--;
			}
		}
		return randomIndexArray;
	}
</script>

<div class="sticky top-0 z-10 sm:mx-auto sm:max-w-sm left-0 right-0">
	<div class="text-xl px-4 h-14 flex items-center  bg-blue-500 text-white font-black flex-1 ">
		FINGR
	</div>
</div>
<div class="sticky top-0 z-20 sm:mx-auto sm:max-w-sm left-0 right-0">
	<div class="px-4 py-2 bg-blue-500 ">
		<a href="/items/search" class="text-gray-400 flex gap-3 items-center bg-white p-2">
			<Icon icon="search" size={24} />상품 검색
		</a>
	</div>
</div>

{#if rankFlag}
	<div class="py-4 mx-4  text-lg  font-black">전체 TOP10 상품</div>
	<div class="px-4 pb-8">
		<div class=" gap-2 flex overflow-x-auto">
			{#each rankItem as item, index}
				<a href="/items/{item.itemInfo.id}/detail" class=" space-y-2 relative ">
					<img
						class="rounded-md w-28 h-28 object-cover border border-gray-300"
						src={item.itemInfo.image}
					/>
					<div class="w-28 p-2">
						<div class=" text-sm  block text-elipses overflow-hidden h-16">
							{item.itemInfo.name}
						</div>
						<div class="text-red-400 text-sm font-bold">{addComma(item.itemInfo.price)}원</div>
					</div>
					<div class="absolute top-0 right-2">
						<div class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md ">
							{index + 1}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
{/if}

{#if recentItemsInfo.length !== 0}
	<div class="py-4 mx-4  text-lg  font-black border-t">최근 본 상품</div>
{/if}
<div class="px-4 pb-8">
	<div class=" gap-2 flex overflow-x-auto">
		{#each recentItemsInfo as recentItem}
			<a href="/items/{recentItem.id}/detail" class=" space-y-2">
				<img
					class="rounded-md w-28 h-28 object-cover border border-gray-300"
					src={recentItem.image}
				/>
				<div class="w-28">
					<div class=" text-sm h-20  block text-elipses overflow-hidden h-16">
						{recentItem.name}
					</div>
					<div class="text-red-400 text-sm font-bold h-6">{addComma(recentItem.price)}원</div>
				</div>
			</a>
		{/each}
	</div>
</div>

{#each categories as category}
	<div class="mx-4 flex justify-between items-end bg-white border-t py-4">
		<div class="text-lg font-black flex">{category.name}</div>
		<a href="/items/categories/{category.id}" class="text-gray-500  text-sm mr-3">더보기</a>
	</div>
	<div>
		{#if items[category.position - 1]}
			<div class="grid grid-cols-2 gap-2  pb-4 px-4 bg-white">
				{#each items[category.position - 1] as item}
					<a href="/items/{item.id}/detail" class=" space-y-2">
						<img class="rounded-md w-48 h-40 object-cover" src={item.image} />
						<h3 class="mt-2 font-bold h-20">{item.name}</h3>
						<div class="text-sm font-bold text-gray-400">{item.brand.brandname}</div>
						<div class="text-xs text-gray-400 line-through">{addComma(item.normal_price)} 원</div>
						<div class="font-bold ">{addComma(item.price)} 원</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
{/each}

<div class="pb-16" />
<Menu />
