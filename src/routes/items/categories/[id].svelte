<script>
  import Icon from '$lib/Icon.svelte';
  import Back from '$lib/Back.svelte';
  import {onMount} from 'svelte';
  import { supabase } from '$lib/supabase';
  import Menu from '$lib/Menu.svelte';
  import { page } from '$app/stores';
import { addComma } from '$lib/util';
import {loading} from '$lib/stores';

  let items = [];
  let categoryName = ' ';
  onMount(async() => {
    $loading = true;
    let data = await supabase.from('item').select('*,category(*),brand(*)').eq('category_id', $page.params.id);
    console.log(data);
    items = data.body;
    categoryName = items[0].category.name;
    $loading = false;
  });

</script>

<div class="fixed top-0 sm:mx-auto sm:max-w-sm left-0 right-0 bg-white h-14 justify-center items-center border-b flex">
  <Back icon = "arrow"/>
  <div
    class="flex w-full justify-center  font-bold text-base text-gray-800"
  >
    {categoryName}
  </div>
</div>
<div class="pt-16" />
<div class="px-4 pt-4">
  <div class="grid grid-cols-2 gap-4">

    {#each items as item}
    <div>
      <a href = "/items/{item.id}/detail">
      <img
        alt = {item.name}
        class="rounded w-full h-44 object-cover"
        src={item.image}
      />
      <div class="text-sm mt-2 font-bold text-gray-600">{item.brand.brandname}</div>
      <h3 class=" font-bold h-20">{item.name}</h3>
      <div class="text-xs text-gray-400 line-through">{addComma(item.normal_price)} 원</div>
      <div class="font-bold ">{addComma(item.price)} 원</div>
    </a>
      <div class="justify-between text-sm text-gray-500 flex items-center gap-1">
        <div class="flex items-center justify-center gap-2"><span class="text-yellow-200">
          <Icon icon="star" size={24} fill={'yellow'} />
        </span>
        {item.rating}</div>
        
        <div class="flex justify-center h-8 w-16 items-center gap-2">
          <div class="text-red-700"><Icon icon="heart-fill" size={24}/></div>
          
          <div class="">{item.like_count}</div>
        </div>
      </div>
    </div>
    {/each}
  </div>
</div>

<div class="pb-20" />
<Menu/>
