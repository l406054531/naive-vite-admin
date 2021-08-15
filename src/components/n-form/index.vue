/**
 * @author lx 
 * @createTime 21-08-10
 * @remark 表单组件
 */
<template>

  <n-form :model="model"
          ref="formRef"
          :rules="rules">
    <template v-for="(item,index) in formElement"
              :key="index">
      <n-form-item :path="item.model"
                   :label="item.label">
        <!-- input文本输入框 -->
        <n-input v-model:value="model[item.model]"
                 v-if="item.type=='input'"
                 :clearable="item.clearable?item.clearable:true"
                 :disabled="item.disabled"
                 :placeholder="'请输入'+item.label"
                 @blur="item.blur?item.blur($event):''"
                 @change="item.change?item.change($event):''"
                 @clear="item.clear?item.clear($event):''"
                 @focus="item.focus?item.focus($event):''"
                 @input="item.input?item.input($event):''"
                 @keydown.enter.prevent />
        <!-- 数字输入框 -->
        <n-input-number v-model:value="model[item.model]"
                        v-else-if="item.type=='inputNumber'"
                        :clearable="item.clearable?item.clearable:true"
                        :disabled="item.disabled"
                        :placeholder="'请输入'+item.label"
                        :min="item.min"
                        :max="item.max"
                        :show-button="item.showButton"
                        @blur="item.blur?item.blur($event):''"
                        @focus="item.focus?item.focus($event):''"
                        @update:value="item.update?item.update($event):''" />
        <!-- 密码文本输入框 -->
        <n-input v-model:value="model[item.model]"
                 v-else-if="item.type=='password'"
                 type="password"
                 show-password-toggle
                 :minlength="item.minlength?item.minlength:8"
                 :maxlength="item.maxlength?item.maxlength:12"
                 :clearable="item.clearable?item.clearable:true"
                 :disabled="item.disabled"
                 :placeholder="'请输入'+item.label"
                 @blur="item.blur?item.blur($event):''"
                 @change="item.change?item.change($event):''"
                 @clear="item.clear?item.clear($event):''"
                 @focus="item.focus?item.focus($event):''"
                 @input="item.input?item.input($event):''"
                 @keydown.enter.prevent />
        <!-- 级联选择 -->
        <n-cascader v-model:value="model[item.model]"
                    v-else-if="item.type=='cascader'"
                    :placeholder="'请选择'+item.label"
                    :clearable="item.clearable?item.clearable:true"
                    :disabled="item.disabled"
                    :multiple="item.multiple"
                    :options="item.options"
                    :leaf-only="item.leafOnly"
                    :separator="item.separator"
                    @blur="item.blur?item.blur($event):''"
                    @focus="item.focus?item.focus($event):''"
                    @update:value="item.update?item.update($event):''">
        </n-cascader>
        <!-- 复选框 -->
        <n-checkbox-group v-else-if="item.type=='checkbox'"
                          v-model:value="model[item.model]"
                          :disabled="item.disabled">
          <n-space item-style="display: flex;">
            <template v-for="(item,index) in item.checkboxList"
                      :key="index">
              <n-checkbox :value="item.value"
                          :label="item.label" />
            </template>
          </n-space>
        </n-checkbox-group>
        <!-- 单选框 -->
        <n-radio-group v-else-if="item.type=='radio'"
                       v-model:value="model[item.model]"
                       :disabled="item.disabled">
          <n-space>
            <n-radio v-for="item in item.radioList"
                     :key="item.value"
                     :value="item.value">
              {{ item.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
        <!-- 时间选择器 -->
        <n-time-picker v-else-if="item.type=='timePicker'"
                       v-model:value="model[item.model]"
                       :placeholder="'请选择'+item.label"
                       :disabled="item.disabled"
                       :clearable="item.clearable?item.clearable:true"
                       :format="item.format"
                       :hours="item.hours"
                       :minutes="item.minutes"
                       :seconds="item.seconds" />
        <!-- 日期时间选择器 type值 'date' | 'datetime' | 'daterange' |'datetimerange' -->
        <n-date-picker v-else-if="item.type=='datePicker'"
                       v-model:value="model[item.model]"
                       :type="item.dateType"
                       :disabled="item.disabled"
                       :clearable="item.clearable?item.clearable:true"
                       :format="item.format"
                       :is-date-disabled="item.dateDisabled"
                       :is-time-disabled="item.timeDisabled"
                       @blur="item.blur?item.blur($event):''"
                       @focus="item.focus?item.focus($event):''" />
      </n-form-item>

    </template>
  </n-form>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref,toRefs } from "vue";
interface formValidate {
  field: string;
  message: string;
}
export default defineComponent({
  props: {
    rules: Object,
    model: Object,
    formElement: Array,
  },
  setup(props, { emit }) {
    const Reactive = {
      //form表单model
      model: props.model,
      //form表单验证
      rules: props.rules,
      //form表单原素
      formElement: props.formElement,
    };
    const Ref = {
      formRef: ref(null) as any,
    };

    const Methods = {
      formVerification() {
        return new Promise((resolve: any) => {
          Ref.formRef.value.validate((error: Array<formValidate>) => {
            if (!error) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      },
    };

    onMounted(() => {});

    return {
      ...toRefs(Reactive),
      ...toRefs(Ref),
      ...toRefs(Methods),
    };
  },
});
</script>
<style lang='scss' scoped>
.n-date-picker,
.n-input,
.n-input-number,
.n-time-picker,
.n-cascader {
  width: 90%;
}
</style>