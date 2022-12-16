<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let text = 'Placeholder';
</script>

<button
	class="absolute bg-white flex gap-1 py-2 px-2.5 rounded-lg right-4 bottom-4 border-black border"
	type="button"
	on:click={() => dispatch('click')}
>
	<div class="relative flex flex-wrap w-[25px] mt-[-9px] scale-75">
		{#each '• '.repeat(9).split(' ') as dot}
			<span class="flex h-[8px]">{dot}</span>
		{/each}
	</div>
	<p class=" text-sm">{text}</p>
</button>
