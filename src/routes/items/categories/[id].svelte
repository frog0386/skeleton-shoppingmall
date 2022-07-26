<script>
  import Icon from '$lib/Icon.svelte';
  import Back from '$lib/Back.svelte';
  import {onMount} from 'svelte';
  import { supabase } from '$lib/supabase';
  import Menu from '$lib/Menu.svelte';
  import { page } from '$app/stores';
import Category from '../category.svelte';
import { addComma } from '$lib/util';
import {loading} from '$lib/stores';
$loading = true;
  let items = [];
  let categoryName;
  onMount(async() => {
    let data = await supabase.from('item').select('*,category(name)').eq('category_id', $page.params.id);
    items = data.body;
    categoryName = items[0].category.name;
    $loading = false;
  });
</script>

<div class="fixed w-full bg-white h-14 px-4 items-center border-b flex">
  <Back icon = "arrow"/>
  <div
    class="flex flex-1 justify-center pr-8 font-bold text-base text-gray-800"
  >
    {categoryName}
  </div>
</div>
<div class="pt-16" />
<div class="px-4 pt-4">
  <div class="grid grid-cols-2 gap-4">

    {#each items as item}
    <div>
      <img
        alt = {item.name}
        class="rounded w-full h-44 object-cover"
        src={item.image}
      />
      <h3 class="mt-2 font-bold h-14 truncate">{item.name}</h3>
      <div class="text-xs text-gray-400 line-through">{addComma(item.normal_price)} 원</div>
      <div class="text-gray-500 text-sm">{addComma(item.price)} 원</div>
      
      <div class="text-sm text-gray-500 flex items-center gap-1">
        <span class="text-yellow-300">
          <Icon icon="star" size={16} />
        </span>
        {item.rating}
      </div>
    </div>
    {/each}
  </div>
</div>

<div class="pb-20" />
<Menu/>
