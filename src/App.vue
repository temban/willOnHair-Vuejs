<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useConfigStore } from "@/stores/config";
import { useThemeStore } from "@/stores/theme";
import { useBodyStore } from "@/stores/body";
import { themeConfigValue } from "@/core/helpers/config";
import { initializeComponents } from "@/core/plugins/keenthemes";
import axios from "axios";

export default defineComponent({
  name: "app",
  components: {
    RouterView,
  },
  mounted(){
    axios.request({
          method: "get",
          maxBodyLength: Infinity,
          url: "https://willonhair.shintheo.com/api/business.resource/search",
          headers: {
            "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
          },
        })
        .then((response) => {
          
         for(let i = 0;
            i <= response.data.data.length - 1;
            i++){
          let config5 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/v1/image/business.resource/'+response.data.data[i].id+'/image_1920?unique=true&filename_field=name&file_response=true',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==', 
    "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
  }
};

axios.request(config5)
.then((response) => {
})
.catch((error) => {
  console.log(error);
});


axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: "https://willonhair.shintheo.com/api/appointment.product/search",
            headers: {
              "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
            },
          })
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              let config6 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/v1/image/product.template/'+response.data.data[i].id+'/image_1920?unique=true&filename_field=name&file_response=true',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==', 
    "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
  }
};

axios.request(config6)
.then((response) => {
})
.catch((error) => {
  console.log(error);
});

            }
          })
          .catch((error) => {
            console.log(error);
          });
         }
        })
        .catch((error) => {
          console.log(error);
        });




        axios.request({
        method: "get",
        maxBodyLength: Infinity,
        url: "https://willonhair.shintheo.com/api/business.resource.type/search",
        headers: {
          "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
          
        },
      })
      .then((response) => {

        for(let i = 0; i < response.data.data.length; i++){
          let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/v1/image/business.resource.type/'+response.data.data[i].id+'/image_1920?unique=true&filename_field=name&file_response=true',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==', 
    "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
  }
};

axios.request(config)
.then((response) => {
})
.catch((error) => {
  console.log(error);
});
        }
      })
      .catch((error) => {
        console.log(error);
        });
  },
  setup() {
    const configStore = useConfigStore();
    const themeStore = useThemeStore();
    const bodyStore = useBodyStore();

    onBeforeMount(() => {
      /**
       * Overrides the layout config using saved data from localStorage
       * remove this to use static config (@/core/config/DefaultLayoutConfig.ts)
       */
      configStore.overrideLayoutConfig();

      /**
       *  Sets a mode from configuration
       */
      themeStore.setThemeMode(themeConfigValue.value);
    });

    onMounted(() => {
      nextTick(() => {
        initializeComponents();

        bodyStore.removeBodyClassName("page-loading");
      });
    });
  },
});
</script>

<style lang="scss">
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "apexcharts/dist/apexcharts.css";
@import "quill/dist/quill.snow.css";
@import "animate.css";
@import "sweetalert2/dist/sweetalert2.css";
@import "nouislider/distribute/nouislider.css";
@import "@fortawesome/fontawesome-free/css/all.min.css";
@import "socicon/css/socicon.css";
@import "line-awesome/dist/line-awesome/css/line-awesome.css";
@import "dropzone/dist/dropzone.css";
@import "@vueform/multiselect/themes/default.css";
@import "prism-themes/themes/prism-shades-of-purple.css";
@import "element-plus/dist/index.css";

// Main demo style scss
@import "assets/fonticon/fonticon.css";
@import "assets/keenicons/duotone/style.css";
@import "assets/keenicons/outline/style.css";
@import "assets/keenicons/solid/style.css";
@import "assets/sass/element-ui.dark";
@import "assets/sass/plugins";
@import "assets/sass/style";

#app {
  display: contents;
}
</style>
