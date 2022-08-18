<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { itemData, user } from '$lib/stores';
	import { toastMessage } from '$lib/stores';
	let likeList = [];
	let likeFlag;
	onMount(async () => {
		let data = await supabase.from('like').select('*,item(*)').eq('user_id', $user.id);
		likeList = data.body;
		console.log(likeList);
		if (likeList.length === 0) {
			likeFlag = false;
		} else {
			likeFlag = true;
		}
	});
	async function handleUnlike(index) {
		await supabase
			.from('like')
			.delete()
			.eq('item_id', likeList[index].item_id)
			.eq('user_id', $user.id);
		let tempArray = likeList.splice(index, 1);
		likeList = likeList;
		$toastMessage = '찜이 취소되었습니다.';
	}

	async function handleUnlikeAll() {
		await supabase.from('like').delete().eq('user_id', $user.id);
		likeList = [];
		likeFlag = false;
		$toastMessage = '전체 상품 찜 취소되었습니다.';
	}
</script>

<div
	class="fixed top-0 left-0 right-0 sm:mx-auto sm:max-w-sm bg-white h-14 px-4 items-center border-b flex"
>
	<button class="text-gray-400">
		<Back icon="arrow" />
	</button>
	<div class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800">찜한 상품</div>
</div>
<div class="pt-16" />

{#if likeFlag === true}
	<div class="px-4">
		<button
			on:click={handleUnlikeAll}
			class=" bg-gray-300 p-4 rounded-full flex justify-center items-center hover:bg-gray-600"
			>전체 삭제하기</button
		>
	</div>
	{#each likeList as item, index}
		<div class="p-4 border-b">
			<div class="flex justify-between items-center  gap-2">
				<a href="/items/{item.item.id}/detail" class="flex items-center gap-2">
					<img class="rounded w-16 h-16 object-cover" src={item.item.image} />
					<div>
						<h3 class="font-bold">{item.item.name}</h3>
						<h3 class="text-sm text-gray-500" />
					</div>
				</a>
				<button
					type="button"
					on:click={() => {
						handleUnlike(index);
					}}
					class="text-red-600"
				>
					<Icon icon="heart-fill" size={24} />
				</button>
			</div>
		</div>
	{/each}
{:else if likeFlag === false}
	<div class=" mt-10 text-gray-400    text-center space-x-4">
		<div class="flex justify-center">
			<Icon icon="heart" size={60} />
		</div>
		<div class="text-xl font-bold">찜한 상품이 없습니다.</div>
	</div>
	<div class=" flex justify-center mt-8" />
{/if}
