<script>
	import Menu from '$lib/Menu.svelte';
	import { supabase } from '$lib/supabase';
	import { user, profile } from '$lib/stores';
	import { toastMessage } from '$lib/stores';
	import Icon from '$lib/Icon.svelte';
	import { onMount } from 'svelte';
	import { getProfile } from '$lib/util';
	

	let username = '';
	let name = '';
	let email = '';
	let profileimage;
	let userFlag = true;
	let likeCount ;
	let orderCount;
	let reviewCount;
	onMount( async() => {
		let user = supabase.auth.user();
		if(!user){
			userFlag = false;
		}else{
			let like = await supabase.from('like').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
			likeCount = like.count;
			let order = await supabase.from('order').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status','paid');
			orderCount = order.count;
			let review = await supabase.from('review').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
			reviewCount = review.count;
		}
		console.log($profile);
		username = $profile.user_info[0].username;
		email = $profile.email;
		name = $profile.name;
		profileimage = $profile.user_info[0].profileimage;
	})
</script>

<div class=" p-4 border-b">
	<div class="text-lg font-bold">MY FINGR</div>
</div>
<div class="px-4">
	{#if $user && $profile}
			<div class="flex justify-between items-center p-4">
				<div class="flex items-center gap-4 ">
					<div class="flex justify-center w-16 h-16">
						{#if $profile.user_info[0].profileimage === null}
							<img
								alt="profileImage_none"
								src="https://mblogthumb-phinf.pstatic.net/MjAxNzEyMTdfMjYy/MDAxNTEzNTEyMDk1MjIy.kvBTUStr5otnfzCcABVd7yXmVoY7mCZOljrv93z8E1wg.W4e90cbW47lOcvB3TQCDOZlPK9hQNAEqud95xoUrBt4g.PNG.brhyme/%EA%B3%B5%ED%8F%AC%EC%9D%98_%EC%B9%B4%ED%86%A1_%EA%B8%B0%EB%B3%B8_%ED%94%84%EC%82%AC.png?type=w800"
								class="w-16 h-16 rounded-full"
							/>
						{:else}
							<img
								alt="profileImage"
								src={$profile.user_info[0].profileimage}
								class="w-16 h-16 border rounded-full object-cover"
							/>
						{/if}
					</div>

					<div class="space-y-1">
						{#if username === null}
						<div class="font-bold text-lg ">{name}</div>
						{:else}
						<div class="font-bold text-lg ">{username}</div>
						{/if}
						<div class="text-gray-400 text-xs  ">{email}</div>
					</div>
				</div>

				<a
					href="/users/edit"
					class="flex items-center justify-center text-sm text-gray-400  border rounded-full h-8 w-20 hover:bg-blue-500 hover:text-white "
				>
					수정하기
				</a>
			</div>

			<div class="mt-4">
				<div class="flex justify-between gap-2  items-center bg-gray-100 p-3 mx-6 rounded-full">
					<div class="flex gap-2 items-center">
						<button class="w-5 h-5"
							><div
								class="w-full h-full flex items-center justify-center bg-blue-600 text-white  rounded-md font-bold border-black text-xs "
							>
								N
							</div></button
						>
						<div class="flex gap-2 text-xs">
							<div class="font-bold">요즘 내 관심사는? 맞춤 상품 추천받기!</div>
						</div>
					</div>
					<div class="">
						<a href="">
							<Icon icon="chevron-right" size={24} />
						</a>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 px-4 py-6 border-b">
				<a href="/users/likes" class="w-full space-y-2 py-2"
					><div class="flex justify-center">
						<Icon icon="heart" size={24} />
					</div>
					<div class="flex gap-1 justify-center">
						<div class="">찜</div>
						{#if likeCount}
						<div class="font-bold ">{likeCount}</div>
						{/if}
					</div>
				</a>

				<a href = "/users/reviews" class="w-full space-y-2 py-2"
					><div class="flex justify-center">
						<Icon icon="star" size={24} />
					</div>
					<div class="flex gap-1 justify-center">
						<div class="">리뷰</div>
						{#if reviewCount}
						<div class="font-bold ">{reviewCount}</div>
						{/if}
					</div>
				</a>

				<a href = "/orders/list" class="w-full space-y-2 py-2"
					><div class="flex justify-center">
						<Icon icon="clipboard" size={24} />
					</div>
					<div class="flex gap-1 justify-center">
						<div class="">주문내역</div>
						{#if orderCount}
						<div class="font-bold ">{orderCount}</div>
						{/if}
					
					</div>
				</a>
			</div>

			<a href="" class="mx-4 my-2 py-3 font-bold flex items-center gap-2 border-b ">
				<Icon icon="align-justify" size={24} />공지사항
			</a>
			<a href="" class="mx-4 my-2 py-3 font-bold flex items-center gap-2 border-b ">
				<Icon icon="bell" size={24} />알림 설정
			</a>
			<a href="" class="mx-4 my-2 py-3 font-bold flex items-center gap-2 border-b ">
				<Icon icon="help-circle" size={24} />자주 묻는 질문
			</a>
			<a href="" class="mx-4 my-2 py-3 font-bold flex items-center gap-2 border-b ">
				<Icon icon="message-square" size={24} />1:1문의
			</a>
	{:else if userFlag === false}
		<div class="space-y-4 mt-6">
			<div class="space-y-2">
				<div class="text-gray-500">아직 Fingr 회원이 아니신가요?</div>
				<div class="text-2xl font-bold">가입하고 특별한 혜택을 누려보세요!</div>
			</div>
			<a
				href="/users/signup"
				class="rounded border-2 h-12 flex justify-center items-center border-gray-500 text-gray-500"
				>회원가입하기</a
			>
			<a
				href="/users/login"
				class=" rounded border-2 h-12 flex justify-center items-center border-blue-500 text-white bg-blue-500"
				>로그인하기</a
			>
		</div>
	{/if}
</div>

<Menu />
