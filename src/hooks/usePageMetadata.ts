import { useEffect } from 'react';

type MetadataOptions = {
  title: string;
  description: string;
  canonicalPath?: string;
};

const getMetaElement = (name: string) =>
  document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;

export function usePageMetadata({ title, description, canonicalPath }: MetadataOptions) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const descriptionTag = getMetaElement('description');
    if (descriptionTag) {
      descriptionTag.content = description;
    } else {
      const newTag = document.createElement('meta');
      newTag.name = 'description';
      newTag.content = description;
      document.head.appendChild(newTag);
    }

    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      const origin = window.location.origin || 'https://www.taxhelp.ai';
      canonical.href = `${origin}${canonicalPath}`;
    }
  }, [title, description, canonicalPath]);
}
