<script>
	import { supabase } from '$lib/supabase';
	import { t } from '$lib/translation';
	import { toastMessage } from '$lib/stores';

	import { getUrl } from '$lib/util';

	export let modelName;
	export let fields = [];
	export let currentObject;
	let files = [];
</script>

{#if currentObject}
	<form
		on:submit|preventDefault={async () => {
			// const updateData = fieldDatas.reduce((obj, item) => ((obj[item.field] = item.value), obj), {});
			// console.log(updateData);

			const { data, error } = await supabase.from(modelName).upsert(currentObject);

			if (error) {
				$toastMessage = '저장에 실패했습니다';
			} else if (data) {
				$toastMessage = '저장하였습니다';
				currentObject = null;
			}
		}}
		class="max-w-xl"
	>
		{#each Object.entries(fields).filter(([field, option]) => field !== 'created_at') as [field, option]}
			<label for="" class="label mt-4">{$t(`common.field.${field}`)}</label>

			{#if false}
				<!-- <label for="" class="label mt-4">{$t(`common.field.${field}`)}</label>
			{#await supabase.from(field.field.substr(0, field.field.length - 3)).select() then { data }}
				<select
					id={field.label}
					class="input"
					bind:value={field.value}
					on:change={() => (fieldDatas[index].value = field.value)}
				>
					<option disabled value="" hidden>선택해주세요.</option>
					{#each data as object}
						<option value={object.id}>
							{object[field.optionName]} ({object.id})
						</option>
					{/each}
				</select>
			{/await} -->
			{:else if option.type === 'image'}
				{#await getUrl(currentObject[field]) then url}
					<img src={url} alt="" class="w-24 rounded h-auto mb-2 object-cover" />
				{/await}
				{#each files as file}
					<img
						src={URL.createObjectURL(file)}
						alt=""
						class="mt-4 object-cover aspect-video w-full rounded"
					/>
				{/each}
				<input type="file" name="files" bind:files />
			{:else if option.type === 'date'}
				<input type="date" bind:value={currentObject[field]} class="input" />
			{:else if option.type === 'boolean'}
				<input type="checkbox" bind:value={currentObject[field]} class="input" />
			{:else if option.type === 'textarea'}
				<textarea bind:value={currentObject[field]} class="input h-48" />
			{:else}
				<input type="text" bind:value={currentObject[field]} class="input" />
			{/if}
		{/each}

		<div class="flex gap-2 mt-4">
			<button class="button-sm border-red-500">저장</button>
			<button
				type="button"
				class="button-outline-sm"
				on:click={() => {
					currentObject = null;
				}}>취소</button
			>
		</div>
	</form>
{/if}
