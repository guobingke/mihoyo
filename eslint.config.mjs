// https://eslint.nuxt.com
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // 组件命名：保留原有单词命名（如 NavBar / News 等）
    'vue/multi-word-component-names': 'off',
    // 站点大量使用 v-html 渲染本地可信 JSON 文案
    'vue/no-v-html': 'off',
    // 布局使用 Vue 3 多根节点 / 具名 slot，属于合法写法
    'vue/no-multiple-template-root': 'off',
    // 以下为纯模板格式化偏好，原始模板逐字保留以保证渲染内容不变，仅降级为提示
    'vue/html-self-closing': 'off',
    'vue/attributes-order': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    // 以下为原模板既有写法，逐字保留以保证渲染内容不变，降级为提示
    'vue/require-v-for-key': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/valid-v-on': 'warn',
    // 脚本风格：保留原始实现写法，降级为提示而非报错
    'prefer-const': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
})