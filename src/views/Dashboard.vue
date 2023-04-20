<template>
 <div class="row g-5 g-xl-8">
    <div class="col-xl-6" v-if="client_points  != ''">
      <StatisticsWidget6
        widget-classes="card-xl-stretch mb-xl-8"
        color="success"
        title="points"
        description="Mes Points"
        :progress="client_points"
      ></StatisticsWidget6>
    </div>
    <div class="col-xl-6" v-else>
      <StatisticsWidget6
        widget-classes="card-xl-stretch mb-xl-8"
        color="success"
        title="points"
        description="Mes Points"
        progress="0"
      ></StatisticsWidget6>
    </div>


    <div class="col-xl-6" v-if="client_bonus  != ''">
      <StatisticsWidget6
        widget-classes="card-xl-stretch mb-xl-8"
        color="primary"
        title="bonus"
        description="Mes Bonus"
        :progress="client_bonus"
      ></StatisticsWidget6>
    </div>
    <div class="col-xl-6" v-else>
      <StatisticsWidget6
        widget-classes="card-xl-stretch mb-xl-8"
        color="primary"
        title="bonus"
        description="Mes Bonus"
        progress="0"
      ></StatisticsWidget6>
    </div>
  </div>
  


 <div class="row g-5 g-xl-8">
  
    <div class="col-xl-4">
      <router-link to="/appointements">
      <StatisticsWidget2
        widget-classes="card-xl-stretch mb-xl-8"
        :avatar="getAssetPath('media/svg/avatars/029-boy-11.png')"
        title="Rendez-vous"
        description="Mes rendez-vous pris"
      ></StatisticsWidget2>
    </router-link>
    </div>

    

    <div class="col-xl-4">
      <router-link to="/fidelity_card">
      <StatisticsWidget2
        widget-classes="card-xl-stretch mb-xl-8"
        :avatar="getAssetPath('media/svg/avatars/014-girl-7.png')"
        title="Carte de Fidelite"
        description="Mes points bonus"
      ></StatisticsWidget2>
    </router-link>
    </div>

    <div class="col-xl-4">
      <StatisticsWidget2
        widget-classes="card-xl-stretch mb-5 mb-xl-8"
        :avatar="getAssetPath('media/svg/avatars/004-boy-1.png')"
        title="Localisation"
        description="CEmplacement de WillOnHair"
      ></StatisticsWidget2>
    </div>
  </div>

 <div class="row g-5 g-xl-8">
    <div class="col-xl-4">
      <StatisticsWidget2
        widget-classes="card-xl-stretch mb-xl-8"
        :avatar="getAssetPath('media/svg/avatars/029-boy-12.png')"
        title="Gallerie"
        description="Photos galerie de WillOnnHair"
      ></StatisticsWidget2>
    </div>

    <div class="col-xl-4">
      <StatisticsWidget2
        widget-classes="card-xl-stretch mb-xl-8"
        :avatar="getAssetPath('media/svg/avatars/014-girl.png')"
        title="Avis Client"
        description="Dites-nous ce que vous pensez de nos services"
      ></StatisticsWidget2>
    </div>

    <div class="col-xl-4">
      <StatisticsWidget2
        widget-classes="card-xl-stretch mb-xl-8"
        :avatar="getAssetPath('media/svg/avatars/014-girl-0.png')"
        title="Nous Contacter"
        description="Pour tous soucis contactez nous"
      ></StatisticsWidget2>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import StatisticsWidget2 from "@/components/widgets/statsistics/Widget2.vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import MixedWidget3 from "@/components/widgets/mixed/Widget3.vue";
import MixedWidget4 from "@/components/widgets/mixed/Widget4.vue";
import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";
import ListsWidget7 from "@/components/widgets/lists/Widget7.vue";
import TablesWidget9 from "@/components/widgets/tables/Widget9.vue";
import ListsWidget4 from "@/components/widgets/lists/Widget4.vue";
import ListsWidget5 from "@/components/widgets/lists/Widget5.vue";
import ListsWidget3 from "@/components/widgets/lists/Widget3.vue";
import StatisticsWidget6 from "@/components/widgets/statsistics/Widget6.vue";
import axios from "axios";

export default defineComponent({
  name: "dashboard-main",
  components: {
    StatisticsWidget2,
    StatisticsWidget5,
    StatisticsWidget6,
    MixedWidget3,
    MixedWidget4,
    MixedWidget5,
    ListsWidget7,
    TablesWidget9,
    ListsWidget4,
    ListsWidget5,
    ListsWidget3,
  },
  data() {
      return {
        value: localStorage.getItem("current_user_partnerId"),
        userId: localStorage.getItem("current_user_id"),
        userEmail: '',
        current_user_name: localStorage.getItem("current_user_name"),
        client_points: '',
        client_bonus: '',
        reqPoints:'',
        size: 300,
      }
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
    setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
