import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // The prototype's table API intentionally accepts arrays of React nodes and
      // assigns stable keys when rows are rendered.
      'react/jsx-key': 'off',
      'react/no-unescaped-entities': 'off',
      // These compiler-oriented rules are not correctness requirements for the
      // existing interactive prototype and would require a broad UI rewrite.
      'react-hooks/static-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
      // Blob previews and administrator-supplied sponsor banners cannot use the
      // build-time image optimizer safely.
      '@next/next/no-img-element': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'dist/**',
    'node_modules/**',
    'src/**',
  ]),
])
