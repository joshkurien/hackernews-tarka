import { describe, expect, it } from "vitest";
import { Item, NewStories } from "../api";

describe('API', () => {
    describe('Item', () => {
        it('works as expected', async () => {
            await expect(Item(54134)).resolves.toStrictEqual({
                "by": "irrelative",
                "descendants": 7,
                "id": 54134,
                "kids": [
                    54142,
                    54151,
                    54171,
                    54306
                ],
                "score": 3,
                "text": "",
                "time": 1189659118,
                "title": "How far can you go after the gas light has come on in your car?",
                "type": "story",
                "url": "http://tankonempty.com/",
            })
        })
    })

    describe('NewStories', () => {
        it('works as expected', async () => {
            await expect(NewStories()).resolves.toHaveLength(500)
            await expect(NewStories()).resolves.toContain(35034265, 35032873, 35026542)
        })
    })
})