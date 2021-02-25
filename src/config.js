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
