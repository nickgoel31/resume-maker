export function ConvertToSvg(profileUrl: string): string {
    // Define the size of the circle
    const circleSize = 100;

    // Define the SVG markup
    const svgMarkup = `
        <svg width="${circleSize}" height="${circleSize}" viewBox="0 0 ${circleSize} ${circleSize}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="circleClip">
                    <circle cx="${circleSize / 2}" cy="${circleSize / 2}" r="${circleSize / 2}" />
                </clipPath>
            </defs>
            <rect width="${circleSize}" height="${circleSize}" fill="#ccc" clip-path="url(#circleClip)" />
            <image href="${profileUrl}" x="0" y="0" width="300px" height="150%" clip-path="url(#circleClip)" />
        </svg>
        <style>
            image {
                object-fit: cover;
                width: 150%;
                height: 150%;
            }
        </style>
    `;

    return svgMarkup;
}
