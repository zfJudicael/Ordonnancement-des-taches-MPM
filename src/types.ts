import type { Options } from "modern-screenshot";

export type ImageType = 'png' | 'jpeg';

export interface UseScreenshotOptions extends Options{
    type?: ImageType;
    fileName?: string;
}

export interface SimpleNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, any>;
}

export interface SimpleEdge {
    id: string;
    type: string;
    source: string;
    target: string;
    animated: boolean;
    data: Record<string, any>;
}