<template>
  <!--begin::Toolbar-->
  <div class="toolbar py-2" id="kt_toolbar">
    <!--begin::Container-->
    <div
      id="kt_toolbar_container"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
      class="d-flex flex-stack"
    >
      <PageTitle />

          <div class="d-flex align-items-center px-10">
            <router-link to="/book_appointement">
            <div class="flex-shrink-0 nav-link btn btn-sm btn-color-muted btn-active-color-primary btn-active-light active fw-semobold fs-7 px-4 me-1">
              Nouveau Rendez-Vous
            </div>
            </router-link>
        </div>
      <!--end::Actions-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import PageTitle from "@/layouts/main-layout/page-title/PageTitle.vue";
import { toolbarWidthFluid } from "@/core/helpers/config";

export default defineComponent({
  name: "KToolbar",
  components: {
    PageTitle,
  },
  setup() {
    return {
      toolbarWidthFluid,
      getAssetPath,
    };
  },
});
</script>
