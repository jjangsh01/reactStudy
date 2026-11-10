import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // 미사용 변수는 에러 대신 경고로 표시 (작성 중인 코드에서 빨간 줄 방지)
      // JSX로만 사용되는 컴포넌트(대문자 시작)는 미사용 변수로 오탐하지 않도록 예외 처리
      // (eslint-plugin-react 미설치 상태에서는 JSX 사용이 변수 사용으로 인식되지 않음)
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // useEffect 안에서 setState 호출 시 뜨는 에러를 경고로 완화
      'react-hooks/set-state-in-effect': 'warn',
      // 컴포넌트 파일에서 상수/함수를 함께 export 해도 에러 대신 경고만 표시
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])
