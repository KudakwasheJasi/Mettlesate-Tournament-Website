/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 20:31:42
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/__tests__/**/*.test.tsx', 'src/app/**/*.test.tsx'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/__tests__/**/__mocks__/**'],
  },
});
