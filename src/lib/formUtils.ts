import React from 'react';

/**
 * Handles focus and scroll-to-view of the first invalid HTML5 input element in a form.
 */
export const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
  const firstInvalidElement = e.currentTarget.querySelector(':invalid') as HTMLElement;
  if (firstInvalidElement) {
    // Delay the scroll to let the browser's native validation popup show first
    setTimeout(() => {
      firstInvalidElement.focus();
      firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }
};
