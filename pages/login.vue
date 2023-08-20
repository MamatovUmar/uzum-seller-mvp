<script setup lang="ts">
import { FormRules, FormInst, FormValidationError, useMessage } from 'naive-ui'
import { reactive, useAuth, useRouter } from '#imports'
import { AuthForm } from '~/types/auth'
import { useRootStore } from '~/store/root'

definePageMeta({
  layout: 'empty',
  colorMode: 'dark'
})

const auth = useAuth()
const router = useRouter()
const root = useRootStore()

const loading = ref<boolean>(false)
const formRef = ref<FormInst | null>(null)
const form = reactive<AuthForm>({
  login: 'umar',
  password: '123123',
  remember: false
})

const rules: FormRules = {
  login: { required: true, message: ' '},
  password: { required: true, message: ' '}
}

function handleValidateButtonClick (e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      loading.value = true
      await auth.login(form)
      await root.fetchUser()
      await root.fetchUser()
      loading.value = false
      await router.push('/')
    }
  })
}


</script>

<template>
  <div class="login">
    <n-card title="ВХОД" size="large">
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item path="login" label="Логин">
          <n-input v-model:value="form.login" placeholder="example@site.com" />
        </n-form-item>
        <n-form-item path="password" label="Пароль">
          <n-input
            v-model:value="form.password"
            type="password"
            placeholder="Введите пароль"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space justify="end">
          <n-button type="primary" tertiary @click="handleValidateButtonClick" :loading="loading">
            Войти
          </n-button>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  width: 100vw;
  height: 100dvh;
  align-items: center;
  justify-content: center;

  .n-card {
    max-width: 400px;
  }
}
</style>