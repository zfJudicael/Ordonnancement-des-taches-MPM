import type { Options } from "modern-screenshot";

export type ImageType = 'png' | 'jpeg';

export interface UseScreenshotOptions extends Options{
    type?: ImageType;
}