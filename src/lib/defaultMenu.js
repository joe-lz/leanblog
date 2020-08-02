import { v4 as uuidv4 } from "uuid";

export default [
  {
    title: "首页",
    key: uuidv4(),
  },
  {
    title: "轻应用",
    key: uuidv4(),

    children: [
      {
        title: "快应用",
        key: uuidv4(),
      },
      {
        title: "小程序",
        key: uuidv4(),
      },
    ],
  },
  {
    title: "设计",
    key: uuidv4(),

    children: [
      {
        title: "快应用",
        key: uuidv4(),
      },
      {
        title: "小程序",
        key: uuidv4(),
      },
    ],
  },
  {
    title: "产品",
    key: uuidv4(),

    children: [
      {
        title: "快应用",
        key: uuidv4(),
      },
      {
        title: "小程序",
        key: uuidv4(),
      },
    ],
  },
];
