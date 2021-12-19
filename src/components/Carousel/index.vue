<template>
  <div class="my-carousel">
    <div class="my-carousel-container">
      <div
        :class="[
          'my-carousel-container-content',
          `my-carousel-container-content__${direction}`,
        ]"
      >
        <div
          :class="['my-carousel-container-content__item', direction]"
          :style="currentItem"
          v-for="(item, index) in allListData"
          :key:number="index - visibleDataLength"
          @click="handlerItemClicked()"
        >
          <img :src="item.imgSrc" alt="" />
        </div>
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

    <div class="my-carousel__toolbar" v-if="toolbar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
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
    listData: {
      type: Array as PropType<listDataInterFace[]>,
      required: false,
      default: () => {
        return [
          { imgSrc: examplePng1 },
          { imgSrc: examplePng2 },
          { imgSrc: examplePng3 },
          { imgSrc: examplePng4 },
        ];
      },
    },
    direction: {
      type: String,
      required: false,
      default: () => {
        return 'horizontal';
      },
    },
    toolbar: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      },
    },
  },

  emits: ['handlerItemClicked', 'handlerPrev', 'handlerNext'],

  setup(props, { emit }) {
    // 当前项点击事件
    const handlerItemClicked = () => {
      emit('handlerItemClicked', 22);
    };

    // 可见区域长度
    const visibleDataLength = ref(props.listData.length);

    // 渲染总项目
    const allListData = reactive([
      ...props.listData,
      ...props.listData,
      ...props.listData,
    ]);

    // 当前显示项
    const currentIndex = ref(0);

    const handlerPrev = () => {
      currentIndex.value--;
      onCurrentIndexChange();
    };
    const handlerNext = () => {
      currentIndex.value++;
      onCurrentIndexChange();
    };

    const currentItem = ref('');

    const onCurrentIndexChange = () => {
      handlerScroll('transition');
      setTimeout(() => {
        if (currentIndex.value <= -1) {
          currentIndex.value = props.listData.length - 1;
          handlerScroll();
        }
        if (currentIndex.value >= props.listData.length) {
          currentIndex.value = 0;
          handlerScroll();
        }
      }, 500);
    };

    const handlerScroll = (type?: string) => {
      if (type === 'transition') {
        if (props.direction === 'vertical') {
          currentItem.value = `transition: all 0.5s ease;transform:translateY(${
            -100 * (currentIndex.value + visibleDataLength.value)
          }%)`;
        } else {
          currentItem.value = `transition: all 0.5s ease;transform:translateX(${
            -100 * (currentIndex.value + visibleDataLength.value)
          }%)`;
        }
      } else {
        if (props.direction === 'vertical') {
          currentItem.value = `transform:translateY(${
            -100 * (currentIndex.value + visibleDataLength.value)
          }%)`;
        } else {
          currentItem.value = `transform:translateX(${
            -100 * (currentIndex.value + visibleDataLength.value)
          }%)`;
        }
      }
    };
    onCurrentIndexChange();

    // const currentItem = computed(() => {
    //   if (props.direction === 'vertical') {
    //     return `transition: all 0.5s ease;transform:translateY(${
    //       -100 * (currentIndex.value + visibleDataLength.value)
    //     }%)`;
    //   } else {
    //     return `transition: all 0.5s ease;transform:translateX(${
    //       -100 * (currentIndex.value + visibleDataLength.value)
    //     }%)`;
    //   }
    // });

    return {
      handlerItemClicked,
      handlerPrev,
      handlerNext,
      currentIndex,
      currentItem,
      allListData,
      visibleDataLength,
    };
  },
});

function creative(arg0: listDataInterFace[]) {
  throw new Error('Function not implemented.');
}
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
  &__item {
    cursor: pointer;
    @include flex-layout(row, nowrap, center, center);
    flex-shrink: 0;

    width: 100%;
    height: 100%;
    background-color: #ccc;

    img {
      max-width: 100%;
      max-height: 100%;
    }
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
