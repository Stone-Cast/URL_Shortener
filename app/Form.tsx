"use client";

import { useEffect, useState } from "react";
import { createItem } from "./actions";

const Form = () => {
    const [origin, setOrigin] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");

    useEffect(() => {
        setOrigin(window.location.origin);
    });

    async function handleSubmit(formData: FormData) {
        setShortUrl(null);
        const shortUrlCode = await createItem(formData);
        if (shortUrlCode?.longUrlExisted && shortUrlCode.shortUrl) {
            setMessage("The long URL already exists. Here's its short URL: ");
            setShortUrl(`${origin}/${shortUrlCode.shortUrl}`);
        } else if (shortUrlCode?.shortCodeExisted) {
            setMessage("This short code is already in use. Try another one.");
        } else {
            if (shortUrlCode?.shortUrl) {
                setMessage("Your shortened URL: ");
                setShortUrl(`${origin}/${shortUrlCode.shortUrl}`);
            }
        }
    }

    return (
        <>
            <form action={handleSubmit}>
                <label htmlFor="longUrl">
                    Enter the URL you need shortened
                </label>
                <br />
                <input
                    type="url"
                    name="longUrl"
                    id="longUrl"
                    placeholder="Long Url"
                    value={input}
                    required
                    onChange={(e) => setInput(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    name="userCode"
                    id="userCode"
                    placeholder="Suggest a shorter version"
                />
                <br />
                <button type="submit">Shorten</button>{" "}
                <button onClick={() => setInput("")}>Clear</button>
            </form>
            <br />
            {message && <p>{message}</p>}
            {shortUrl && (
                <a href={shortUrl} target="_blank">
                    {shortUrl}
                </a>
            )}
        </>
    );
};

export default Form;
