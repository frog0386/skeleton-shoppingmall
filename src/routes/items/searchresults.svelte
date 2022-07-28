<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { addComma } from '$lib/util';
	let keyword;
	let searchFlag;
	keyword = $page.url.searchParams.get('keyword');
	console.log(keyword);

	let items = [];
	onMount(async () => {
		let data = await supabase
			.from('item')
			.select()
			.like('name', '%' + keyword + '%');
		//const {data, error} = await supabase.rpc('search', { keyword: keyword });
		if (data.body[0]) {
			searchFlag = true;
			items = data.body;
		}
		else{
			searchFlag = false;
		}
	});
</script>

<div class="fixed top-0 left-0 right-0 sm:mx-auto sm:max-w-sm bg-white h-14 px-4 items-center border-b flex">
	<button class="text-gray-400">
		<Back icon="arrow" />
	</button>
	<div class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800">
		상품 검색 결과
	</div>
</div>
<div class="pt-12"></div>

{#if searchFlag === true}
	{#each items as item}
		<a href="/items/{item.id}/detail" class=" border-b">
			<div class="flex gap-2 border-b p-4">
				<img class="rounded w-24 h-24 object-cover" src={item.image} />
				<div>
					<h3 class="font-bold h-12">{item.name}</h3>
					<span class=" font-bold">{addComma(item.price)}원</span>
							<span class="line-through text-gray-400">{addComma(item.normal_price)}원</span>
					<div class="text-sm text-gray-500 flex  items-center gap-1">
						
						
						<div class="text-yellow-300">
							<Icon icon="star" size={16} />
						</div>
						4.9(2,321)
					</div>
				</div>
			</div>
		</a>
	{/each}
{:else if searchFlag == false}
	<div class=" mt-10 text-gray-400    text-center space-x-4">
			<div class="flex justify-center">
				<Icon icon="map" size={60} />
			</div>
			<div class="text-xl font-bold">검색 결과가 없습니다.</div>
		</div>
    <div class = " flex justify-center mt-8">
    <a href = "/items/search" class = " bg-blue-500 text-white rounded-full flex justify-center items-center hover:bg-gray-200 text-xl  h-12 w-40 ">다시 검색하기</a>
	</div>
{/if}
