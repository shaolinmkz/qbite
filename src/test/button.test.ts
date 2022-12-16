import { render, screen, fireEvent } from '@testing-library/svelte';
import Button from '$lib/Components/Gallery/button.svelte';

describe('Button', () => {

    it('should click the button', async () => {
        let called = 0;

        const { component } = render(Button, { text: "Hello Test", });
    
        const button = await screen.findByText(/hello test/i);

        expect(button).toBeInTheDocument();

        component.$on('click', () => { called += 1; })

        await fireEvent.click(button);

        expect(called).toEqual(1);
    })
});