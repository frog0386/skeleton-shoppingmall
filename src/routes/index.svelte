<script>
	import Icon from '$lib/Icon.svelte';
	import Menu from '$lib/Menu.svelte';
</script>

<div
	class="z-10 font-bold bg-white text-2xl p-4 gap-2 flex justify-between items-center text-blue-500"
>
	<a href="/">fingr</a>
	<div class="flex gap-4 items-center text-black">
		<a href="/search">
			<Icon icon="search" size={24} />
		</a>

		<a href="/notifications">
			<Icon icon="bell" size={24} />
		</a>
	</div>
</div>

<img
	alt=""
	class="h-48 w-full object-cover"
	src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDF8fGZvb2R8ZW58MHx8fHwxNjQ0NzQzODY5&ixlib=rb-1.2.1&q=80&w=1080"
/>

<div class="flex overflow-x-auto gap-2 p-4">
	<div class="text-center w-16">
		<img
			alt=""
			class="w-16 h-16 rounded-full object-cover"
			src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDMwfHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
		/>
		<div class="w-16 font-bold text-sm mt-2">샐러드</div>
	</div>
	<div class="text-center w-16 inline-block">
		<img
			alt=""
			class="w-16 h-16 rounded-full object-cover"
			src="https://images.unsplash.com/photo-1481070555726-e2fe8357725c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDI4fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
		/>

		<div class="w-16 font-bold text-sm mt-2">햄버거</div>
	</div>
	<div class="text-center w-16 inline-block">
		<img
			alt=""
			class="w-16 h-16 rounded-full object-cover"
			src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNjQ0NzQzODY5&ixlib=rb-1.2.1&q=80&w=1080"
		/>

		<div class="w-16 font-bold text-sm mt-2">브런치</div>
	</div>
	<div class="text-center w-16 inline-block">
		<img
			alt=""
			class="w-16 h-16 rounded-full object-cover"
			src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE3fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
		/>

		<div class="w-16 font-bold text-sm mt-2">피자</div>
	</div>
	<div class="text-center w-16 inline-block">
		<img
			alt=""
			class="w-16 h-16 rounded-full object-cover"
			src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDI0fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
		/>
		<div class="w-16 font-bold text-sm mt-2">디저트</div>
	</div>
	<div class="text-center w-16 inline-block">
		<img
			alt=""
			class="w-16 h-16 rounded-full object-cover"
			src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDMwfHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
		/>
		<div class="w-16 font-bold text-sm mt-2">샐러드</div>
	</div>
</div>

<div class="p-4">
	<div class="flex justify-between items-center">
		<div class="mb-1 font-bold text-gray-800">추천 맛집</div>
		<button class="flex items-center gap-1 text-xs">
			더보기
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="gray"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-right"
			>
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</button>
	</div>

	<div class="mt-2 gap-4 flex overflow-x-auto">
		<div>
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
		<div class="inline-block">
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
		<div class="inline-block">
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
	</div>
</div>
<div class="p-4">
	<div class="flex justify-between items-center">
		<div class="mb-1 font-bold text-gray-800">추천 맛집</div>
		<button class="flex items-center gap-1 text-xs">
			더보기
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="gray"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-right"
			>
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</button>
	</div>

	<div class="mt-2 gap-4 flex overflow-x-auto">
		<div>
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
		<div class="inline-block">
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
		<div class="inline-block">
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
	</div>
</div>
<div class="p-4">
	<div class="flex justify-between items-center">
		<div class="mb-1 font-bold text-gray-800">추천 맛집</div>
		<button class="flex items-center gap-1 text-xs">
			더보기
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="gray"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-right"
			>
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</button>
	</div>

	<div class="mt-2 gap-4 flex overflow-x-auto">
		<div>
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
		<div class="inline-block">
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
		<div class="inline-block">
			<img
				alt=""
				class="rounded w-32 h-32 object-cover"
				src="https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ2NXwwfDF8c2VhcmNofDE5fHxmb29kfGVufDB8fHx8MTY0NDc0Mzg2OQ&ixlib=rb-1.2.1&q=80&w=1080"
			/>
			<h3 class="font-bold w-32 mt-2">더 가득담은 미트볼</h3>
			<div class="text-sm text-gray-500 flex items-center gap-1">
				<span class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-star"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
				</span>
				4.9(2,321), 1km
			</div>
			<div class="mt-1 text-xs text-gray-400">무료배달</div>
		</div>
	</div>
</div>
<Menu />
