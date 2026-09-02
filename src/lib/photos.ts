// Finds the image files inside content/photos/<album>/.
// Images are imported through Astro so they are optimised at build time.
import type { ImageMetadata } from 'astro';

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/content/photos/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

/** The folder name of an album, from its index.md path ("content/photos/<folder>/index.md"). */
export function albumFolder(filePath: string | undefined): string {
  const parts = (filePath ?? '').split('/');
  return parts[parts.length - 2];
}

/** All images in an album folder, sorted by file name. */
export function albumImages(folder: string): { file: string; image: ImageMetadata }[] {
  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(`/content/photos/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => ({ file: path.split('/').pop()!, image: mod.default }));
}
