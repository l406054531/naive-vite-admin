<template>
  <div class="view-account">
    <div class="login-form">
      <n-form :model="formModel"
              ref="formRef"
              label-placement="left"
              :rules="rules">
        <n-form-item path="username">
          <n-input v-model:value="formModel.username"
                   placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password">
          <n-input v-model:value="formModel.password"
                   placeholder="请输入密码"
                   type="password" />
        </n-form-item>
        <n-form-item path="isCaptcha">
          <mi-captcha width="384"
                      theme-color="#2d8cf0"
                      @success="onAuthCode" />
          <!-- :logo="logo" @success="onAuthCode" -->
        </n-form-item>
        <n-form-item>
          <n-button type="primary"
                    @click="handleSubmit"
                    size="large"
                    :loading="loading"
                    block>
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>

</template>
<script lang='ts'>
import { defineComponent, onMounted, ref, toRefs, reactive } from "vue";
import { login } from "@/api/user";
export default defineComponent({
  setup(props, { emit }) {
    const state = reactive({
      loading: false,
      formModel: reactive({
        username: "",
        password: "",
        isCaptcha: false,
      }),
      rules: reactive({
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
        isCaptcha: {
          required: true,
          type: "boolean",
          trigger: "change",
          message: "请点击按钮进行验证码校验",
          validator: (_: any, value: any) => value === true,
        },
      }),
    });

    const formRef = ref();
    /**
     * 点击登录事件
     */
    const handleSubmit = (e: any) => {
      e.preventDefault();
      formRef.value.validate(async (errors: any) => {
        if (!errors) {
          // state.loading = true;
          login({
            username: state.formModel.username,
            password: state.formModel.password,
          }).then((response) => {
            console.log(response);
          });
        } else {
        }
      });
    };
    /**
     * 验证通过时触发
     */
    const onAuthCode = () => {
      state.formModel.isCaptcha = true;
    };
    return {
      ...toRefs(state),
      formRef,
      handleSubmit,
      onAuthCode,
    };
  },
});
</script>
<style lang="scss" scoped>
.view-account {
  .login-form {
    flex: 1;
    padding: 32px 0;
    width: 384px;
    margin: 0 auto;
  }
}
</style>