import type { Metadata } from 'next'

type Edition = 'us' | 'ca'

/**
 * Canonical and language alternate metadata for equivalent US and Canadian pages.
 * Relative paths are made absolute by `metadataBase` in the root layout.
 */
export function pairedAlternates(
  usPath: string,
  caPath: string,
  edition: Edition,
): Metadata['alternates'] {
  return {
    canonical: edition === 'us' ? usPath : caPath,
    languages: {
      'en-US': usPath,
      'en-CA': caPath,
      'x-default': usPath,
    },
  }
}

/** Canonical metadata for a page that only exists in one regional edition. */
export function singleEditionAlternates(path: string, language: 'en-US' | 'en-CA'): Metadata['alternates'] {
  return {
    canonical: path,
    languages: { [language]: path },
  }
}
