# vue-condition-filter

> condition filter base vue

![](img/demo.png)

## Build Setup

支持：

1. 全局定义配置
2. 局部覆盖配置
3. 显示已选中的选项
4. 筛选项无限递归
5. 提供结果获取方法
6. 支持默认选中

实现原理：

1. 对象的引用传递
2. 数据的递归处理和模板递归调用

配置示例
```js
const Configs = [
  {
    value: "city",
    label: "城市",
    type: "single", // 设为单选
    options: [
      {
        value: "北京",
        label: "北京",
        type: "single", // 设为单选
        alias: "region",
        options: [
          {
            value: "东城区",
            label: "东城区",
            alias: "street",
            options: [
              {
                value: "1号胡同",
                label: "1号胡同",
              },
              {
                value: "2号胡同",
                label: "2号胡同",
              },
            ],
          },
          {
            value: "西城区",
            label: "西城区",
          },
        ],
      },
      {
        value: "上海",
        label: "上海",
        alias: "region",
        options: [
          {
            value: "黄浦区",
            label: "黄浦区",
          },
          {
            value: "徐汇区",
            label: "徐汇区",
          },
          {
            value: "静安区",
            label: "静安区",
          },
        ],
      },
      {
        value: "深圳",
        label: "深圳",
        alias: "region",
      },
      {
        value: "广州",
        label: "广州",
        alias: "region",
      },
    ],
  },
  {
    value: "year",
    label: "年代",
    options: [
      {
        value: "2019",
        label: "2019",
        hide: true, // 隐藏选项
      },
      {
        value: "2020",
        label: "2020",
      },
      {
        value: "2021",
        label: "2021",
      },
      {
        value: "2022",
        label: "2022",
      },
    ],
  },
  {
    value: "type",
    label: "类型",
    hide: true, // 隐藏选项
    options: [
      {
        value: "type-1",
        label: "type-2",
      },
    ],
  },
];

export default Configs;

```

使用示例

```html
<template>
  <div>
    <ConditionGroup
      :configs="configs"
      @change="handleChange"
    />

  </div>
</template>

<script>
import Configs from './config.js';
import { ConditionGroup, ConditionUtil } from './condition/index.js';

export default {
  name: '',

  props: [],

  components: { ConditionGroup },

  data() {
    return {
      configs: [],

      settings: [
        {
          value: 'city',
          label: '大城市',
          alias: 'city-1', // 直接子类别名
          options: [
            {
              value: '深圳',
              hide: true,
            },
            {
              value: '上海',
              active: true,
            },
          ],
        },
      ],
    };
  },

  computed: {},

  methods: {
    async getData() {},

    getConditions() {
      return ConditionUtil.getConditions(this.configs);
    },

    handleChange(item, configs) {
      // console.log(item, configs);
      console.log(this.getConditions());
    },
  },

  created() {
    this.configs = ConditionUtil.getConfigs(Configs, this.settings);
    console.log(this.getConditions());
  },
};
</script>

<style scoped>
</style>
```