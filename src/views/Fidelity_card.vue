<template>
  
  <div class="row g-5 g-xl-8">
    <div class="col-xl-6">
        <div class="flex-column flex-lg-row-auto w-100 w-xl-500px mb-10">
      <!--begin::Card-->
      <div class="card mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body pt-15">
          <!--begin::Summary-->
          <div class="d-flex flex-center flex-column mb-5">
            <!--begin::Avatar-->
            <div v-if="image" class="symbol symbol-100px symbol-circle mb-7">
              <img :src="'https://willonhair.shintheo.com/api/v1/image/res.partner/'+ profile +'/image_1920?unique=true&filename_field=name&file_response=true'" alt="image" />
            </div>
            <div v-else class="symbol symbol-100px symbol-circle mb-7">
              <img src="@/assets/img/person.png" alt="image" />
            </div>
            
            <!--end::Avatar-->

            
            <!--begin::Name-->
            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ current_user_name }}
            </a>
            <!--end::Name-->

            <!--begin::Position-->
            <div class="fs-5 fw-semobold text-muted mb-6">{{ userEmail }}</div>
            <!--end::Position-->

            <!--begin::Info-->
            <div class="d-flex flex-wrap flex-center">
              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span v-if="client_points  != ''" class="w-75px">{{ client_points }}</span>
                  <span v-else class="w-50px">{{ 0 }}</span>

                  <KTIcon icon-name="arrow-up" icon-class="fs-3 text-success" />
                </div>
                <div class="fw-semobold text-muted">Point(s)</div>
              </div>
              <!--end::Stats-->
              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span v-if="client_bonus != ''" class="w-50px">{{client_bonus }}</span>
                  <span v-else class="w-50px">{{ 0 }}</span>

                  <KTIcon icon-name="arrow-up" icon-class="fs-3 text-success" />
                </div>
                <div class="fw-semobold text-muted">Bonus</div>
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Info-->
          </div>
          <!--end::Summary-->
          <div class="separator separator-dashed my-3"></div>

          <div
            class="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6"
          >
            <KTIcon
              icon-name="design-frame"
              icon-class="fs-2tx text-primary me-4"
            />
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack flex-grow-1">
              <!--begin::Content-->
              <div class="fw-semobold">
                <div class="fs-6 text-gray-700">
                    Cher client, vous avez besoin de <a href="#" class="me-1">{{ reqPoints }} </a> points
                    équivalent au nombre de coiffure qu'il vous faut 
                    pour obtenir un bonus équivalent à une coiffure offerte
                
                </div>
              </div>
              <!--end::Content-->
            </div>
            <!--end::Wrapper-->
          </div>
        </div>
        <!--end::Card body-->
      </div>
      
      <!--end::Connected Accounts-->
    </div>
    </div>


    <div class="col-xl-6 px-10 py-20" >
      
        <qrcode-vue :value="value" :size="size" level="H"  />
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { getAssetPath } from "@/core/helpers/assets";
  import { defineComponent, onMounted, ref } from "vue";
  import { config } from "@/core/helpers/config";
  import CodeHighlighter from "@/components/highlighters/CodeHighlighter.vue";
  import { themeName } from "@/core/helpers/documentation";
  import { LS_CONFIG_NAME_KEY } from "@/stores/config";
  import QrcodeVue from 'qrcode.vue';
  import axios from "axios";
  
  const LS_BUILDER_TAB_NAME =
    "layoutBuilderTabIndex_" + import.meta.env.VITE_APP_DEMO;
  

export default defineComponent({
    name: "Fidelity_card",
    data() {
      return {
        value: String(localStorage.getItem("current_user_id")),
        userId: localStorage.getItem("current_user_id"),
        userEmail: '',
        current_user_name: localStorage.getItem("current_user_name"),
        client_points: '',
        client_bonus: '',
        reqPoints:'',
        size: 300,
        profile:localStorage.getItem("current_user_partnerId"),
        image:""
      }
    },
    components: {
      QrcodeVue,
      CodeHighlighter
    },
    mounted(){

let config1 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/manager.points/search',
  headers: { 
    'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
  }
};

axios.request(config1)
.then((response) => {
    this.reqPoints = response.data.data[0].manager_required_bonus_points
  console.log(response.data.data[0].manager_required_bonus_points);
})
.catch((error) => {
  console.log(error);
});


let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://willonhair.shintheo.com/api/v1/image/res.partner/${this.profile}/image_1920?unique=true&filename_field=name&file_response=true`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
      }
    };
    axios.request(config2)
      .then((response) => {
         
      })
      .catch((error) => {
        console.log(error);
      });

      let config3 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/res.partner/'+ localStorage.getItem("current_user_partnerId"),
  headers: { 
    'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
  }
};

axios.request(config3)
.then((response) => {
  this.image = response.data.data[0].image_1920;
  // console.log("rrrrrrrrrrrrrrrrrrrrrr",response.data.data[0].image_1920);
})
.catch((error) => {
  console.log(error);
});
  

        let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://willonhair.shintheo.com/api/res.users/${this.userId}`,
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
      }
    };
    axios.request(config)
      .then((response) => {
    //   console.log(response.data.data);
      this.userEmail = response.data.data[0].login
      this.client_points = response.data.data[0].client_points;
      this.client_bonus = response.data.data[0].client_bonus;


    //   console.log('client_points--------->>', response.data.data[0].client_points)
    //   console.log('client_bonus--------->>', response.data.data[0].client_bonus)
      })
      .catch((error: any) => {
        console.log(error);
      });
      
    },
    methods: {

    },
    setup() {
      const tabIndex = ref(0);
  
      onMounted(() => {
        
        // set the tab from previous
        tabIndex.value = parseInt(
          localStorage.getItem(LS_BUILDER_TAB_NAME) || "0"
        );
      });
  
      /** 
       * Reset config
       * @param event
       */
      const reset = (event: any) => {
        event.preventDefault();
        // remove existing saved config
        localStorage.removeItem(LS_CONFIG_NAME_KEY);
        window.location.reload();
      };
  
      /**
       * Set active tab when the tab get clicked
       * @param event
       */
      const setActiveTab = (event: any) => {
        tabIndex.value = parseInt(event.target.getAttribute("data-tab-index"));
        // keep active tab
        localStorage.setItem(LS_BUILDER_TAB_NAME, tabIndex.value.toString());
      };
  
      /**
       * Submit form
       * @param event
       */
      const submit = (event: any) => {
        event.preventDefault();
        // save new config to localStorage
        localStorage.setItem(LS_CONFIG_NAME_KEY, JSON.stringify(config.value));
        window.location.reload();
      };
  
      return {
        tabIndex,
        config,
        reset,
        setActiveTab,
        submit,
        themeName,
        getAssetPath,
      };
    },
  });
  </script>
  