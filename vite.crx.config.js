import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src/crx',
    build: {
        outDir: '../../dist/crx',
        emptyOutDir: true
    }
});
