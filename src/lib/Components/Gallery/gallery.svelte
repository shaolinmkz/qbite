<script lang="ts">
	import { onMount } from 'svelte';
	import { CarouselTransition } from 'flowbite-svelte';
	import Button from './button.svelte';

	type ImageRaw = { image_url: string; tags: string };

	export let images: ImageRaw[] = [];

	interface ImageData {
		id: number;
		imgurl: string;
		name: string;
		attribution: string;
		className: string;
	}

	const modifiedImageData: ImageData[] = [];

	const composeImageData = (image: ImageRaw, index: number) => ({
		id: index,
		imgurl: image.image_url,
		name: `image ${index}`,
		attribution: image.image_url.split('.dk/')[1]
	});

	const carouselImage = images.map(composeImageData);

	let count = 1;

	images.forEach((image, index) => {
		const data = composeImageData(image, index);

		if (count > 4) count = 0;
		if (count === 1) {
			modifiedImageData.push({ ...data, className: 'col-span-6 row-span-6' });
		} else {
			modifiedImageData.push({ ...data, className: 'col-span-3 row-span-3' });
		}
		count += 1;
	});

	onMount(() => {
		images.forEach(({ image_url }) => {
			// prerender the image
			new Image().src = image_url;
		});
	});
</script>

<div class="desktop">
	{#each modifiedImageData.slice(0, 5) as { imgurl, className } (imgurl)}
		<div style={`background-image:url(${imgurl})`} class={`${className} img-card`} data-testid="img-card" />
	{/each}

	<Button text="Show all photos" />
</div>

<div class="mobile">
	<CarouselTransition
		images={carouselImage}
		transitionType="slide"
		transitionParams={{ delay: 100, duration: 300 }}
		showCaptions={false}
		showThumbs={false}
		indicatorClass="hidden"
		divClass="h-full"
	/>
</div>

<style lang="postcss">
	.mobile {
		@apply mt-6 md:hidden w-full min-w-[320px] px-6 min-h-[500px];
	}

	.desktop {
		@apply relative hidden md:grid grid-cols-12 grid-rows-6 mt-5 gap-2 rounded-2xl overflow-hidden max-w-[1280px] mx-auto h-[500px];
		cursor: pointer;
	}

	.desktop > .img-card {
		@apply relative bg-cover;
	}

	.desktop > .img-card:hover::after {
		@apply absolute inset-0;
		content: '';
		animation: fade 0.3s forwards;
	}

	@keyframes fade {
		0% {
			background-color: rgba(0, 0, 0, 0);
		}

		100% {
			background-color: rgba(0, 0, 0, 0.3);
		}
	}
</style>
