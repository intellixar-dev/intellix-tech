import next from 'eslint-config-next/core-web-vitals';

const config = [
  ...next,
  { ignores: ['.next/**', 'node_modules/**', 'playwright-report/**', 'test-results/**', 'next-env.d.ts'] },
  // Preserve the site's existing React 18 effect and escaped-copy conventions.
  { rules: { 'react-hooks/set-state-in-effect': 'off', 'react/no-unescaped-entities': 'off' } },
];

export default config;
