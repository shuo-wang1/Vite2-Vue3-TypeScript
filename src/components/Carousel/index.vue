<template>
  <div class="my-carousel">
    <div class="my-carousel-container">
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
        >
          <div
            class="my-carousel-container-content__page-item"
            :style="itemStyle"
            v-for="(item, index) in page.pageData"
            :key="index"
          >
            <img :src="item.imgSrc" alt="" />
          </div>
        </div>
      </div>

      <div class="my-carousel__circle">
        <div
          :class="[
            'my-carousel__circle--item',
            currentIndex === n - 1 ? 'current' : null,
          ]"
          v-for="n in visibleDataLength"
          :key:number="n"
        ></div>
      </div>
      <div class="my-carousel__button prev" @click="handlerPrev">
        <svg
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
      <div class="my-carousel__button next" @click="handlerNext">
        <svg
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

    <div class="my-carousel__toolbar" v-if="ifToolbar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import examplePng1 from '/@/assets/images/png/WechatIMG47.png';
import examplePng2 from '/@/assets/images/png/WechatIMG48.png';
import examplePng3 from '/@/assets/images/png/WechatIMG49.png';
import examplePng4 from '/@/assets/images/png/WechatIMG50.png';

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
          { imgSrc: examplePng1 },
          { imgSrc: examplePng2 },
          { imgSrc: examplePng3 },
          { imgSrc: examplePng4 },
          { imgSrc: examplePng1 },
          { imgSrc: examplePng2 },
          { imgSrc: examplePng3 },
          { imgSrc: examplePng4 },
          { imgSrc: examplePng1 },
          { imgSrc: examplePng2 },
          { imgSrc: examplePng3 },
          { imgSrc: examplePng4 },
        ];
      },
    },

    // 轮播方向
    direction: {
      type: String,
      required: false,
      default: () => {
        return 'horizontal';
      },
    },

    // 是否显示工具栏
    ifToolbar: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      },
    },

    // 每页显示个数
    pageSize: {
      type: Number,
      required: false,
      default: () => 2,
    },

    // 列数
    colNum: {
      type: Number,
      require: false,
      default: () => 2,
    },
  },

  emits: ['handlerItemClicked', 'handlerPrev', 'handlerNext'],

  setup(props, { emit }) {
    // 数据处理

    // 根据每页数量处理数组
    const handlerDataFormat = () => {
      // 定义新数组
      let newArray = [];

      // 克隆数组并添加 $carousel 以存储轮播图对应属性
      let cloneArray = props.listData.map((item, index) => {
        item.$carousel = {};
        item.$carousel.id = index;
        return item;
      });

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
    const itemStyle = ref(
      `width: ${100 / props.colNum}%;height:${
        100 / Math.ceil(props.pageSize / props.colNum)
      }%; padding:2.5%`
    );

    // 当前项点击事件
    const handlerItemClicked = () => {
      emit('handlerItemClicked', 22);
    };

    const currentIndex = ref(0);

    // 当前显示项
    const currentPageStyle = ref('');

    // 初始化显示
    if (props.direction === 'vertical') {
      currentPageStyle.value = 'transform:translateY(-100%)';
    } else {
      currentPageStyle.value = 'transform:translateX(-100%)';
    }

    //上一页
    const handlerPrev = () => {
      handlerScroll(currentIndex.value, 'prev');
    };

    // 下一页
    const handlerNext = () => {
      handlerScroll(currentIndex.value, 'next');
    };

    //当前显示项改变事件
    const onCurrentIndexChange = (type?: string, index?: number) => {
      let toIndex: number = index || currentIndex.value;
      if (!index) {
        if (type === 'next') {
          toIndex = currentIndex.value + 1;
        } else if (type === 'prev') {
          toIndex = currentIndex.value - 1;
        }
      } else {
        if (index <= -1) {
          toIndex = visibleDataLength.value - 1;
        } else if (index >= visibleDataLength.value) {
          toIndex = 0;
        }
      }

      return toIndex;
    };

    // 滑动事件
    const handlerScroll = (index: number, type?: string) => {
      if (index > -1 && index < visibleDataLength.value) {
        currentPageStyle.value =
          props.direction === 'vertical'
            ? `transition: all 0.5s ease;transform:translateY(${
                -100 * (onCurrentIndexChange(type) + 1)
              }%)`
            : `transition: all 0.5s ease;transform:translateX(${
                -100 * (onCurrentIndexChange(type) + 1)
              }%)`;

        currentIndex.value = onCurrentIndexChange(type);
      } else {
        currentPageStyle.value =
          props.direction === 'vertical'
            ? `transform:translateY(${
                -100 * (onCurrentIndexChange(type, index) + 1)
              }%)`
            : `transform:translateX(${
                -100 * (onCurrentIndexChange(type, index) + 1)
              }%)`;

        currentIndex.value = onCurrentIndexChange(type, index);
      }
    };

    onMounted(() => {
      const targetNode: HTMLElement = <HTMLElement>(
        document.querySelector('#visible-page-0')
      );
      targetNode.addEventListener('transitionend', () => {
        if (targetNode.style.transform === 'translateX(0%)') {
          currentPageStyle.value = `transform:translateX(-${
            100 * visibleDataLength.value
          }%)`;
          currentIndex.value = visibleDataLength.value - 1;
        } else if (targetNode.style.transform === 'translateY(0%)') {
          currentPageStyle.value = `transform:translateY(-${
            100 * visibleDataLength.value
          }%)`;
          currentIndex.value = visibleDataLength.value - 1;
        } else if (
          targetNode.style.transform ===
          `translateX(-${100 * (visibleDataLength.value + 1)}%)`
        ) {
          currentPageStyle.value = 'transform:translateX(-100%)';
          currentIndex.value = 0;
        } else if (
          targetNode.style.transform ===
          `translateY(-${100 * (visibleDataLength.value + 1)}%)`
        ) {
          currentPageStyle.value = 'transform:translateY(-100%)';
          currentIndex.value = 0;
        }
      });
    });

    return {
      itemStyle,
      handlerItemClicked,
      handlerPrev,
      handlerNext,
      currentIndex,
      currentPageStyle,
      allListData,
      visibleDataLength,
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
    height: px(500);
    overflow: hidden;
    background-color: #fff;
  }
}

.my-carousel-container-content {
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
  &__page {
    cursor: pointer;
    @include flex-layout(row, wrap, flex-start, center);
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    background-color: #ccc;

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

  img {
    max-width: 100%;
    max-height: 100%;
    border: px(1) solid #000000;
    display: block;
    margin: auto;
  }
}

.my-carousel__button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  @include flex-layout(row, nowrap, center, center);

  width: px(60);
  height: px(60);
  transform: translateY(-50%);
  &.prev {
    left: 0;
  }
  &.next {
    right: 0;
  }
  &:hover {
    background-color: rgba($color: #333, $alpha: 0.75);
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
    width: px(16);
    height: px(16);
    border-radius: px(8);
    margin: px(4);
    background-color: rgba($color: #333, $alpha: 0.75);
    &.current {
      width: px(32);
      transition: width 0.5s ease;
      // transform: ;
    }
  }
}

.my-carousel__toolbar {
  margin-top: px(20);
  width: 100%;
  height: px(80);
  background-color: rgba($color: #000000, $alpha: 0.5);
}

svg {
  width: px(50);
  height: px(50);
}
</style>
