<template>
  <n-config-provider :locale="zhCN"
                     :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <app-provider>
        <router-view />
      </app-provider>

    </n-loading-bar-provider>
  </n-config-provider>

</template>

<script lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
import { defineComponent, provide } from "vue";
import { format } from "date-fns"; //导入文件
import { AppProvider } from "@/components/Application";
export default defineComponent({
  components: { AppProvider },
  setup() {
    // window["$message"] = useMessage();
    const getMoment = (time: any, timeFormat: string) => {
      return format(time, timeFormat);
    };
    provide("getMoment", getMoment);
    return {
      zhCN,
      dateZhCN,
    };
  },
});
</script>
