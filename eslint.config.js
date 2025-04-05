import eslint   from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
   eslint.configs.recommended,
   ...tseslint.configs.strict,
   { ignores: ['**/*.js'] },
   {
      plugings: plugin,
      rules: {
         '@typescript-eslint/no-non-null-assertion': 'off',
         '@typescript-eslint/no-invalid-void-type': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
      },
   },
];