import { ref } from 'vue';
import { domToJpeg as ElToPng, domToPng as ElToJpg } from 'modern-screenshot';
import type { Options as HTMLToImageOptions } from 'modern-screenshot';
import type { ImageType, UseScreenshotOptions } from '@/types';

export function useScreenshot() {
  const dataUrl = ref<string>('');
  const imgType = ref<ImageType>('png');
  const error = ref();

  async function capture(el: HTMLElement, options: UseScreenshotOptions = {}) {
    let data;

    const fileName = options.fileName ?? `diagram-${Date.now()}`;

    switch (options.type) {
      case 'jpeg':
        data = await toJpeg(el, options);
        break;
      case 'png':
        data = await toPng(el, options);
        break;
      default:
        data = await toPng(el, options);
        break;
    }
    
    download(fileName);

    return data;
  }

  function toJpeg(
    el: HTMLElement,
    options: HTMLToImageOptions = { quality: 0.95 }
  ) {
    error.value = null;

    return ElToJpg(el, options)
      .then((data) => {
        dataUrl.value = data;
        imgType.value = 'jpeg';
        return data;
      })
      .catch((error) => {
        error.value = error;
        throw new Error(error);
      });
  }

  function toPng(
    el: HTMLElement,
    options: HTMLToImageOptions = { quality: 0.95 }
  ) {
    error.value = null;

    return ElToPng(el, options)
      .then((data) => {
        dataUrl.value = data;
        imgType.value = 'png';
        return data;
      })
      .catch((error) => {
        error.value = error;
        throw new Error(error);
      });
  }

  function download(fileName: string) {
    const link = document.createElement('a');
    link.download = `${fileName}.${imgType.value}`;
    link.href = dataUrl.value;
    link.click();
  }

  return {
    capture,
    download,
    dataUrl,
    error,
  };
}
