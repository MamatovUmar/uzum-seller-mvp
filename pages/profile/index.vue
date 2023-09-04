<script setup lang="ts">
import { reactive, useCustomFetch, useRouter, ref } from '#imports'
import { useRootStore } from '~/store/root'
import { Response, UserForm, UserInterface, UzumAccount } from '~/types'
import { FormInst, FormRules, FormValidationError, useMessage } from 'naive-ui'

definePageMeta({
  colorMode: 'dark'
})

const root = useRootStore()
const router = useRouter()
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const form = reactive<UzumAccount>({
  username: 'farkhod@ithinktech.uz',
  password: 'Fk@10074$'
})
const login = ref('')
const loading = ref<boolean>(false)

const rules: FormRules = {
  username: { required: true, message: ' '},
  password: { required: true, message: ' '}
}

function save (e: MouseEvent) {
  formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      loading.value = true
      await root.updateAccount(form)
      loading.value = false
    }
  })
}


</script>

<template>
  <div v-if="root.user" class="profile">
    <n-page-header
      title="Профиль"
      @back="router.go(-1)"
    />

    <div class="profile__content">
      <n-form>
        <n-form-item label="Логин">
          <n-input :value="root.user.login" readonly></n-input>
        </n-form-item>
<!--        <n-button type="success" tertiary block>-->
<!--          Сохранить-->
<!--        </n-button>-->
      </n-form>

      <n-divider>
        Uzum аккаунт
      </n-divider>

      <n-form :model="form" ref="formRef" :rules="rules">
        <n-grid :x-gap="20" :cols="2">
          <n-grid-item>
            <n-grid-item :span="24">
              <n-form-item label="Username" path="username">
                <n-input v-model:value="form.username" placeholder=""></n-input>
              </n-form-item>
            </n-grid-item>
          </n-grid-item>

          <n-grid-item>
            <n-grid-item :span="24">
              <n-form-item label="Password" path="password">
                <n-input v-model:value="form.password" type="password" placeholder=""></n-input>
              </n-form-item>
            </n-grid-item>
          </n-grid-item>
        </n-grid>

        <n-button type="success" tertiary block :loading="loading" @click="save">
          Сохранить
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile {
  &__content {
    max-width: 600px;
    margin-top: 50px;
  }
}
</style>
