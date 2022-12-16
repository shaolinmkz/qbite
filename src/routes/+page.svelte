<script lang="ts">
	import Gallery from '$lib/Components/Gallery/gallery.svelte';

	import imagesData from '../lib/data/image_data.json';

	const [{ images }] = imagesData;
</script>

<Gallery {images} />

<style>
    :global(body) {
        background-color: rgb(50, 50, 50);
    }
</style>