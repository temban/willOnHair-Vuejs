<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Détails du profil</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="/crafted/account/settings"
        class="btn btn-primary align-self-center"
        >Editer votre profil</router-link
      >
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"><i
            class="fas fa-user mx-2 fs-7"
            v-tooltip
            title="Phone number must be active"
          ></i>Nom

          
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ current_user_name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> 
          <i
            class="fas fa-envelope mx-2 fs-7"
            v-tooltip
            title="Phone number must be active"
          ></i>e-mail
         

        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-semobold fs-6">{{ userEmail }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7" v-if="tel">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">
          <i
            class="fas fa-phone mx-1 fs-7"
            v-tooltip
            title="Phone number must be active"
          ></i>
          téléphone
          
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{ tel }}</span>

          <span class="badge badge-success">Verified</span>
        </div>
        <!--end::Col-->
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTChartWidget1 from "@/components/widgets/charts/Widget1.vue";
import KTListWidget5 from "@/components/widgets/lists/Widget5.vue";
import KTTableWidget5 from "@/components/widgets/tables/Widget5.vue";
import KTListWidget1 from "@/components/widgets/lists/Widget1.vue";
import axios from "axios";

export default defineComponent({
  name: "account-overview",
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
        image:"",
        tel:""
      }
    },
  components: {
    KTChartWidget1,
    KTListWidget5,
    KTTableWidget5,
    KTListWidget1,
  },
  mounted(){
    let config31 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/res.partner/'+ localStorage.getItem("current_user_partnerId"),
  headers: { 
    'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
  }
};

axios.request(config31)
.then((response) => {
  if(response.data.data[0].phone){
    this.tel= response.data.data[0].phone;
  }
})
.catch((error) => {
  console.log(error);
});


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

    let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://willonhair.shintheo.com/api/v1/image/res.partner/${1}/image_1920?unique=true&filename_field=name&file_response=true`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==',
      }
    };
    axios.request(config2)
      .then((response) => {
         this.profile = JSON.stringify(response);
        //  console.log(this.profile);
         
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
    return {
       
      getAssetPath,
    };
  },
});
</script>
