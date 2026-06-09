import { useEffect } from 'react';

/**
 * Custom React hook to dynamically update document title and meta description.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);
}
