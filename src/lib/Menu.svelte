<script>
	import Icon from './Icon.svelte';
</script>

<div class="flex border-t fixed bottom-0 justify-between items-center w-full h-15 bg-white">
	<a href="/" class="flex flex-col items-center w-1/5 py-2 hover text-red-600">
		<Icon icon="home" /> <span class="text-xs mt-1 font-bold">홈</span>
	</a><a href="/courses/1" class="flex flex-col items-center w-1/5 py-2 hover text-gray-800"
		><Icon icon="book" /><span class="text-xs mt-1 font-bold">클래스</span>
	</a><a href="/articles" class="flex flex-col items-center w-1/5 py-2 hover text-gray-800"
		><Icon icon="book-open" /> <span class="text-xs mt-1 font-bold">경제신문</span>
	</a><a href="/more" class="flex flex-col items-center w-1/5 py-2 hover text-gray-800"
		><Icon icon="more-horizontal" /><span class="text-xs mt-1 font-bold">더보기</span>
	</a>
</div>
