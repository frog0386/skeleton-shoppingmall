<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
	import Menu from '$lib/Menu.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

	let searchInput;
</script>

<div class="bg-white h-14 px-4 items-center border-b flex">
	<Back icon="arrow" />
	<div class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800">상품 검색</div>
</div>

<div class="px-4 mt-2 border">
	<form on:submit|preventDefault={async () => {
    $page.url.searchParams.set('keyword',searchInput)
    goto(`/items/searchresults?${$page.url.searchParams.toString()}`);
  }} class="relative">
		<input
			type="text"
			class="w-full h-12  border-gray-300 rounded placeholder-neutral-400"
			placeholder="검색어를 입력하세요."
			bind:value={searchInput}
      required
		/>
		<button class="absolute right-0 top-0 flex justify-center items-center text-gray-400 w-12 h-12">
			<Icon icon="search" size={24}/>
		</button>
	</form>
</div>

<div class="px-4">
	<div class="font-bold my-4 border-b py-2">최근 검색어</div>

	<div class="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm">수박</div>
	<div class="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm">
		갈비탕
	</div>
	<div class="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm">
		쭈꾸미
	</div>
	<div class="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm">
		그래놀라
	</div>
	<div class="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm">
		볶음밥
	</div>
	<div class="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm">
		돈까스
	</div>
</div>
<Menu />
