import { render, screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Body from "../body";


describe('Body', () => {
    it('renders initial body state', () => {
        render(<Body from='100' to='102' />)

        expect(screen.getByTestId('loading')).toBeInTheDocument()
    })

    it('loads up the table after successful API call', async () => {
        render(<Body from='100' to='105' />)
        await waitForElementToBeRemoved(() => screen.queryByText('Loading')).catch((err) =>
            expect(err).toBeFalsy()
        ).then(async () => {
            expect(screen.getByText("Latest Articles")).toBeDefined()

            await waitFor(() => {
                expect(screen.findByText("How ChatGPT was built from the people who made it")).toBeUndefined()
            }).catch((err) => expect(err).toBeFalsy)
        })
    })


    //Note: its better not to use snapshots as they could not be ideal in bigger projects for many reasons
    it('matches expected snapshot', async () => {

        const component = render(<Body from='100' to='111' />);

        expect(component.container).toMatchSnapshot();

        await waitForElementToBeRemoved(() => screen.queryByText('Loading'))
            .then(async () => {
                await component.findByText('Tufte CSS').then(() => {
                    expect(component.container).toMatchSnapshot();
                })
            })
    })

})

