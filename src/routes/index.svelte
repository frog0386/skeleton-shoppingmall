<script>
	import Icon from '$lib/Icon.svelte';
	import Menu from '$lib/Menu.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { addComma } from '$lib/util';

	let categories = [];
	let items = [];
	let itemsCount = [];
	let itemDataArray = [];
	onMount(async () => {
		let data = await supabase.from('category').select();
		categories = data.body;
		console.log(categories);
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
				console.log(itemData);
				itemDataArray.push(itemData.body[0]);
			}
			items = [...items,itemDataArray];
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
		<a href = "/items/search" class="text-gray-400 flex gap-3 items-center bg-white p-2">
			<Icon icon="search" size={24} />상품 검색
    </a>
	</div>
</div>

<div class="py-4 mx-4  text-lg  font-black">이번 주! TOP10</div>
<div class="px-4 pb-8">
	<div class=" gap-2 flex overflow-x-auto">
		<a href="/" class=" space-y-2 relative ">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
			<div class="absolute top-0 right-2">
				<div class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md ">1</div>
			</div>
		</a>
		<a href="/" class=" space-y-2 relative ">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
			<div class="absolute top-0 right-2">
				<div class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md ">2</div>
			</div>
		</a>
		<a href="/" class=" space-y-2 relative ">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
			<div class="absolute top-0 right-2">
				<div class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md ">3</div>
			</div>
		</a>

		<a href="/" class=" space-y-2 relative ">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
			<div class="absolute top-0 right-2">
				<div class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md ">4</div>
			</div>
		</a>
	</div>
</div>



	{#each categories as category}
		<div class="mx-4 flex justify-between items-end bg-white border-t py-4">
			<div class="text-lg font-black flex">{category.name}</div>
			<a href="/items/categories/{category.id}" class="text-gray-500  text-sm mr-3">더보기</a>
		</div>
		<div>
			{#if items[category.position-1]}
			<div class="grid grid-cols-2 gap-2  pb-4 px-4 bg-white">
				{#each items[category.position-1] as item}
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


<div class="py-4 mx-4  text-lg  font-black border-t">최근 본 상품</div>

<div class="px-4 pb-8">
	<div class=" gap-2 flex overflow-x-auto">
		<a href="/" class=" space-y-2">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
		</a>
		<a href="/" class=" space-y-2">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
		</a>
		<a href="/" class=" space-y-2">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
		</a>

		<a href="/" class=" space-y-2">
			<img
				class="rounded-md w-28 h-28 object-cover border border-gray-300"
				src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<div class="w-28">
				<div class=" text-sm  block text-elipses overflow-hidden">
					삼립빵 14종 허쉬 초코롤 단팥빵
				</div>
				<div class="text-red-400 text-sm font-bold">10,000원</div>
			</div>
		</a>
	</div>
</div>

<div class="pb-16" />
<Menu />