<!--
 * @Author: Shuo Wang
 * @Date: 2021-12-20 09:52:17
 * @LastEditTime: 2022-06-13 18:41:37
 * @LastEditors: Shuo Wang
 * @Description:
 * @FilePath: /vite-vue3-ts-/src/components/Carousel/index.vue
 * 专业写bug，副业改bug
-->
<template>
  <div class="my-carousel" id="my-carousel" :style="`height: ${height}`">
    <div
      class="my-carousel-container"
      @mouseenter="handlerCarouselMouseenter"
      @mouseleave="handlerCarouselMouseleave"
    >
      <div
        id="carousel-content"
        :class="[
          'my-carousel-container-content',
          `my-carousel-container-content__${direction}`,
        ]"
      >
        <div
          :class="['my-carousel-container-content__page', direction]"
          :id="`visible-page-${pageNum - 1}`"
          :style="currentPageStyle"
          v-for="(page, pageNum) in allListData"
          :key:number="pageNum - 1"
          @mousedown.stop="handlerMouseDown"
        >
          <div
            class="my-carousel-container-content__page-item"
            :style="itemStyle"
            v-for="(item, index) in page.pageData"
            :key="index"
            @click.stop="handlerItemClicked(item)"
            draggable="false"
          >
            <img :src="item.imgSrc" alt="" draggable="false" />
          </div>
        </div>
      </div>

      <div class="my-carousel__circle">
        <div
          :class="[
            'my-carousel__circle--item',
            currentIndex === n - 1 ? 'current' : 'normal',
          ]"
          v-for="n in visibleDataLength"
          :key:number="n"
          @click="handlerCircleClick(n - 1)"
        ></div>
      </div>
      <div class="my-carousel__button prev">
        <svg
          @click.stop="handlerPrev"
          class="icon"
          width="200"
          height="200"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-365b8594=""
        >
          <path
            fill="currentColor"
            d="M609.408 149.376L277.76 489.6a32 32 0 000 44.672l331.648 340.352a29.12 29.12 0 0041.728 0 30.592 30.592 0 000-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 000-42.688 29.12 29.12 0 00-41.728 0z"
          ></path>
        </svg>
      </div>
      <div class="my-carousel__button next">
        <svg
          @click.stop="handlerNext"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-365b8594=""
        >
          <path
            fill="currentColor"
            d="M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 000 42.752 29.12 29.12 0 0041.728 0L714.24 534.336a32 32 0 000-44.672L382.592 149.376a29.12 29.12 0 00-41.728 0z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="my-carousel__toolbar" v-if="ifToolbar">
      <div class="my-carousel__toolbar--list">
        <div
          class="my-carousel__toolbar--list__item"
          v-for="toolbarItem in toolbarDataList"
          :key:number="toolbarItem.$carousel.id"
        >
          <img :src="toolbarItem.imgSrc" alt="" />
        </div>
      </div>
    </div>
  </div>

  <ImagePreview
    v-if="ifImagePreviewVisible"
    :previewList="toolbarDataList"
    :previewIndex="previewIndex"
    @imagePreviewClose="imagePreviewClose"
  />
</template>

<script lang="ts">
import { PropType } from 'vue';
import examplePng52 from '/@/assets/images/png/example52.png';
import examplePng53 from '/@/assets/images/png/example53.png';
import examplePng54 from '/@/assets/images/png/example54.png';
import examplePng55 from '/@/assets/images/png/example55.png';
import examplePng56 from '/@/assets/images/png/example56.png';
import examplePng57 from '/@/assets/images/png/example57.png';
import examplePng58 from '/@/assets/images/png/example58.png';
import examplePng59 from '/@/assets/images/png/example59.png';

interface listDataInterFace {
  imgSrc: string;
  [key: string]: any;
}

export default defineComponent({
  name: 'myCarousel',

  props: {
    // 数据数组
    listData: {
      type: Array as PropType<listDataInterFace[]>,
      required: false,
      default: () => {
        return [
          { imgSrc: examplePng52 },
          { imgSrc: examplePng53 },
          { imgSrc: examplePng54 },
          { imgSrc: examplePng55 },
          { imgSrc: examplePng56 },
          { imgSrc: examplePng57 },
          { imgSrc: examplePng58 },
          { imgSrc: examplePng59 },
          { imgSrc: examplePng52 },
          { imgSrc: examplePng53 },
          { imgSrc: examplePng54 },
          { imgSrc: examplePng55 },
          { imgSrc: examplePng56 },
          { imgSrc: examplePng57 },
          { imgSrc: examplePng58 },
          { imgSrc: examplePng59 },
        ];
      },
    },

    // 轮播方向
    direction: {
      type: String,
      required: false,
      default: () => 'horizontal',
    },

    height: {
      type: String,
      required: false,
      default: () => '100%',
    },

    switchingInterval: {
      type: Number,
      required: false,
      default: () => 3,
    },

    // 是否显示工具栏
    ifToolbar: {
      type: Boolean,
      required: false,
      default: () => false,
    },

    // 每页显示个数
    pageSize: {
      type: Number,
      required: false,
      default: () => 3,
    },

    // 列数
    colNum: {
      type: Number,
      require: false,
      default: () => 3,
    },
  },

  emits: ['handlerItemClicked', 'handlerPrev', 'handlerNext'],

  setup(props, { emit }) {
    // 数据处理
    // interface toolbarDataListInterface {
    //   imgSrc: string;
    //   $carousel: {
    //     id: number;
    //     [key: string]: any;
    //   };
    //   [key: string]: any;
    // }
    // toolbar 对应数据
    const toolbarDataList = reactive(
      props.listData.map((item, index) => {
        item.$carousel = {};
        item.$carousel.id = index;
        return item;
      })
    );

    // 根据每页数量处理数组
    const handlerDataFormat = () => {
      // 定义新数组
      let newArray = [];

      // 克隆数组并添加 $carousel 以存储轮播图对应属性
      let cloneArray = [...toolbarDataList];

      // 根据传入的分页方式对数组进行切割
      while (cloneArray.length) {
        newArray.push({
          $carousel: {
            currentId: 0,
          },
          pageData: [...cloneArray.splice(0, props.pageSize)],
        });
      }

      // 为得到的数组添加 $carousel 以存储轮播图对应属性
      newArray = newArray.map((item, index) => {
        item.$carousel.currentId = index;
        return item;
      });

      // 向数组首尾添加元素以无缝轮播
      if (newArray.length > 1) {
        newArray = [
          ...[newArray[newArray.length - 1]],
          ...newArray,
          ...[newArray[0]],
        ];
      }

      // 返回处理后的数组

      return newArray;
    };

    // 渲染总项目
    const allListData = reactive([...handlerDataFormat()]);

    // 可见区域长度
    const visibleDataLength = ref(allListData.length - 2);

    // 每页样式
    const itemStyle = ref('');
    itemStyle.value =
      props.pageSize === 1
        ? `width: ${(100 - props.colNum + 1) / props.colNum}%;height:${
            100 / Math.ceil(props.pageSize / props.colNum)
          }%;`
        : `width: ${(100 - props.colNum + 1) / props.colNum}%;height:${
            100 / Math.ceil(props.pageSize / props.colNum)
          }%;margin: .5% 0`;

    // 按钮点击禁用
    const currentIndex = ref(0);

    // 当前显示项
    const currentPageStyle = ref('');

    // 初始化显示
    if (props.direction === 'vertical') {
      currentPageStyle.value = 'transform:translateY(-100%)';
    } else {
      currentPageStyle.value = 'transform:translateX(-100%)';
    }

    const isClickDisabled = ref(true);

    //上一页
    const handlerPrev = () => {
      handlerScroll('prev');
    };

    // 下一页
    const handlerNext = () => {
      handlerScroll('next');
    };

    const handlerCircleClick = (index: number) => {
      currentIndex.value = index;
      currentPageStyle.value =
        props.direction === 'vertical'
          ? `transition: all 0.5s ease-in-out;transform:translateY(${
              -100 * (index + 1)
            }%)`
          : `transition: all 0.5s ease-in-out;transform:translateX(${
              -100 * (index + 1)
            }%)`;
    };

    //当前显示项改变事件
    const onCurrentIndexChange = (type?: string) => {
      let toIndex: number = currentIndex.value;

      if (type === 'next') {
        currentIndex.value++;
        toIndex = currentIndex.value;
        if (currentIndex.value > visibleDataLength.value - 1) {
          currentIndex.value = 0;
        }
      } else if (type === 'prev') {
        currentIndex.value--;
        toIndex = currentIndex.value;
        if (currentIndex.value < 0) {
          currentIndex.value = visibleDataLength.value - 1;
        }
      }

      return toIndex;
    };

    // 滑动事件
    const handlerScroll = (type?: string) => {
      if (isClickDisabled.value === false) {
        return false;
      }
      isClickDisabled.value = false;

      if (type) {
        currentPageStyle.value =
          props.direction === 'vertical'
            ? `transition: all 0.5s ease-in-out;transform:translateY(${
                -100 * (onCurrentIndexChange(type) + 1)
              }%)`
            : `transition: all 0.5s ease-in-out;transform:translateX(${
                -100 * (onCurrentIndexChange(type) + 1)
              }%)`;
      } else {
        currentPageStyle.value =
          props.direction === 'vertical'
            ? `transition: all 0.5s ease-in-out;transform:translateY(${
                -100 * (currentIndex.value + 1)
              }%)`
            : `transition: all 0.5s ease-in-out;transform:translateX(${
                -100 * (currentIndex.value + 1)
              }%)`;
      }
    };

    // 定时器调用参数
    const intervalFn = () => {
      handlerNext();
    };
    // 定时器间隔
    const interval = ref(props.switchingInterval * 1000);

    // 设定定时器并自动启用
    let timer: NodeJS.Timeout = setInterval(intervalFn, interval.value);

    // 鼠标滑入清除定时器
    const handlerCarouselMouseenter = () => {
      clearInterval(Number(timer));
    };

    // 鼠标滑出启动定时器
    const handlerCarouselMouseleave = () => {
      if (ifImagePreviewVisible.value) return;

      timer = setInterval(intervalFn, interval.value);
    };

    // 分页点击
    const handlerPageClick = () => {};

    // 预览变量
    const ifImagePreviewVisible = ref(false);

    const previewIndex = ref(0);

    // 当前项点击事件
    interface clickObjectInterface {
      imgSrc: string;
      $carousel?: {
        id: number;
        [key: string]: any;
      };
      [key: string]: any;
    }

    const handlerItemClicked = (item: clickObjectInterface) => {
      emit('handlerItemClicked', item);
      previewIndex.value = item.carousel?.id;
      console.log('previewIndex.value: ', previewIndex.value);
      ifImagePreviewVisible.value = true;
      clearInterval(Number(timer));
    };

    const imagePreviewClose = () => {
      ifImagePreviewVisible.value = false;
      timer = setInterval(intervalFn, interval.value);
    };

    // 轮播图拖拽

    // 鼠标按下
    const handlerMouseDown = (downEvent: MouseEvent) => {
      // 获取dom元素
      const targetNode: HTMLElement = <HTMLElement>(
        document.querySelector(`#visible-page-${currentIndex.value}`)
      );

      const scrollY = ref(0); // 纵向移动距离
      const scrollX = ref(0); //横向移动距离
      const nodeOffsetLeft = ref(downEvent.clientX); //鼠标按下时元素距离左边的距离
      const nodeOffsetTop = ref(downEvent.clientY); // 按下时元素距离顶部距离

      // 鼠标移动时
      document.onmousemove = (moveEvent: MouseEvent) => {
        // 纵向轮播
        if (props.direction === 'vertical') {
          // 最大纵向移动距离不得超过一页的高度
          if (
            moveEvent.clientY - nodeOffsetTop.value <
            -targetNode.offsetHeight
          ) {
            scrollY.value = -targetNode.offsetHeight;
          } else if (
            moveEvent.clientY - nodeOffsetTop.value >
            targetNode.offsetHeight
          ) {
            scrollY.value = targetNode.offsetHeight;
          } else {
            scrollY.value = moveEvent.clientY - nodeOffsetTop.value;
          }

          // 只修改纵向translate
          currentPageStyle.value = `transform:translateY(
            ${
              -targetNode.offsetHeight * (currentIndex.value + 1) +
              scrollY.value
            }px
          );`;
        } else {
          // 横向轮播

          // 最大横向移动距离不得超过一页的宽度
          if (
            moveEvent.clientX - nodeOffsetLeft.value <
            -targetNode.offsetWidth
          ) {
            scrollX.value = -targetNode.offsetWidth;
          } else if (
            moveEvent.clientX - nodeOffsetLeft.value >
            targetNode.offsetWidth
          ) {
            scrollX.value = targetNode.offsetWidth;
          } else {
            scrollX.value = moveEvent.clientX - nodeOffsetLeft.value;
          }

          // 只修改横向translate
          currentPageStyle.value = `transform:translateX(
            ${
              -targetNode.offsetWidth * (currentIndex.value + 1) + scrollX.value
            }px
          );`;
        }

        //
      };

      // 抬起时
      document.onmouseup = (upEvent: MouseEvent) => {
        // 纵向轮播
        if (props.direction === 'vertical') {
          if (upEvent.clientY - nodeOffsetTop.value !== 0) {
            if (
              (upEvent.clientY - nodeOffsetTop.value) /
                targetNode.offsetHeight <=
              -0.4
            ) {
              handlerNext();
            } else if (
              (upEvent.clientY - nodeOffsetTop.value) /
                targetNode.offsetHeight >=
              0.4
            ) {
              handlerPrev();
            } else {
              handlerScroll();
            }
          }
        } else {
          // 横向轮播

          if (upEvent.clientX - nodeOffsetLeft.value !== 0) {
            if (
              (upEvent.clientX - nodeOffsetLeft.value) /
                targetNode.offsetWidth <=
              -0.4
            ) {
              handlerNext();
            } else if (
              (upEvent.clientX - nodeOffsetLeft.value) /
                targetNode.offsetWidth >=
              0.4
            ) {
              handlerPrev();
            } else {
              handlerScroll();
            }
          }
        }
        setTimeout(() => {
          isClickDisabled.value = true;
        }, interval.value);
        // 清除事件
        document.onmousemove = null;
        document.onmousedown = null;
        document.onmouseup = null;
      };
    };

    const resetIsClickDisabled = () => {
      isClickDisabled.value = true;
    };

    onMounted(() => {
      // 获取dom元素
      const targetNode: HTMLElement = <HTMLElement>(
        document.querySelector('#visible-page-0')
      );

      // 监听dom transition完成，无缝滚动
      targetNode.addEventListener('transitionend', () => {
        if (targetNode.style.transform === 'translateX(0%)') {
          currentPageStyle.value = `transform:translateX(-${
            100 * visibleDataLength.value
          }%)`;
        } else if (targetNode.style.transform === 'translateY(0%)') {
          currentPageStyle.value = `transform:translateY(-${
            100 * visibleDataLength.value
          }%)`;
        } else if (
          targetNode.style.transform ===
          `translateX(-${100 * (visibleDataLength.value + 1)}%)`
        ) {
          // currentIndex.value = 0;
          currentPageStyle.value = 'transform:translateX(-100%)';
        } else if (
          targetNode.style.transform ===
          `translateY(-${100 * (visibleDataLength.value + 1)}%)`
        ) {
          // currentIndex.value = 0;
          currentPageStyle.value = 'transform:translateY(-100%)';
        }

        resetIsClickDisabled();
      });
    });

    return {
      itemStyle,
      isClickDisabled,
      currentIndex,
      currentPageStyle,
      toolbarDataList,
      allListData,
      visibleDataLength,
      ifImagePreviewVisible,
      previewIndex,
      handlerPrev,
      handlerNext,
      handlerCircleClick,
      handlerItemClicked,
      handlerPageClick,
      handlerCarouselMouseenter,
      handlerCarouselMouseleave,
      handlerMouseDown,
      imagePreviewClose,
    };
  },
});
</script>

<style lang="scss" scoped>
.my-carousel {
  width: 100%;
  &-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &:hover {
      .my-carousel__button {
        visibility: visible;
      }
    }
  }
  &__toolbar {
    @include flex-layout(row, nowrap, center, center);
    margin-top: px(20);
    width: 100%;
    height: px(100);
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}

.my-carousel-container-content {
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
  &__page {
    scroll-behavior: smooth;
    cursor: pointer;
    @include flex-layout(row, wrap, space-between, center);
    flex-shrink: 0;
    width: 100%;
    height: 100%;

    &.horizontal {
      width: 100%;
    }
    &.vertical {
      height: 100%;
    }
  }

  &__horizontal {
    @include flex-layout(row, nowrap, flex-start, center);
  }
  &__vertical {
    @include flex-layout(column, nowrap, flex-start, center);
  }
}

.my-carousel-container-content__page-item {
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
}

.my-carousel__circle {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  @include flex-layout(row, nowrap, center, center);
  &--item {
    cursor: pointer;
    width: px(10);
    height: px(10);
    border-radius: px(5);
    border: 1px solid rgba($color: #ccc, $alpha: 0.75);
    margin: px(4);
    background-color: rgba($color: #fff, $alpha: 0.75);
    &.current {
      width: px(25);
      transition: width 0.5s ease-in-out;
    }
    &.normal {
      width: px(10);
      transition: width 0.5s ease-in-out;
    }
  }
}

.my-carousel__button {
  visibility: hidden;
  cursor: pointer;
  position: absolute;
  top: 50%;
  @include flex-layout(row, nowrap, center, center);
  width: px(60);
  height: px(60);
  transform: translateY(-50%);
  background-color: rgba($color: #fff, $alpha: 0.75);

  &.prev {
    left: 0;
    border-radius: 0% 100% 100% 0%;
  }
  &.next {
    right: 0;
    border-radius: 100% 0% 0% 100%;
  }
}

.my-carousel__toolbar--list {
  @include flex-layout(row, nowrap, space-between, center);
  width: 70%;
  height: 100%;
  overflow: hidden;
  &__item {
    width: 30%;
    height: 100%;
    img {
      max-height: 100%;
    }
  }
}

svg {
  width: px(50);
  height: px(50);
}
</style>
