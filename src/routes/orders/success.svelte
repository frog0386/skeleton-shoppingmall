<script>
  import Icon from '$lib/Icon.svelte';
	import Back from '$lib/Back.svelte';

</script>

<div
	class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex"
>
	<Back icon="x" url="/users/mypage"/>
	<div class="flex w-full justify-center  font-bold text-base text-gray-800">결제 완료</div>
</div>
<div class="pt-32" />

<div class=" text-gray-600 flex justify-center">
<Icon icon ="gift" size = {96}/>
</div>
<div class="text-center pt-6">
<div class="">상품 주문이 완료되었습니다.</div>
<div class="flex justify-center">
<div class="">자세한 내용은 마이페이지의&nbsp</div>
<a href = "/orders/list" class="underline text-blue-400">주문내역</a>
</div>
<div class="">에서 다시 확인하실 수 있습니다.</div>
</div>