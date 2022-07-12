<script>
	// import Icon from './Icon.svelte';
	import Icon from '@iconify/svelte';
</script>

<div
	class="fixed sm:mx-auto sm:max-w-sm bottom-0 left-0 right-0 grid grid-cols-5 bg-white border-t h-15"
>
	<a href="/" class="flex flex-col items-center py-2 hover text-indigo-600">
		<Icon icon="carbon:home" width="30" />
		<span class="text-xs mt-1 font-bold">홈</span>
	</a>
	<a href="/users" class="flex flex-col items-center py-2 hover text-gray-800">
		<Icon icon="mdi-light:home" width="30" />
		<span class="text-xs mt-1 font-bold">전문가</span>
	</a>
	<a href="/items/new" class="flex flex-col items-center py-2 hover text-gray-800">
		<Icon icon="mdi-light:home" width="30" />
		<span class="text-xs mt-1 font-bold">요청하기</span>
	</a>
	<a href="/chats" class="flex flex-col items-center py-2 hover text-gray-800">
		<Icon icon="mdi-light:home" width="30" />
		<span class="text-xs mt-1 font-bold">채팅</span>
	</a>
	<a href="/users/mypage" class="flex flex-col items-center py-2 hover text-gray-800">
		<Icon icon="mdi-light:home" width="30" />
		<span class="text-xs mt-1 font-bold">더보기</span>
	</a>
</div>
