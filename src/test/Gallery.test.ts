import { render, screen } from '@testing-library/svelte'
import Gallery from '$lib/Components/Gallery/gallery.svelte';
import imagesData from '$lib/data/image_data.json';

	const [{ images }] = imagesData;

describe('Gallery', () => {

    it('should render gallery with no images', async () => {
        render(Gallery, { images: [] });

        const button = await screen.findByText(/show all photos/i);

        expect(button).toBeInTheDocument();
    });

    it('should render gallery with some images', async () => {
        render(Gallery, { images });

        const cards = await screen.findAllByTestId('img-card');

        expect(cards.length).toBe(5);
    })
});