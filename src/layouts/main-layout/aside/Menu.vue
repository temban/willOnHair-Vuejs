<template>
  <!--begin::Menu-->
  <div
    class="hover-scroll-overlay-y my-2 my-lg-5 pe-lg-n1 "
    id="kt_aside_menu_wrapper"
    data-kt-scroll="true"
    data-kt-scroll-height="auto"
    data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
    data-kt-scroll-wrappers="#kt_aside, #kt_aside_menu"
    data-kt-scroll-offset="5px"
  >
    <div
      id="kt_aside_menu"
      class="menu menu-column menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-semibold"
      data-kt-menu="true"
    >
      <template v-for="(item, i) in MainMenuConfig" :key="i">
        <template v-if="!item.pages">
          <template v-if="item.heading">
            <div
              v-if="item.route"
              :class="{ 'show here': currentActive(item.route) }"
              class="menu-item py-3"
            >
              <router-link
                v-if="item.route"
                class="menu-link menu-center"
                :to="item.route"
              >
                <span
                  v-if="item.keenthemesIcon || item.bootstrapIcon"
                  class="menu-icon me-0"
                >
                  <i
                    v-if="asideMenuIcons === 'bootstrap'"
                    :class="item.bootstrapIcon"
                    class="bi fs-2"
                  ></i>
                  <KTIcon
                    v-else-if="asideMenuIcons === 'keenthemes'"
                    :icon-name="item.keenthemesIcon"
                    icon-class="fs-2"
                  />
                </span>
                <span class="menu-title">{{ translate(item.heading) }}</span>
              </router-link>
            </div>
          </template>
        </template>
      </template>

   
    </div>
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { version } from "@/core/helpers/documentation";
import { asideMenuIcons } from "@/core/helpers/config";
import MainMenuConfig from "@/core/config/MainMenuConfig";

export default defineComponent({
  name: "kt-menu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match: string) => {
      return route.path.indexOf(match) !== -1;
    };

    const currentActive = (current: string) => {
      return route.path === current;
    };

    return {
      hasActiveChildren,
      currentActive,
      MainMenuConfig,
      asideMenuIcons,
      version,
      translate,
      getAssetPath,
    };
  },
});
</script>
