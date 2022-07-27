<script>
	import { page } from '$app/stores';
	import Icon from './Icon.svelte';
	
</script>


<div
	class="fixed sm:mx-auto sm:max-w-sm bottom-0 left-0 right-0 grid grid-cols-5 bg-white border-t h-15"
>
	<a
		href="/items/category"
		class="flex flex-col items-center py-2 hover {$page.url.pathname === '/items/category'
			? 'text-blue-500'
			: 'text-gray-800'}"
	>
		<Icon icon="align-justify" size={24} />
		<span class="text-xs mt-1 font-bold">카테고리</span>
	</a>
	<a
		href="/items/search"
		class="flex flex-col items-center py-2 hover {$page.url.pathname === '/items/search'
			? 'text-blue-500'
			: 'text-gray-800'}"
	>
		<Icon icon="search" size={24} />
		<span class="text-xs mt-1 font-bold">검색</span>
	</a>
	<a
		href="/"
		class="flex flex-col items-center py-2 hover {$page.url.pathname === '/'
			? 'text-blue-500'
			: 'text-gray-800'}"
	>
		<Icon icon="home" size={24} />
		<span class="text-xs mt-1 font-bold">홈</span>
	</a>
	<a
		href="/orders/cart"
		class="flex flex-col items-center py-2 hover {$page.url.pathname === '/orders/cart'
			? 'text-blue-500'
			: 'text-gray-800'}"
		><Icon icon="shopping-cart" size={24} />
		<span class="text-xs mt-1 font-bold">장바구니</span>
	</a>
	<a
		href="/users/mypage"
		class="flex flex-col items-center py-2 hover {$page.url.pathname === '/users/mypage'
			? 'text-blue-500'
			: 'text-gray-800'}"
		><Icon icon="smile" size={24} />
		<span class="text-xs mt-1 font-bold">내 정보</span>
	</a>
</div>
