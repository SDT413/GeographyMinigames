export default function ImageProduction(src: string): string {
    const production = process.env.NODE_ENV === 'production';
    const path = production ? '/GeographyMinigames' : '';
    return "url(\'" + path + src + "\')" ;
}