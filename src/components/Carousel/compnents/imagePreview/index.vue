<!--
 * @Author: Shuo Wang
 * @Date: 2021-12-24 14:15:50
 * @LastEditTime: 2021-12-29 12:15:24
 * @LastEditors: Shuo Wang
 * @Description: 图片预览组件
 * @FilePath: /vite-vue3-ts-/src/components/Carousel/compnents/imagePreview/index.vue
 * 专业写bug，副业改bug
-->
<template>
  <div class="preview">
    <!-- 关闭按钮 -->
    <div class="preview-close" @click.stop="imagePreviewClose">
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-365b8594=""
      >
        <path
          fill="currentColor"
          d="M466.752 512l-90.496-90.496a32 32 0 0145.248-45.248L512 466.752l90.496-90.496a32 32 0 1145.248 45.248L557.248 512l90.496 90.496a32 32 0 11-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 01-45.248-45.248L466.752 512z"
        ></path>
        <path
          fill="currentColor"
          d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
        ></path>
      </svg>
    </div>

    <!-- 预览图片 -->
    <img
      :src="previewList[currentImageIndex].imgSrc"
      class="preview-img"
      alt=""
    />

    <!-- 按钮 -->
    <div class="preview__button prev">
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
    <div class="preview__button next">
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

    <!-- 控制栏 -->
    <div class="preview__toolbar">
      <div class="preview__toolbar--buttons">
        <svg
          @click="handlerControlClick('zoomIn')"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M795.904 750.72l124.992 124.928a32 32 0 01-45.248 45.248L750.656 795.904a416 416 0 1145.248-45.248zM480 832a352 352 0 100-704 352 352 0 000 704zM352 448h256a32 32 0 010 64H352a32 32 0 010-64z"
          ></path>
        </svg>
        <svg
          @click="handlerControlClick('zoomOut')"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M795.904 750.72l124.992 124.928a32 32 0 01-45.248 45.248L750.656 795.904a416 416 0 1145.248-45.248zM480 832a352 352 0 100-704 352 352 0 000 704zm-32-384v-96a32 32 0 0164 0v96h96a32 32 0 010 64h-96v96a32 32 0 01-64 0v-96h-96a32 32 0 010-64h96z"
          ></path>
        </svg>
        <svg
          @click="handlerControlClick('fullScreen')"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-365b8594=""
        >
          <path
            fill="currentColor"
            d="M160 96.064l192 .192a32 32 0 010 64l-192-.192V352a32 32 0 01-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1164 0v191.936l192-.192a32 32 0 110 64l-192 .192zM864 96.064V96h64v256a32 32 0 11-64 0V160.064l-192 .192a32 32 0 110-64l192-.192zm0 831.872l-192-.192a32 32 0 010-64l192 .192V672a32 32 0 1164 0v256h-64v-.064z"
          ></path>
        </svg>
        <svg
          @click="handlerControlClick('leftHand')"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-365b8594=""
        >
          <path
            fill="currentColor"
            d="M289.088 296.704h92.992a32 32 0 010 64H232.96a32 32 0 01-32-32V179.712a32 32 0 0164 0v50.56a384 384 0 01643.84 282.88 384 384 0 01-383.936 384 384 384 0 01-384-384h64a320 320 0 10640 0 320 320 0 00-555.712-216.448z"
          ></path>
        </svg>
        <svg
          @click="handlerControlClick('rightHand')"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-365b8594=""
        >
          <path
            fill="currentColor"
            d="M784.512 230.272v-50.56a32 32 0 1164 0v149.056a32 32 0 01-32 32H667.52a32 32 0 110-64h92.992A320 320 0 10524.8 833.152a320 320 0 00320-320h64a384 384 0 01-384 384 384 384 0 01-384-384 384 384 0 01643.712-282.88z"
          ></path>
        </svg>
      </div>
      <div class="preview__toolbar--list">
        <div
          :class="[
            'preview__toolbar--list__item',
            currentImageIndex === toolbarItem.$carousel.id ? 'current' : null,
          ]"
          v-for="toolbarItem in previewList.slice(startIndex, endIndex)"
          :key:number="toolbarItem.$carousel.id"
          @click="HandlerToolbarItemClick(toolbarItem)"
        >
          <img :src="toolbarItem.imgSrc" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from 'vue';

interface previewListDataInterFace {
  imgSrc?: string;
  $carousel?: {
    id?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export default defineComponent({
  name: 'ImagePreview',
  props: {
    previewList: {
      type: Array as unknown as PropType<previewListDataInterFace>,
      required: true,
    },
    previewIndex: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  emits: ['imagePreviewClose'],
  setup(props, { emit }) {
    const currentImageIndex = ref(props.previewIndex);
    const imagePreviewClose = () => {
      emit('imagePreviewClose', 22);
    };

    const handlerPrev = () => {
      if (currentImageIndex.value-- < 1) currentImageIndex.value = 0;
    };

    const handlerNext = () => {
      if (currentImageIndex.value++ > props.previewList.length - 2)
        currentImageIndex.value = props.previewList.length - 1;
    };

    interface toolbarItem {
      imgSrc: string;
      $carousel: {
        id: number;
        [key: string]: any;
      };
      [key: string]: any;
    }

    const HandlerToolbarItemClick = (item: toolbarItem) => {
      currentImageIndex.value = item.$carousel.id;
    };

    const startIndex = computed(() => {
      if (props.previewList.length <= 5) {
        return 0;
      } else {
        if (currentImageIndex.value <= 2) {
          return 0;
        } else if (props.previewList.length - currentImageIndex.value <= 2) {
          return props.previewList.length - 5;
        } else {
          return currentImageIndex.value - 2;
        }
      }
    });

    const endIndex = computed(() => {
      if (props.previewList.length <= 5) {
        return props.previewList.length;
      } else {
        if (currentImageIndex.value <= 2) {
          return 5;
        } else if (props.previewList.length - currentImageIndex.value <= 2) {
          return props.previewList.length;
        } else {
          return currentImageIndex.value + 3;
        }
      }
    });

    const controlClickFn = {
      zoomIn: '',
      zoomOut: '',
      fullScreen: '',
      leftHand: '',
      rightHand: '',
    };

    const handlerControlClick = (type: string) => {
      if (type === 'zoomIn') {
        controlClickFn.zoomIn;
      } else if (type === 'zoomOut') {
        controlClickFn.zoomOut;
      } else if (type === 'fullScreen') {
        controlClickFn.fullScreen;
      } else if (type === 'leftHand') {
        controlClickFn.leftHand;
      } else if (type === 'rightHand') {
        controlClickFn.rightHand;
      }
    };

    onMounted(() => {
      document.body.style.overflow = 'hidden';
    });

    onBeforeUnmount(() => {
      document.body.style.overflow = 'auto';
    });

    return {
      currentImageIndex,
      startIndex,
      endIndex,
      imagePreviewClose,
      handlerPrev,
      handlerNext,
      HandlerToolbarItemClick,
      handlerControlClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000, $alpha: 0.65);
  &-close {
    cursor: pointer;
    position: absolute;
    right: px(50);
    top: px(50);
    width: px(50);
    height: px(50);
    border-radius: 50%;
    // background-color: rgba($color: #fff, $alpha: 0.75);
    svg {
      width: 100%;
      height: 100%;

      color: rgba($color: #fff, $alpha: 0.75);
    }
  }

  &-img {
    position: absolute;
    top: 40%;
    left: 50%;
    max-width: px(800);
    max-height: px(500);
    transform: translate(-50%, -50%);
  }

  &__button {
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

  &__toolbar {
    position: absolute;
    bottom: px(50);
    @include flex-layout(column, nowrap, center, center);
    margin-top: px(20);
    width: 100%;
    height: 15%;
  }
}

.preview__toolbar--buttons {
  @include flex-layout(row, nowrap, space-between, center);
  width: 30%;
  height: px(45);
  margin-bottom: px(20);
  background-color: rgba($color: #fff, $alpha: 0.75);
  svg {
    cursor: pointer;
    height: 100%;
  }
}

.preview__toolbar--list {
  @include flex-layout(row, nowrap, space-between, center);
  width: 40%;
  height: 80%;
  overflow: hidden;
  background-color: rgba($color: #fff, $alpha: 0.75);
  &__item {
    @include flex-layout(row, nowrap, center, center);
    width: 20%;
    height: 100%;

    img {
      max-width: 100%;
      max-height: 100%;
      border: px(1) solid #fff;
    }
    &:hover {
      img {
        border-color: skyblue;
      }
    }
    &.current {
      img {
        border-color: red;
      }
    }
  }
}
</style>
