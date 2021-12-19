interface listDataInterFace {
  title?: string;
  time?: string;
  content?: string;
  id?: number;
  [key: string]: any;
}

const dataList: Array<listDataInterFace> = [
  { title: 'titleTest1', id: 0, time: '2021-11-30', content: 'contentTest1' },
  { title: 'titleTest2', id: 1, time: '2021-11-30', content: 'contentTest2' },
  { title: 'titleTest3', id: 2, time: '2021-11-30', content: 'contentTest3' },
  { title: 'titleTest4', id: 3, time: '2021-11-30', content: 'contentTest4' },
];
export { listDataInterFace, dataList };
