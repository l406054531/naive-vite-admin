//npm i -D naive-ui  npm i -D vfonts

import { create, NButton, NForm, NFormItem, NInput, NCascader, NCheckbox, NCheckboxGroup, NSpace, NTimePicker, NDatePicker, NConfigProvider, NInputNumber, NRadio, NRadioGroup, NLoadingBarProvider, NMessageProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'
import { App } from 'vue'
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
/**
 * @author lx
 * @remars 官方不推荐全局引入所有的组件  打包有冗余代码
 */
const naive = create({
  components: [NButton, NForm, NFormItem, NInput, NCascader, NCheckbox, NCheckboxGroup, NSpace, NTimePicker, NDatePicker, NConfigProvider, NInputNumber, NRadio, NRadioGroup, NLoadingBarProvider, NMessageProvider, NDialogProvider, NNotificationProvider]
})

export default function naiveUI(app: App<Element>) {
  app.use(naive)
}
