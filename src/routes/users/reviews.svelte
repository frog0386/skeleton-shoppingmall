<script>
	import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';

	import { onDestroy, onMount } from 'svelte';
	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { toastMessage } from '$lib/stores';
  import { modal } from '$lib/stores';


	let selectFlag = false;
	let unreviewedList = [];
	let reviewedList = [];
	let unreviewedItemList = [];
	let reviewedItemList = [];
	let writeFlag = false;
	let itemName = '';
	let itemImage = '';
	let itemId = '';
	let rating = 0;
	let body = '';

	onMount(async () => {
		let data = await supabase
			.from('order')
			.select('*,line_item(*)')
			.eq('user_id', $user.id)
			.eq('status', 'paid');
		for (let i = 0; i < data.body.length; i++) {
			for (let j = 0; j < data.body[i].line_item.length; j++) {
				if (!unreviewedList.includes(data.body[i].line_item[j].item_id)) {
					unreviewedList.push(data.body[i].line_item[j].item_id);
				}
			}
		}
		let reviews = await supabase.from('review').select('item_id').eq('user_id', $user.id);
		reviewedList = reviews.body;
		for (let i = 0; i < reviewedList.length; i++) {
			let index = unreviewedList.indexOf(reviewedList[i].item_id);
			let temp = unreviewedList.splice(index, 1);
		}
		for (let i = 0; i < unreviewedList.length; i++) {
			let iteminfo = await supabase.from('item').select('name,image').eq('id', unreviewedList[i]);
			unreviewedItemList.push({ name: iteminfo.body[0].name, image: iteminfo.body[0].image });
		}
		for (let i = 0; i < reviewedList.length; i++) {
			let iteminfo = await supabase
				.from('item')
				.select('name,image')
				.eq('id', reviewedList[i].item_id);
			reviewedItemList.push({ name: iteminfo.body[0].name, image: iteminfo.body[0].image });
		}
		reviewedList = reviewedList;
		unreviewedItemList = unreviewedItemList;
	});

  onDestroy(async () => {
    $modal = null;
  })

	function handleWriteClick(index) {
		writeFlag = true;
		itemName = unreviewedItemList[index].name;
		itemImage = unreviewedItemList[index].image;
		itemId = unreviewedList[index];
	}

	async function saveReview() {
		if (rating === 0) {
			$toastMessage = '별점을 선택해주세요.';
		} else {
			let response = await supabase
				.from('review')
				.insert({ item_id: itemId, star: rating, body: body, user_id: $user.id });
      console.log(response);
			if (response.status === 201) {
				let index = unreviewedList.indexOf(itemId);
				reviewedList.push({item_id :unreviewedList.splice(index, 1)[0]});
				reviewedItemList.push(unreviewedItemList.splice(index, 1)[0]);
				unreviewedList = unreviewedList;
				unreviewedItemList = unreviewedItemList;
				$toastMessage = '리뷰가 작성되었습니다.';
				writeFlag = false;
				rating = 0;
				body = '';
				itemName = '';
				itemImage = '';
				itemId = '';
			} else {
				$toastMessage = '오류가 발생했습니다.';
			}
		}
	}

  async function handleReviewClick(index) {
		console.log(reviewedList);
		console.log(reviewedItemList);
    let review = await supabase.from('review').select('*').eq('item_id',reviewedList[index].item_id).eq('user_id',$user.id);
    console.log(review);
    $modal = {
			title: reviewedItemList[index].name,
      rating : review.body[0].star,
			message: review.body[0].body, 
			buttons: [
				{
					title: '닫기',
					message: 'close',
					onClick: async () => {
            $modal = null;
					}
				},
			]
		};
  }
</script>

{#if writeFlag === false}
	<div
		class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
	>
		<Back icon="arrow" />
		<div class="flex w-full justify-center  font-bold text-base text-gray-800">리뷰관리</div>
	</div>
	<div class="pt-14" />

	<div class="sticky top-14 z-5 grid grid-cols-2">
		<button
			on:click={() => {
				selectFlag = false;
			}}
			class="flex items-center justify-center h-12 {!selectFlag
				? 'border-b border-blue-500 bg-gray-200 font-bold'
				: 'bg-white border-b border-gray-200'}">리뷰 작성</button
		>
		<button
			on:click={() => {
				selectFlag = true;
			}}
			class="flex items-center justify-center h-12 {selectFlag
				? 'border-b border-blue-500 bg-gray-200 font-bold'
				: 'bg-white border-b border-gray-200'} ">작성한 리뷰</button
		>
	</div>
{:else if writeFlag === true}
	<div
		class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
	>
		<button
			on:click={() => {
				writeFlag = false;
			}}
			class="absolute left-4 top-4 text-gray-400"
		>
			<Icon icon="x" />
		</button>
		<div class="flex w-full justify-center  font-bold text-base text-gray-800">리뷰작성</div>
	</div>
	<div class="pt-14" />
{/if}

{#if selectFlag === false}
	{#if writeFlag === true}
		<div class="p-4 border-b">
			<div class="flex items-center gap-2">
				<img class="rounded w-16 h-16 object-cover" src={itemImage} />
				<div>
					<h3 class="font-bold">{itemName}</h3>
				</div>
			</div>
		</div>
		<form
			on:submit|preventDefault={async () => {
				saveReview();
			}}
			class="p-4"
		>
			<div class="flex justify-center gap-1 ">
				<button
					type="button"
					on:click={() => {
						rating = 1;
					}}
					class=""
				>
					<Icon
						icon="star"
						size={32}
						fill={rating >= 1 ? 'yellow' : 'gray'}
						stroke={'none'}
					/></button
				>
				<button
					type="button"
					on:click={() => {
						rating = 2;
					}}
					class=""
				>
					<Icon
						icon="star"
						size={32}
						fill={rating >= 2 ? 'yellow' : 'gray'}
						stroke={'none'}
					/></button
				>
				<button
					type="button"
					on:click={() => {
						rating = 3;
					}}
					class=""
				>
					<Icon
						icon="star"
						size={32}
						fill={rating >= 3 ? 'yellow' : 'gray'}
						stroke={'none'}
					/></button
				>
				<button
					type="button"
					on:click={() => {
						rating = 4;
					}}
					class=""
				>
					<Icon
						icon="star"
						size={32}
						fill={rating >= 4 ? 'yellow' : 'gray'}
						stroke={'none'}
					/></button
				>
				<button
					type="button"
					on:click={() => {
						rating = 5;
					}}
					class=""
				>
					<Icon
						icon="star"
						size={32}
						fill={rating >= 5 ? 'yellow' : 'gray'}
						stroke={'none'}
					/></button
				>
			</div>
			<div class="text-xs text-gray-300 mt-2 flex justify-center">별점을 선택해주세요.</div>

			<textarea
				bind:value={body}
				class="mt-4 flex w-full h-24 border border-gray-300 rounded text-sm placeholder-gray-400"
				placeholder="상세 내용을 작성해주세요."
				required
			/>

			<button
				class="mt-4 text-center w-full bg-blue-500 rounded-full h-10 text-sm text-white font-bold flex items-center justify-center hover:bg-gray-200"
			>
				저장하기
			</button>
		</form>
	{:else}
		{#each unreviewedItemList as item, index}
			<div class="px-4">
				<div class="flex justify-between mt-4 p-4 border border-gray-300 rounded">
					<div class="w-full ">
						<div class="flex justify-between">
							<div class="flex gap-4">
								<a href="/items/{unreviewedList[index]}/detail" class="">
									<img class="rounded  w-16 h-16  object-cover" src={item.image} />
								</a>
								<a
									href="/items/{unreviewedList[index]}/detail"
									class="flex flex-1 items-center font-semibold h-16 text-sm text-gray-800"
								>
									{item.name}
								</a>
							</div>
							<button
								on:click={() => {
									handleWriteClick(index);
								}}
								class="text-gray-500"><Icon icon="edit-2" size={24} /></button
							>
						</div>
					</div>
				</div>
			</div>
		{/each}
	{/if}
{:else if selectFlag === true}
	{#each reviewedItemList as item, index}
		<div class="px-4">
			<button on:click = {()=>{handleReviewClick(index)}} class="flex w-full justify-between mt-4 p-4 border border-gray-300 rounded">
				<div class="w-full ">
					<div class="flex justify-between">
						<div class="flex  gap-4">
							<div class="">
								<img class="rounded  w-16 h-16  object-cover" src={item.image} />
							</div>
							<div class="flex flex-1 items-center font-semibold h-16 text-sm text-gray-800">
								{item.name}
							</div>
						</div>
					</div>
				</div>
			</button>
		</div>
	{/each}
{/if}
<div class="pb-20" />
