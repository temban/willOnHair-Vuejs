<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->


        <div v-if="image" class="symbol symbol-50px me-5">
              <img :src="'https://willonhair.shintheo.com/api/v1/image/res.partner/'+ profile +'/image_1920?unique=true&filename_field=name&file_response=true'" alt="image" />
            </div>
            <div v-else class="symbol symbol-50px me-5">
              <img src="@/assets/img/person.png" alt="image" />
            </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            {{ currrent_user_name }}
            <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
              >ShinTheo</span
            >
          </div>
          <a href="#" class="fw-semobold text-muted text-hover-primary fs-7"
            >{{ current_user_email }}</a
          >
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        My Profile
      </router-link>
    </div>
    <!--end::Menu item-->

   
    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  data(){
    return{
      image:"",
      profile:localStorage.getItem("current_user_partnerId"),
    }
  },
  mounted(){
    let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://willonhair.shintheo.com/api/v1/image/res.partner/${this.profile}/image_1920?unique=true&filename_field=name&file_response=true`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==',
        'Cookie': 'session_id=a96c7e60605a2d90760c95e656606a6abd4ece91'
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
  console.log("rrrrrrrrrrrrrrrrrrrrrr",response.data.data[0].image_1920);
})
.catch((error) => {
  console.log(error);
});
  
  },
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useAuthStore();

    const current_user_email = localStorage.getItem("current_username_email");
    const currrent_user_name = localStorage.getItem("current_user_name")

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: getAssetPath("media/flags/united-states.svg"),
        name: "English",
      },
      es: {
        flag: getAssetPath("media/flags/spain.svg"),
        name: "Spanish",
      },
      de: {
        flag: getAssetPath("media/flags/germany.svg"),
        name: "German",
      },
      ja: {
        flag: getAssetPath("media/flags/japan.svg"),
        name: "Japanese",
      },
      fr: {
        flag: getAssetPath("media/flags/france.svg"),
        name: "French",
      },
    };

    const signOut = () => {
      store.logout();
      router.push({ name: "sign-in" });
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      getAssetPath,
      currrent_user_name,
      current_user_email
    };
  },
});
</script>
