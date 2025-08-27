import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            exclude: [
                'src/stories/**/*',
                'src/**/*.stories.ts',
                'src/**/*.stories.tsx',
                'src/**/*.test.ts',
                'src/**/*.test.tsx',
                'src/**/*.spec.ts',
                'src/**/*.spec.tsx',
                'src/**/*.css',
                'src/**/*.scss'
            ],
        }),
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
        preprocessorOptions: {
            scss: {
                additionalData: '',
            },
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'CoolTeoCarousel',
            formats: ['es', 'umd'],
            fileName: (format) => `cool-teo-carousel.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
            // Exclude story files and other development-only files from the build
            input: resolve(__dirname, 'src/index.ts'),
            onwarn(warning, warn) {
                // Suppress warnings about unused exports
                if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
                warn(warning);
            },
        },
    },
})
