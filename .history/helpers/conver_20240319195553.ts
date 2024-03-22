export function ConvertToSvg(profileUrl: string): string {
    // Define the size of the circle
    const circleSize = 100;

    // Define the SVG markup
    const svgMarkup = `
        <svg width="${circleSize}" height="${circleSize}" viewBox="0 0 ${circleSize} ${circleSize}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${circleSize / 2}" cy="${circleSize / 2}" r="${circleSize / 2}" fill="#ccc" />
            <image href="${profileUrl}" x="0" y="0" width="${circleSize}" height="${circleSize}" clip-path="circle(${circleSize / 2} ${circleSize / 2} ${circleSize / 2})"/>
        </svg>
    `;

    return svgMarkup;
}
