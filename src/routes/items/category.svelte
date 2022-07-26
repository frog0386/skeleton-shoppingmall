<script>
  import Icon from '$lib/Icon.svelte';
  import Menu from '$lib/Menu.svelte';
  import Back from '$lib/Back.svelte';
  import {onMount} from 'svelte';
  import { supabase } from '$lib/supabase';
  let categories = [];
  onMount ( async() => {
    let data = await supabase.from('category').select();
    categories = data.body;
  });
</script>

<div class="bg-white h-14 px-4 items-center border-b flex">
  <Back icon = "arrow"/>
  <div
    class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800"
  >
    카테고리
  </div>
</div>
<div class="grid grid-cols-2 gap-4 p-4 text-sm">

  {#each categories as category}
  <a href = "/items/categories/{category.id}" class="text-center ">
    <div class="py-3 bg-gray-100 rounded-full ">{category.name}</div>
  </a>

  {/each}
  
</div>
<Menu/>
