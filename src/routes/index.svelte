<script>
	import Icon from '$lib/Icon.svelte';
	import Menu from '$lib/Menu.svelte';
</script>

<div
  class="text-xl px-4 h-14 flex items-center  bg-blue-500 text-white font-black flex-1 "
>
  FINGR
</div>

<div class="px-4 py-2 bg-blue-500 ">
  <div class="text-gray-400 flex gap-3 items-center bg-white p-2">
    <Icon icon="search" size={24} />상품 검색
  </div>
</div>

<div class="py-4 mx-4  text-lg  font-black">이번 주! TOP10</div>

<div class="px-4 pb-8">
  <div class=" gap-2 flex overflow-x-auto">
    <a href="/" class=" space-y-2 relative ">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
      <div class="absolute top-0 right-2">
        <div
          class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md "
        >
          1
        </div>
      </div>
    </a>
    <a href="/" class=" space-y-2 relative ">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
      <div class="absolute top-0 right-2">
        <div
          class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md "
        >
          2
        </div>
      </div>
    </a>
    <a href="/" class=" space-y-2 relative ">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
      <div class="absolute top-0 right-2">
        <div
          class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md "
        >
          3
        </div>
      </div>
    </a>

    <a href="/" class=" space-y-2 relative ">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
      <div class="absolute top-0 right-2">
        <div
          class="text-white text-center  bg-blue-600 w-6 h-6 font-bold rounded-md "
        >
          4
        </div>
      </div>
    </a>
  </div>
</div>

<div class="mx-4 flex justify-between items-end bg-white border-t py-4">
  <div class="text-lg font-black flex">카테고리 1</div>
  <a href="/clause" class="text-gray-500  text-sm mr-3">더보기</a>
</div>

<div>
  <div class="grid grid-cols-2 gap-4  pb-4 px-4 bg-white">
    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
    <a href="/" class="space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
  </div>
  <div class="grid grid-cols-2 gap-4  pb-4 px-4 bg-white">
    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
    <a href="/" class="space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
  </div>
</div>

<div class="mx-4 flex justify-between items-end bg-white border-t py-4">
  <div class="text-lg font-black flex">카테고리 1</div>
  <a href="/clause" class="text-gray-500  text-sm mr-3">더보기</a>
</div>

<div>
  <div class="grid grid-cols-2 gap-4  pb-4 px-4 bg-white">
    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
    <a href="/" class="space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
  </div>
  <div class="grid grid-cols-2 gap-4  pb-4 px-4 bg-white">
    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
    <a href="/" class="space-y-2">
      <img
        class="rounded-md w-40 h-40 object-cover"
        src="https://images.unsplash.com/photo-1638913662584-731da41f5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwxfDF8c2VhcmNofDE1fHxwcm9kdWN0fGVufDB8fHx8MTY0NDc0MDcyMw&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="">[여름침구대전] 홈캉스에 품격을 더해줄 여름! 구스!</div>
      <div class="flex items-center">
        <span class=" text-sm font-bold">1,000,000</span>
        <span class="text-gray-700 text-sm">원</span>
      </div>
    </a>
  </div>
</div>

<div class="py-4 mx-4  text-lg  font-black border-t">최근 본 상품</div>

<div class="px-4 pb-8">
  <div class=" gap-2 flex overflow-x-auto">
    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
    </a>
    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
    </a>
    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
    </a>

    <a href="/" class=" space-y-2">
      <img
        class="rounded-md w-28 h-28 object-cover border border-gray-300"
        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDd8fG1vYmlsZXxlbnwwfHx8fDE2NDQ3NDE3MTM&ixlib=rb-1.2.1&q=80&w=1080"
      />
      <div class="w-28">
        <div class=" text-sm  block text-elipses overflow-hidden">
          삼립빵 14종 허쉬 초코롤 단팥빵
        </div>
        <div class="text-red-400 text-sm font-bold">10,000원</div>
      </div>
    </a>
  </div>
</div>
<div class="pb-16"></div>
<Menu />
