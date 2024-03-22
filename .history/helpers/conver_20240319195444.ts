import { createSVGWindow } from 'svgdom';
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import fetch from 'node-fetch';
import { URL } from 'url';

export async function ConvertToSvg(profileUrl: string): Promise<string> {
    // Create a window with SVG
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    // Create SVG canvas
    const canvas = SVG(document.documentElement);

    // Load the image from the URL
    const response = await fetch(profileUrl);
    const imageData = await response.arrayBuffer();

    // Create SVG image element
    const image = canvas.image(new URL(profileUrl).toString());
    
    // Set width and height
    image.width(100);
    image.height(100);

    // Create a clip path for circular shape
    const clip = canvas.clip().circle(50);

    // Apply clip path to the image
    image.clipWith(clip);

    // Return SVG as string
    return canvas.svg();
}
