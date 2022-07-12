<script>
	import { toast } from '@zerodevx/svelte-toast';
	import Admin from '$lib/Admin.svelte';
	import { supabase } from '$lib/supabase';
	import { dateFormat, getUrl } from '$lib/util';
	import { t } from '$lib/translation';
	import Edit from '$lib/Edit.svelte';
	import { toastMessage } from '$lib/stores';

	export let modelName;
	export let perPage = 20;
	export let fields = {};
	export let title;
	export let isCreate = true;
	export let isEdit = true;
	export let isDelete = true;

	let objects = [],
		totalPage = 0,
		pageNum = 0,
		order = 'created_at',
		reverse,
		currentObject = null;

	const getData = async (pageNum) => {
		let query = supabase.from(modelName).select('*', { count: 'exact' });

		Object.entries(fields).forEach(([field, option]) => {
			if (option.value) {
				if (option.type === 'boolean') {
					query = query.eq(field, option.value);
				} else if (field === 'user_id') {
					query = query.eq(field, option.value);
					// query = query.eq(`${option.model}_${option.field}`, option.value);
				} else if (option.type === 'date') {
					const startTime = new Date(option.value);
					const endTime = new Date(option.value);
					endTime.setDate(endTime.getDate() + 1);

					const startString = startTime.toISOString();
					const endString = endTime.toISOString();

					query = query.gte(field, startString);
					query = query.lt(field, endString);
				} else if (option.value) {
					query = query.like(field, `%${option.value}%`);
				}
			}
		});

		query = query.order(order, { ascending: !reverse });
		query.range(pageNum * perPage, (pageNum + 1) * perPage - 1);

		const { data, count, error } = await query;
		if (data) {
			objects = data;
		}
		totalPage = Math.ceil(count / perPage);
	};

	$: getData(pageNum);
</script>

<Admin>
	<h2 class="text-xl font-bold mb-2">
		{title ? title : $t(`common.model.${modelName}`)} 관리
	</h2>
	{#if !currentObject}
		<div class="pr-48 overflow-x-auto">
			<table class="w-full text-xs border-t">
				<tr class="font-bold">
					{#each Object.entries(fields) as [field, option]}
						<td>{$t(`common.field.${field}`)}</td>
					{/each}
					<td>편집</td>
				</tr>
				{#each objects as object}
					<tr>
						{#each Object.entries(fields) as [field, option]}
							<td>
								{#if option}
									{#if field === 'user_id' || option.type === 'user'}
										{#await supabase
											.from('profile')
											.select()
											.eq('user_id', object[field]) then { data }}
											{#if data[0]}
												{data[0].nickname ? data[0].nickname : '-'} ({object[field]})
											{/if}
										{/await}
									{:else if field === 'created_at' || option.type === 'date'}
										{dateFormat(object[field])}
									{:else if option.type === 'image'}
										{#await getUrl(object[field]) then url}
											<a href={url} target="_blank">
												<img src={url} alt="" class="w-12" />
											</a>
										{/await}
									{:else if option.type === 'file'}
										{#await getUrl(object[field]) then url}
											<a href={url} class="underline " target="_blank">파일</a>
										{/await}
									{:else if option.type === 'boolean'}
										<input type="checkbox" disabled bind:checked={object[field]} />
									{:else if option.type === 'textarea'}
										<div class="whitespace-pre-wrap truncate w-60">
											{object[field] ? object[field].slice(0, 1000) : '-'}
										</div>
									{:else if field === 'url' || field === 'link'}
										<a href={object[field]} class="underline " target="_blank">{object[field]}</a>
									{:else}
										<div class="whitespace-pre-wrap">
											{object[field] !== null ? object[field] : ''}
										</div>
									{/if}
								{:else if typeof field === 'object'}
									{#await supabase
										.from(field['model'])
										.select(field['select'])
										.match({ id: object[`${field['model']}_id`] })
										.single() then { data, error }}
										{#if data}
											<a
												href={field['select']
													? `/admin/${field['field']}/${data[field].id}/edit`
													: `/admin/${field['model']}/${data.id}/edit`}
												class="underline"
											>
												{#if option.type === 'checkbox'}
													<input type="checkbox" disabled checked={data[field['field']]} />
													<!-- {:else if field.innerField}
													{data[field.field][field.innerField] !== null
														? data[field.field][field.innerField]
														: ''} -->
												{:else}
													{data[field] !== null ? data[field] : ''}
												{/if}
											</a>
										{/if}
									{/await}
								{/if}
							</td>
						{/each}

						<td>
							{#if isEdit}
								<button
									class="underline"
									on:click={() => {
										currentObject = object;
									}}>편집</button
								>
							{/if}
							{#if isDelete}
								<button
									on:click={async () => {
										if (confirm('정말로 삭제하시겠습니까?')) {
											const { error } = await supabase
												.from(modelName)
												.delete()
												.match({ id: object.id });
											if (error) {
												$toastMessage = '삭제에 실패했습니다';
											} else {
												$toastMessage = '성공적으로 삭제하였습니다';
												getData(pageNum);
											}
										}
									}}
									class="underline">삭제</button
								>
							{/if}
						</td>
					</tr>
				{/each}
			</table>
			{#if objects.length > 0}
				<div class="flex items-center justify-between">
					<div class="mt-4 flex flex-wrap text-xs">
						{#each Array(totalPage) as _, i (i)}
							<button
								on:click={() => {
									pageNum = i;
								}}
								class="w-6 h-6 flex items-center justify-center border mr-2 mb-2 {pageNum === i
									? 'text-gray-700 font-bold'
									: 'text-gray-300'}"
							>
								{i + 1}
							</button>
						{/each}
					</div>
					{#if isCreate}
						<button on:click={() => (currentObject = {})} class="float-right button-sm w-24"
							>만들기</button
						>
					{/if}
				</div>
			{:else}
				<div class="text-center mx-auto py-10 text-gray-500 text-sm">
					데이터가 존재하지 않습니다
				</div>
			{/if}
		</div>
		<div class="w-48 bg-white fixed right-0 top-0 p-4 border-l h-screen">
			<h3 class="font-bold mb-4">필터</h3>
			<form
				on:submit|preventDefault={async () => {
					pageNum = 0;
					await getData(pageNum);
				}}
			>
				{#each Object.entries(fields) as [field, option]}
					{#if !option.type || ['id', 'user_id'].includes(field)}
						<label for="" class="label">{$t(`common.field.${field}`)}</label>
						<input type="text" class="input-sm w-full mb-2" bind:value={option.value} />
					{:else if option.type === 'date'}
						<label for="" class="label">{$t(`common.field.${field}`)}</label>
						<input type="date" class="input-sm w-full mb-2" bind:value={option.value} />
					{:else if option.type === 'checkbox'}
						<label for="" class="label">{$t(`common.field.${field}`)}</label>
						<input type="checkbox" bind:checked={option.value} />
					{/if}
				{/each}

				<label for="" class="label">정렬</label>
				<select class="input-sm w-full mb-2" bind:value={order}>
					{#each Object.entries(fields) as [field]}
						{#if typeof field !== 'object'}
							<option value={field}>{$t(`common.field.${field}`)}</option>
						{/if}
					{/each}
				</select>
				<label class="text-sm mb-2 block">
					<input type="checkbox" bind:checked={reverse} /> 역순
				</label>

				<button class="button-outline-sm">필터</button>
			</form>
		</div>
	{:else}
		<Edit bind:currentObject {modelName} {fields} />
	{/if}
</Admin>
