// Base path the site is served from (set for GitHub Pages builds, empty locally).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a public asset path with the deployment base path.
 *
 * next/image and next/link apply the basePath automatically, but raw fetches
 * (the GLTF model, the testimonial <video>) do not — use this for those.
 */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
