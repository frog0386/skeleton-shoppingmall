<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
	import Menu from '$lib/Menu.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {isEmpty}	from '$lib/util';
	let searchInput;
	let searchArr = [];
	onMount(async () => {
		let temp = localStorage.getItem('search');
		if (isEmpty(temp)) {
			searchArr = [];
		} else {
			searchArr = JSON.parse(temp);
		}
	});


	function searchWordClick(index){
		let searchWord = searchArr[index];
		let temp = searchArr.splice(index,1);
		searchArr.unshift(searchWord);
		localStorage.setItem('search', JSON.stringify(searchArr));
		$page.url.searchParams.set('keyword', searchWord);
		goto(`/items/searchresults?${$page.url.searchParams.toString()}`);
	}

	function handleRemoveClick(index){
		let temp = searchArr.splice(index,1);
		localStorage.setItem('search', JSON.stringify(searchArr));
		searchArr = searchArr;
	}
</script>

<div class="bg-white h-14 px-4 items-center border-b flex">
	<Back icon="arrow" />
	<div class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800">상품 검색</div>
</div>

<div class="px-4 mt-2">
	<form
		on:submit|preventDefault={async () => {
			searchArr.unshift(searchInput);
			localStorage.setItem('search', JSON.stringify(searchArr));
			$page.url.searchParams.set('keyword', searchInput);
			goto(`/items/searchresults?${$page.url.searchParams.toString()}`);
		}}
		class="relative"
	>
		<input
			type="text"
			class="w-full h-12  border-gray-300 rounded placeholder-neutral-400"
			placeholder="검색어를 입력하세요."
			bind:value={searchInput}
			required
		/>
		<button class="absolute right-0 top-0 flex justify-center items-center text-gray-400 w-12 h-12">
			<Icon icon="search" size={24} />
		</button>
	</form>
</div>

<div class="px-4">
	<div class="font-bold my-4 border-b py-2">최근 검색어</div>
	<div class="grid grid-cols-2 text-center gap-2 text-gray-500">
		{#each searchArr as searchWord, index}
			{#if index % 2 === 1}
			<div class="flex relative justify-center items-center">
				<button on:click = {()=>searchWordClick(index)} class=" h-8">{searchWord}</button>
				<button on:click = {()=>handleRemoveClick(index)} class = "absolute right-1"><Icon icon = "x"/></button>
			</div>
			{:else}
			<div class="flex relative justify-center items-center border-r">
				<button on:click = {()=>searchWordClick(index)} class=" h-8">{searchWord}</button>
				<button on:click = {()=>handleRemoveClick(index)} class = "absolute right-1"><Icon icon = "x"/></button>
			</div>
			{/if}
		{/each}
	</div>
</div>
<Menu />
