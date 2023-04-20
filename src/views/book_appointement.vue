<template>
  <!--begin::Modal - Create account-->
  <div 
    id="kt_modal_create_account"
    ref="createAccountModalRef"
    tabindex="-1"
    aria-hidden="true">
    <div
      v-if="loading"
      style="
        background: rgba(0, 0, 0, 0.3);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
      "
    >
      <div class="ring">Loading</div>
    </div>
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
  

          <!--begin::Title-->
          <h2>Nouveau Rendez-Vous</h2>

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y m-5">
          <!--begin::Stepper-->
          <div
            ref="createAccountRef"
            class="stepper stepper-links d-flex flex-column"
            id="kt_create_account_stepper"
          >
            <!--begin::Nav-->
            <div class="stepper-nav py-5">
              <!--begin::Step 1-->
              <div class="stepper-item current" data-kt-stepper-element="nav">
                <h3 class="stepper-title">CHOIX DE CATEGORIES</h3>
              </div>
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">CHOIX DU COIFFEUR</h3>
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">CHOIX DU SERVICE</h3>
              </div>
              <!--end::Step 3-->

              <!--begin::Step 4-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">SELECTION DATE ET HEURE</h3>
              </div>
              <!--end::Step 4-->

              <!--begin::Step 5-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">VÉRIFICATION</h3>
              </div>
              <!--end::Step 5-->
            </div>
            <!--end::Nav-->

            <!--begin::Form-->
            <form
              class="mx-auto mw-800px w-100 py-10"
              novalidate
              id="kt_create_account_form"
              @submit="handleStep"
            >
              <!--begin::Step 1-->
              <div class="current" data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-10 pb-lg-15">
                    <!--begin::Title-->
                    <h2 class="fw-bold d-flex align-items-center text-dark">
                      Choix de la categories
                      <i
                        class="fas fa-exclamation-circle ms-2 fs-7"
                        data-bs-toggle="tooltip"
                        title="Billing is issued based on your selected account type"
                      ></i>
                    </h2>
                    <!--end::Title-->

                    <!--begin::Notice-->
                    <!-- <div class="text-gray-400 fw-semobold fs-6">
                        If you need more info, please check out
                        <a href="#" class="link-primary fw-bold">Help Page</a>.
                      </div> -->
                    <!--end::Notice-->
                  </div>
                  <!--end::Heading-->
                  

                  <!--begin::Input group-->
                  <div class="fv-row">
                    <!--begin::Row-->
                    <div class="row">
                      <!--begin::Col-->
                      <div
                        class="col-lg-6"
                        v-for="(cat, index) in categories"
                        :key="index"
                      >
                        <Field
                        type='radio'
                        class='btn-check'
                        name='Category'
                        :id="'kt_create_account_form_account_type_personal'+cat.id"
                        v-model="formData.Category"
                        />
                        
                        <label
                          @click="employeeByCatId(cat.id)"
                          class="btn border border-primary btn-outline-primary btn-outline-primary btn-outline-default px-6 d-flex align-items-center mb-5"
                          :for="'kt_create_account_form_account_type_personal'+cat.id"
                        >
                          <div v-if="cat.image_1920 != false" class="symbol symbol-40px me-2">
                            <img
                              :src="'https://willonhair.shintheo.com/api/v1/image/business.resource.type/'  + cat.id + '/image_1920?unique=true&filename_field=name&file_response=true'"
                              alt=""
                            />
                          </div>
                          <div v-else class="symbol symbol-40px me-2">
                            <img
                              src="@/assets/img/cat.png"
                              alt=""
                            />
                          </div>
                          <span class="d-block fw-semobold text-start">
                            <span class="text-dark fw-bold d-block fs-2">
                              {{ cat.name }}
                            </span>
                            <!-- <span class="text-gray-400 fw-semobold fs-6"
                                >If you need more info, please check it out</span
                              > -->
                          </span>
                        </label>
                      </div>

                      <ErrorMessage
                          class="fv-plugins-message-container invalid-feedback"
                          name="Category"
                        />
                    </div>
                    <!--end::Row-->
                  </div>
                  <!--end::Input group-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div
                data-kt-stepper-element="content"
                style="
                  box-shadow: 1px 2px 9px #000;
                  padding: 1rem 1rem; 
                  width: 70rem;
                  max-width: 100%;
                "
              >
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-10 pb-lg-15">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">Choix Du Coiffeur</h2>

                    <div class="row">
                      <!--begin::Col-->
                      <div
                        class="col-lg-6"
                        v-for="(emp, index) in employees"
                        :key="index"
                      >
                        <Field
                          type="radio"
                          class="btn-check"
                          name="ressources"
                          :value="emp.name"
                          :id="'kt_one_one_select'+emp.id"
                          v-model="formData.ressources"
                        />
                      
                        <label
                          @click="
                            storeEmployeeInfo(
                              emp.id,
                              emp.name,
                              emp.resource_calendar_id[0].id
                            )
                          "
                          class="btn border border-primary btn-outline-primary btn-outline-default d-flex align-items-center mt-5"
                          :for="'kt_one_one_select'+emp.id"
                        >
                          <div class="card">
                            <div class="inside">

                              <div v-if="emp.image_1920" class="symbol symbol-50px me-5">
                                <img
                                  :src="'https://willonhair.shintheo.com/api/v1/image/business.resource/'+emp.id+'/image_1920?unique=true&filename_field=name&file_response=true'"
                                  alt=""
                                />
                              </div>

                              <div v-else class="symbol symbol-50px me-5">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTNCxObuG09V5IdH7I7GVT0VlM0dQMb8gBA&usqp=CAU" class="" alt="" />

                              </div>
                              <span
                                class="d-block fw-semobold text-start w-100"
                              >
                                <span
                                  class="text-dark fw-bold d-block fs-4 mb-2"
                                >
                                  {{ emp.name }}
                                </span>
                                <span
                                  class="text-gray-400 fw-semobold fs-6"
                                ></span>
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    
                      <ErrorMessage
                      class="fv-plugins-message-container invalid-feedback"
                      name="ressources"
                    />
                    </div>
                  </div>
                  <!--end::Heading-->

                  <!--end::Input group-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3-->
              <div
                data-kt-stepper-element="content"
                style="
                  box-shadow: 1px 2px 9px red;
                  padding: 1rem 1rem;
                  width: 70rem;
                  max-width: 100%;
                "
              >
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-10 pb-lg-15">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">Choix Du Service</h2>

                    <div class="row">
                      <!--begin::Col-->
                      <div
                        class="col-lg-6"
                        v-for="(service, index) in services"
                        :key="index"
                      >
                        <Field
                          type="radio"
                          class="btn-check"
                          name="services"
                          :id="service.name + service.id"
                          v-model="formData.services"

                        />
                        <label
                          @click="
                            storeServiceInfo(
                              service.id,
                              service.name,
                              service.product_id[0].id
                            ), getLeaveOfResourceCalendar()"
                          class="btn border border-primary btn-outline-primary btn-outline-default d-flex align-items-center mt-5"
                          :for="service.name + service.id"
                        >
                          <div class="card">
                            <div class="inside">
                              <div v-if="service.image_1920 != false" class="symbol symbol-50px me-5">
                                <img
                                  :src="'https://willonhair.shintheo.com/api/v1/image/product.template/'+service.id+'/image_1920?unique=true&filename_field=name&file_response=true'"
                                  alt=""
                                />
                              </div>
                              <div v-else class="symbol symbol-50px me-5">
                                <img
                                  src="@/assets/img/service.png"
                                  alt=""
                                />
                              </div>
                              <span
                                class="d-block fw-semobold text-start w-100"
                              >
                                <span
                                  class="text-dark fw-bold d-block fs-4 mb-2"
                                >
                                  {{ service.name.split(">")[0] }}
                                </span>
                                <span
                                  class="text-gray-400 fw-semobold fs-6"
                                ></span>
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                      <ErrorMessage
                      class="fv-plugins-message-container invalid-feedback"
                      name="services"
                    />
                    </div>
                  </div>
                  <!--end::Heading-->

                  <!--end::Input group-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 3-->

              <!--begin::Step 4-->
              <div data-kt-stepper-element="content">
                
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!-- <Button v-styleclass="{ selector: '@next', toggleClass: 'p-disabled' }" label="Toggle p-disabled" />
                  <InputText /> -->
                  <!--begin::Heading-->
                  <label for="date">Date</label>

                  <div class="row">
                    <!--begin::Col-->
                    <div class="col-lg-10">
                      <Calendar
                        showIcon
                        v-model="dateTest"
                        touchUI
                        dateFormat="yy/mm/dd"
                        :minDate="tomorrow"
                        style="width: 100%;"
                        :disabledDays="propertyValues"
                        :disabledDates="leaveDateList2"
                      ></Calendar>


                    </div>
                    <div class="col-lg-2">
                      <Button type="button" @click="calendarShowEmployeeHoursByDayIndex()" label="Horaire" />
                    </div>
                  </div>
                  <div class="row">
                    <!--begin::Col-->
                    <div
                      class="col-lg-6"
                      v-for="(time, index) in employeeFilteredTimes"
                      :key="index"
                    >
                      <Field
                        type="radio"
                        class="btn-check"
                        name="hours"
                        :id="'time'+index+time[3]"
                        v-model="formData.hours"
                      />
                      <label v-if="index != null" @click="selectTime($event, time)"
                      class="btn border border-primary btn-outline-primary btn-outline-default d-flex align-items-center mt-5"
                        :for="'time'+index+time[3]"
                      >
                        <div class="card">
                          <div class="inside">
                            <div class="symbol symbol-50px me-5">
                              <img
                                src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-clock-icon-png-image_4152707.jpg"
                                alt=""
                              />
                            </div>
                            <span class="d-block fw-semobold text-start w-100">
                              <span class="text-dark fw-bold d-block fs-4 mb-2">
                                {{ time }}
                              </span>
                              <span
                                class="text-gray-400 fw-semobold fs-6"
                              ></span>
                            </span>
                          </div>
                        </div>
                      </label>
                      <label v-else>

                        <div
                      class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
                    >
                      <!--begin::Icon-->
                      <KTIcon
                        icon-name="information-5"
                        icon-class="fs-2tx text-warning me-4"
                      />
                      <!--end::Icon-->
                      <!--begin::Wrapper-->
                      <div class="d-flex flex-stack flex-grow-1">
                        <!--begin::Content-->
                        <div class="fw-semobold">
                          <h4 class="text-gray-800 fw-bold">
                            We need your attention!
                          </h4>
                          <div class="fs-6 text-gray-600">
                            To start using great tools, please, please
                            <a href="#" class="fw-bold">Create Team Platform</a>
                          </div>
                        </div>
                        <!--end::Content-->
                      </div>
                      <!--end::Wrapper-->
                    </div>
                      </label>
                    </div>
                    <ErrorMessage
                      class="fv-plugins-message-container invalid-feedback"
                      name="hours"
                    />
                  </div>
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 4-->

              <!--begin::Step 5-->
              <div data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100" >
                  <!--begin::Heading-->
                  <div class="pb-8 pb-lg-10">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">Vous avez presque terminé !</h2>
                    <!--end::Title-->

                    <!--begin::Notice-->
                    <div class="text-gray-400 fw-semobold fs-6">
                      Cliquez sur le bouton Soumettre pour réserver votre rendez-vous.
                    </div>
                    <!--end::Notice-->
                  </div>
                  <!--end::Heading-->

                
    <div class="card1">
      <section class="date">
        <time >
          <span> <span>{{ currentDate.split(' ')[0] }}</span>{{ currentDate.split(' ')[2] }}</span>
          <span>{{ currentDate.split(' ')[1] }}<span style="font-size: 1.5rem;">{{ currentDate.split(' ')[3] }}</span></span>
        </time>
      </section>
      <section class="card-cont">
        
        <div class="even-date">
         <i class="fa fa-user" ></i>
         <time >
          <h3 style="margin-left: 1rem;">Employee: {{ employeeName}} </h3>
         </time>
        </div>

        <div class="even-date">
         <i class="fa fa-balance-scale"></i>
         <time >
          <h6 style="margin-left: 1rem;">Service: {{ serviceName.split(">")[0] }} <br/></h6>
         </time>
        </div>
       
        <div class="even-date">
         <i class="fa fa-money" ></i>
         <time>
          <h6 style="margin-left: 1rem;">Prix ​​des services: {{servicePrice}}$</h6>
         </time>
        </div>
        

        <div class="even-date">
         <i class="fa fa-calendar"></i>
         <time>
           <h6 style="margin-left: 1rem;">Date de début: {{ appointementDate + " " +  start_time}} </h6>
         </time>
        </div>

        <div class="even-date">
         <i class="fa fa-calendar" ></i>
         <time>
           <h6 style="margin-left: 1rem;">Date de fin: {{ appointementDate + " " +  end_time}}</h6>
         </time>
        </div>

        <div class="even-info">
          <i class="fa fa-map-marker"></i>
          <p >
           WillOnHair Belgium.
          </p>
        </div>
      </section>
    </div>


                   
                    <!--end::Text-->

                    <!--begin::Alert-->
 
                    <!--end::Alert-->
          
                  <!--end::Body-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 5-->

              <!--begin::Actions-->
              <div class="d-flex flex-stack pt-15">
                <!--begin::Wrapper-->
                <div class="me-2">
                  <button
                    type="button"
                    class="btn btn-lg btn-light-primary me-3"
                    data-kt-stepper-action="previous"
                    @click="previousStep"
                  >
                    <KTIcon icon-name="arrow-left" icon-class="fs-3 me-1" />
                    Retour
                  </button>
                </div>
                <!--end::Wrapper-->

                <!--begin::Wrapper-->
                <div>
                  <button
                    type="submit"
                    class="btn btn-lg btn-primary"
                    v-if="currentStepIndex === totalSteps - 1"
                    @click="formSubmit()"
                  >
                    <span class="indicator-label">
                      Soumettre
                      <KTIcon
                        icon-name="arrow-right"
                        icon-class="fs-3 ms-2 me-0"
                      />
                    </span>
                    <span class="indicator-progress">
                      Please wait...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>

                  <button type="submit" class="btn btn-lg btn-primary" v-else>
                    Continuer
                    <KTIcon
                      icon-name="arrow-right"
                      icon-class="fs-3 ms-1 me-0"
                    />
                  </button>
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Actions-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create project-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2";
import { ErrorMessage, Field, useForm } from "vee-validate";
import Calendar from "primevue/calendar";
import InputText from 'primevue/inputtext';
  // import jQuery from 'jquery';
import * as Yup from "yup";
import axios from "axios";
import router from "@/router";

interface Step1 {
  Category?: string;
}

interface Step2 {
  ressources?: string;
}

interface Step3 {
  services?: string;
}

interface Step4 {
  hours?: string;
}

interface KTCreateApp extends Step1, Step2, Step3, Step4 {}

export default defineComponent({
  name: "create-account-modal",
  components: {
    Field,
    ErrorMessage,
    Calendar,
    InputText
  },

  data() {
    return {
      employeeValue:"",
      index:"",
      loading: false,
      employeeName: "",
      employeeId: "",
      selectedCategoryId: "",
      start_time:"",
      end_time:"",
      appointementDate:"",
      employeeCalendarIds: "",
      employeeTakenHours: [Number, String],
      employeeFreeHours: [Number, String],
      serviceId:"",
      serviceName:"",
      serviceProductId:"",
      dateTest: "",
      servicePrice:"",
      currentDate:Date(),
      addMins:1800,
      date: "04-04-2023", 
      date1: "2023-04-14",
      employeeCalendarAttendanceIds: [Number, String],
      value: localStorage.getItem("current_user_partnerId"),
      current_user_partnerId:localStorage.getItem("current_user_partnerId"),
      userId: localStorage.getItem("current_user_id"),
      userEmail: "",
      current_user_name: localStorage.getItem("current_user_name"),
      client_bonus: "",
      reqPoints: "",
      minDate:"",
      weekdays: [1, 0],
      dayofweek:[Number, String],
      dayIndex:[Number, String],
     holidyasStartDate:"",
     holidyasEndDate:"",
     holidyasStartTime:"",
     holidyasEndTime:"",
    };
  },
 
  mounted() {
    this.employeeHoursPerDay = [];
      this.employeeTakenHours = [];
      this.employeeFreeHours = [];

      this.employeeHoursPerDay.length = 0;
      this.employeeTakenHours.length  = 0;
      this.employeeFreeHours.length  = 0;

      this.employeeCalendarAttendanceIds.length = 0;
      this.employeeCalendarAttendanceIds = [];

      this.employees = [];
      this.employees.length = 0;

    this.categories = [];
    this.loading = true;




    axios.request({
        method: "get",
        maxBodyLength: Infinity,
        url: "https://willonhair.shintheo.com/api/business.resource.type/search",
        headers: {
          "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
          
        },
      })
      .then((response) => {
        this.categories = response.data.data;
        console.log('rrrrr', this.categories)
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
        Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
        });
      








  },
  created(){
    

    
let stringDate = Date();

let d1 =  JSON.stringify(new Date(stringDate));
let p1 = d1.split('"')[1] 
let d2 = p1.split('"')[0] 
var date = new Date(d2)
let date1 = date.toDateString()

this.currentDate = date1




  },
  methods: {

  

    employeeByCatId(id) {
      this.loading = true;
      this.employees = [];
      this.employees.length = 0;
      this.selectedCategoryId = id;

      let getServices = () => {
        this.services = [];
        this.services.length = 0;
        axios
          .request({
            method: "get",
            maxBodyLength: Infinity,
            url: "https://willonhair.shintheo.com/api/appointment.product/search",
            headers: {
              "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
            },
          })
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              
              if (response.data.data[i].name.split(">")[1] == id) {
                this.services.push(response.data.data[i]) || [];
                console.log("ffff", id, response.data.data);
              }
            }
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
          });
      };

      axios
        .request({
          method: "get",
          maxBodyLength: Infinity,
          url: "https://willonhair.shintheo.com/api/business.resource/search",
          headers: {
            "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
          },
        })
        .then((response: {data: any }) => {
          getServices();
          for (let index = 0; index <= response.data.data.length - 1; index++) {
            if (response.data.data[index].resource_type_id[0].id == id) {
              this.employees.push(response.data.data[index]);
            }
          }
          console.log("eeee", this.employees);
          console.log("rrrr", this.employeeCalendarIds);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
        });
    },

    storeEmployeeInfo(id, name, calendarIds) {
        this.employeeCalendarAttendanceIds.length = 0;
        this.employeeLeaveIds.length = 0;

        this.loading = true;
      this.employeeId = id;
      console.log("id", this.employeeId);

      this.employeeName = name;
      console.log("name", this.employeeName);

      this.employeeCalendarIds = calendarIds;
      console.log("calendarIds", this.employeeCalendarIds);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://willonhair.shintheo.com/api/resource.calendar/"+calendarIds,
        headers: {
          "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
          
        },
      };
      axios
        .request(config)
        .then((response) => {


          // console.log(JSON.parse(JSON.stringify(response.data.data)))
          this.employeeCalendarAttendanceIds.length = 0;
          this.employeeLeaveIds.length = 0;
          //console.log(' -->  --> '+resourceCalendar[0].attendance_ids[2].id)
          for (
            let c = 0;
            c <= response.data.data[0].attendance_ids.length - 1;
            c++
          ) {
            this.employeeCalendarAttendanceIds.push(
              response.data.data[0].attendance_ids[c].id
            ); //get all attendance_ids of resource.calendarId selected
            console.log(
              "  les ids -->  --> ",
              this.employeeCalendarAttendanceIds
            );
          }

          for (
            let i = 0;
            i <= response.data.data[0].leave_ids.length - 1;
            i++
          ) {
            this.employeeLeaveIds.push(
              response.data.data[0].leave_ids[i].id
            ); //get all attendance_ids of resource.calendarId selected
            console.log(
              "  les employeeeeeeeeeeeeeeeeeeee leave ids  -->  --> ",
              this.employeeLeaveIds
            );
          }
          // console.log( listAttendanceIdsOfCalendar);
          this.loading = false;
        })
        .catch((error) => {
           this.loading = false;
          console.log(error);
          Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
        });
    },

 getLeaveOfResourceCalendar() {
  this.holidaysStart.length =0;
  this.holidaysEnd.length =0;
      this.leaveDateList.length = 0;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/resource.calendar.leaves/search',
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
        'Cookie': 'session_id=64a17f2198105caa0e711024319531e92ad4e4c6'
      }
    };
    axios.request(config)
      .then((response) => {
        let allResCalendarLeve = response.data.data;
        for (let i = 0; i < this.employeeLeaveIds.length; i++) { 
          for (let j = 0; j < allResCalendarLeve.length ; j++) { 
            if (this.employeeLeaveIds[i] === allResCalendarLeve[j].id) {

              this.holidaysStart.push(allResCalendarLeve[j].date_from)
               this.holidaysEnd.push(allResCalendarLeve[j].date_to)
               var startDate = new Date(allResCalendarLeve[j].date_from.split('T')[0]);
               var endDate = new Date(allResCalendarLeve[j].date_to.split('T')[0]);

               this.holidyasStartTime = allResCalendarLeve[j].date_from.split('T')[1];
               this.holidyasEndTime = allResCalendarLeve[j].date_to.split('T')[1];
               
               this.holidyasStartDate = allResCalendarLeve[j].date_from.split('T')[0];
               this.holidyasEndDate = allResCalendarLeve[j].date_to.split('T')[0];

               var currentDate = startDate;
               while (currentDate <= endDate) {
                //  console.log('current date -> ', currentDate)
                 this.leaveDateList.push(new Date(currentDate.toISOString().slice(0, 10)));
                 currentDate.setDate(currentDate.getDate() + 1);
               }


               console.log('Start date', allResCalendarLeve[j].date_from);
               console.log('end date --> ',  allResCalendarLeve[j].date_to ); 
             }

             if(this.leaveDateList.length > 2){
          this.leaveDateList1.push(this.leaveDateList.slice(1, -1));
          this.leaveDateList.length = 0;
         }
         this.leaveDateList1.concat(this.leaveDateList1)
         console.log('jours de conges --> ',  this.leaveDateList1);
          }

        }


        if(this.leaveDateList1.length>1){
          for (let k = 0; k <= this.leaveDateList1.length -1; k++) {
            for(let u=0; u<this.leaveDateList1[k].length; u++){
              this.leaveDateList2.push(this.leaveDateList1[k][u])
            }
           
          }
        }
       console.log('jours de conges --->  TREE',  this.leaveDateList2);

      })
      .catch((error) => {
        console.log(error); 
        Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
      });
  },

    storeServiceInfo(serviceId, serviceName, serviceProductId) {
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.serviceProductId = serviceProductId

       let getDaysIndex = ()=> {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://willonhair.shintheo.com/api/resource.calendar.attendance/search",
        headers: {
          "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
          
        },
      };

      axios
        .request(config)
        .then((response: any) => {
          let GetHeuresOdoo = [];
          let CalendarAttendance: any[] = [];
          CalendarAttendance = response.data.data; // get all attendances in resource.calendar.attendance
                
          for (
            let i = 0;
            i <= this.employeeCalendarAttendanceIds.length - 1;
            i++
          ) {
            for (let j = 0; j <= CalendarAttendance.length - 1; j++) {
              if (
                this.employeeCalendarAttendanceIds[i] == CalendarAttendance[j].id
              ) {                
                
               this.dayofweek.push(CalendarAttendance[j].dayofweek);
               
              }
            }

          }

        this.dayIndex = this.dayofweek.filter((element, index) => {
    return this.dayofweek.indexOf(element) === index;
});
const Ind: any[] = [];
for(let i = 0; i<this.dayIndex.length; i++){
    if(Number(this.dayIndex[i]) == 0){
      Ind.push(1);   
    } else if(Number(this.dayIndex[i])== 1){
      Ind.push(2);   
    }else if(Number(this.dayIndex[i]) == 2){
      Ind.push(3);   
    }else if(Number(this.dayIndex[i]) == 3){
      Ind.push(4);   
    }else if(Number(this.dayIndex[i]) == 4){
      Ind.push(5);   
    }else if(Number(this.dayIndex[i]) == 5){
      Ind.push(6);   
    }else if(Number(this.dayIndex[i]) == 6){
      Ind.push(0);   
    }
}

var array1 = [0, 1, 2, 3, 4, 5, 6];
var index;
for (var i=0; i<Ind.length; i++) {
    index = array1.indexOf(Ind[i]);
    if (index > -1) {
        array1.splice(index, 1);
    }
}

this.propertyValues = Object.values(array1);

          console.log("backend", this.dayIndex);
          console.log("converted", Ind);
          console.log("weekdayofffffff", this.propertyValues );
          
          this.loading = false;
        })
        .catch((error: any) => {
          this.loading = false;
          console.log(error);
          Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
        });
    }


this.loading = true;
    let config1 = {
      method: 'get',
      maxBodyLength: Infinity,
      url:`https://willonhair.shintheo.com/api/product.template/${serviceProductId.toString()}`,
      headers: { 
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
      }
    };
    axios.request(config1)
    .then((response) => {
      //console.log('resultaaaaaat => ',JSON.stringify(response.data));
      this.servicePrice = response.data.data[0].list_price
      console.log('ce service coute   -->--> ',this.servicePrice)
      getDaysIndex();
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
    });
        console.log("services info",  this.serviceId,  this.serviceName, this.serviceProductId);
        
    },

    calendarShowEmployeeHoursByDayIndex(){
        this.loading =true;


let compar = () =>{
  console.log("Reserved -> ", this.employeeTakenHours);
              console.log("All hours -> ", this.employeeHoursPerDay);

              this.employeeHoursPerDay = this.employeeHoursPerDay.filter(val => !this.employeeTakenHours.includes(val));
             
              var index;
            for (var i=0; i<this.employeeTakenHours.length; i++) {
                index = this.employeeHoursPerDay.indexOf(this.employeeTakenHours[i]);
                if (index > -1) {
                  this.employeeHoursPerDay.splice(index, 1);
                }
            }
     
            for (var i=0; i<this.employeeTakenHours.length; i++) {
                index = this.employeeHoursPerDay.indexOf(this.employeeTakenHours[i]);
                if (index > -1) {
                  this.employeeHoursPerDay.splice(index, 1);
                }
            }
     
            for( var i =this.employeeHoursPerDay.length - 1; i>=0; i--){
  for( var j=0; j<this.employeeTakenHours.length; j++){
    if(this.employeeHoursPerDay[i] === this.employeeTakenHours[j]){
      this.employeeHoursPerDay.splice(i, 1);
    }
  }
}


let chars:any = [];
var SD;
var ED;

chars.length = 0;

for(let k=0; k<this.holidaysStart.length; k++){

  console.log('holidys ===========================-> ', this.holidaysStart[k])

  if(this.holidaysStart[k].split('T')[0] == selectedDate){

    SD = this.holidaysStart[k]
    console.log('holidya exact day SD ===========================-> ', SD)

    
                   
                    var time = '12:15:00';
                    let Times:any = this.holidaysStart[k].split('T')[1];

for(let i=0; i<this.employeeHoursPerDay.length; i++){

  let str1 = this.employeeHoursPerDay[i].split(':');
  let str2:any;  str2 = Times.split(':');

let totalSeconds1 = parseInt(str1[0] * 3600 + str1[1] * 60 + str1[0]);
let totalSeconds2 = parseInt(str2[0] * 3600 + str2[1] * 60 + str2[0]);

  if (totalSeconds2 > totalSeconds1){
    // this.employeeHoursPerDay.length = 0;
    // this.employeeHoursPerDay = [];
    console.log("start date working hours behind -> ", this.employeeHoursPerDay[i]);
    chars.push(this.employeeHoursPerDay[i])
 
    
  }
}
                    this.loading =false;
              
                  }

                  
}


for(let k=0; k<this.holidaysEnd.length; k++){

console.log('holidys ===========================-> ', this.holidaysEnd[k])

if(this.holidaysEnd[k].split('T')[0] == selectedDate){

  ED = this.holidaysEnd[k];
  console.log('holidya exact day ED ===========================-> ', ED)

  
                 
                  var time = '12:15:00';
                  let Times:any = this.holidaysEnd[k].split('T')[1];

for(let i=0; i<this.employeeHoursPerDay.length; i++){

let str1 = this.employeeHoursPerDay[i].split(':');
let str2:any;  str2 = Times.split(':');

let totalSeconds1 = parseInt(str1[0] * 3600 + str1[1] * 60 + str1[0]);
let totalSeconds2 = parseInt(str2[0] * 3600 + str2[1] * 60 + str2[0]);

if (totalSeconds2 < totalSeconds1){
  // this.employeeHoursPerDay.length = 0;
  // this.employeeHoursPerDay = [];
  console.log("start date working hours behind -> ", this.employeeHoursPerDay[i]);
  chars.push(this.employeeHoursPerDay[i])

}
}
                  this.loading =false;
            
                }

                
}

console.log("ED", ED, " SD", SD);

if(ED === undefined && SD === undefined){
  chars = this.employeeHoursPerDay;
  // console.log("rrrrrr  -> does not exist");
}


this.loading =false;
this.employeeFilteredTimes = [...new Set(chars)];
console.log("last  -> ", this.employeeFilteredTimes);

    
                  
//                   else if(this.holidyasEndDate == selectedDate){
//                     console.log('holidyasStart ===========================-> ', this.holidyasEndDate, this.holidyasEndTime)

//                     var time = '12:15:00';
//                     let Times:any = [];

// for(let i=0; i<this.employeeHoursPerDay.length; i++){

//   let str1 = this.employeeHoursPerDay[i].split(':');
//   let str2:any;  str2 = time.split(':');

// let totalSeconds1 = parseInt(str1[0] * 3600 + str1[1] * 60 + str1[0]);
// let totalSeconds2 = parseInt(str2[0] * 3600 + str2[1] * 60 + str2[0]);

//   if (totalSeconds2 < totalSeconds1){
//     // this.employeeHoursPerDay.length = 0;
//     // this.employeeHoursPerDay = [];
//     console.log("start date working hours behind -> ", this.employeeHoursPerDay[i]);
//     this.employeeFilteredTimes.push(this.employeeHoursPerDay[i])
 
//   }
// }
// console.log("start date working hours behind -> ", this.employeeFilteredTimes);
           
//                     this.loading =false;
//                   }else{

//                     console.log('holidyas ===========================-> nothing')
//                     console.log("freeeeeeeeee -> ", this.employeeHoursPerDay);


//                     this.employeeFilteredTimes =  this.employeeHoursPerDay;


//                     this.loading =false;
//                   }

}


        this.employeeHoursPerDay = [];
      this.employeeTakenHours = [];
      this.employeeFreeHours = [];

      this.employeeHoursPerDay.length = 0;
      this.employeeTakenHours.length  = 0;
      this.employeeFreeHours.length  = 0;

      console.log("full date", this.dateTest);

      var date = new Date(this.dateTest)

    // Add a day
     date.setDate(date.getDate() + 1)
      

      let d1 =  JSON.stringify(new Date(date));
      console.log("full date conversted", d1);

     let d2 = d1.split("T")[0];
     let selectedDate = d2.split('"')[1];

      let formatHeures = (secondes: any) => {
        const heures = Math.floor(secondes / 3600);
        const minutes = Math.floor((secondes % 3600) / 60);
        const secondesRestantes = secondes % 60;
        return `${heures}:${minutes < 10 ? "0" : ""}${minutes}:${
          secondesRestantes < 10 ? "0" : ""
        }${secondesRestantes}`;
      };

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://willonhair.shintheo.com/api/resource.calendar.attendance/search",
        headers: {
          "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
          
        },
      };

      axios
        .request(config)
        .then((response: any) => {
          let GetHeuresOdoo = [];
          let CalendarAttendance: any[] = [];
          CalendarAttendance = response.data.data; // get all attendances in resource.calendar.attendance
          
          
          var parts: any;
          parts =  selectedDate.split("-");
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
                
                var dayIndex = 0;

                if(mydate.getDay() == 0 ){
                var dayIndex = 6;
                }else if( mydate.getDay() == 1 ){
                var dayIndex = 0;
                }else if(mydate.getDay() == 2){
                var dayIndex = 1;
                }else if(mydate.getDay() == 3){
                var dayIndex = 2;
                }else if(mydate.getDay() == 4){
                var dayIndex = 3;
                }else if(mydate.getDay() == 5){
                var dayIndex = 4;
                }else if(mydate.getDay() == 6){
                var dayIndex = 5;
                }
                this.appointementDate = selectedDate;
                console.log("indexxxxxxxx", dayIndex, this.appointementDate);
                
          // console.log('resCalendarAttendance----->>> ' + resCalendarAttendance[2].id + ' listAttendanceIdsOfCalendar ' + JSON.parse(listAttendanceIdsOfCalendar)[2])
          for (
            let i = 0;
            i <= this.employeeCalendarAttendanceIds.length - 1;
            i++
          ) {
            //loop attendance_ids selected in resource.calendar of selected resource.calendarId
            //console.log('i-----> '+ i)

            for (let j = 0; j <= CalendarAttendance.length - 1; j++) {
              // loop all attendances in resource.calendar.attendance
              //console.log('j----->> '+ j)
              if (
                this.employeeCalendarAttendanceIds[i] == CalendarAttendance[j].id
              ) {                
                
                const dayofweek = parseInt(CalendarAttendance[j].dayofweek);
                console.log("dayyoofff wee", dayofweek);
               

                if (dayofweek  == dayIndex) {
                  let hours = CalendarAttendance[j];
                  // console.log('+++++----------> ' ,hours)

                  const day = CalendarAttendance[j].name;
                  const hourFrom = CalendarAttendance[j].hour_from;
                  const hourTo = CalendarAttendance[j].hour_to;
console.log("index", dayofweek, " name", CalendarAttendance[j].name);
console.log("hourFrom", hourFrom);
console.log("hourTo", hourTo);




                  for (let h = hourFrom * 3600; h < hourTo * 3600; h += 1800) {
                    // convert time to hours and minutes

                    this.employeeHoursPerDay.push(formatHeures(h));
                  }
                  console.log("yyyyyy", this.employeeHoursPerDay);
                }
              }
            }
          }

          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://willonhair.shintheo.com/api/business.appointment/search",
            headers: {
              "api-key": "NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67",
              
            },
          };
          axios
            .request(config)
            .then((response) => {
              let EmployeeReservedHours = [];
              let responseData = response.data.data;
              // console.log(responseData)
              // const responseData = JSON.parse(JSON.stringify(response.data.data))
              for (let index = 0; index < responseData.length; index++) {
                if (
                    responseData[index].resource_id[0].id == this.employeeId &&
                    responseData[index].datetime_start.split("T")[0] == selectedDate &&
                    responseData[index].state !== 'cancel'
                ) {

                    this.employeeTakenHours.push(responseData[index].datetime_start.split("T")[1]);

                }
              }

              compar();
            })
            .catch((error) => {
            this.loading = false;
              console.log(error);
              Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
            });
        })
        .catch((error: any) => {
          this.loading = false;
          console.log(error);
          Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
        });
    },

    selectTime(e, time){

        this.start_time = time


        let timeToSecs = (time) =>{
   let [h, m, s] = time.split(':');
   return h*3600 + (m|0)*60 + (s|0)*1;
 };

 
 let secsToTime = (seconds) => {
   let z =( n:any) => (n<10? '0' : '') + n; 
   return (seconds / 3600 | 0) + ':' +
        z((seconds % 3600) / 60 | 0) + ':' +
         z(seconds % 60);
 }
 
       let addTimes = (t0 :any, t1:any) => {


   this.end_time = secsToTime(timeToSecs(t0) + timeToSecs(t1))

   console.log("start_time",this.start_time, "end_time", this.end_time)

   return secsToTime(timeToSecs(t0) + timeToSecs(t1));
 }

        addTimes(secsToTime(this.addMins), time)
        
    },


    

   formSubmit() {
this.loading = true;
var data = JSON.stringify({
    resource_type_id: this.selectedCategoryId,
    resource_id: this.employeeId,
    service_id: this.serviceId,
    partner_id: this.current_user_partnerId,
    description: "The customer is very sensitive",
    datetime_start: this.appointementDate + " " +  this.start_time,
    datetime_end:  this.appointementDate + " " +  this.end_time,
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://willonhair.shintheo.com/api/business.appointment/create',
    headers: {
      'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
      'Content-Type': 'text/plain',
    },
    data: data
  };
  axios.request(config)
    .then((response) => {
        this.loading = false;
        Swal.fire({
text: "Rendez-vous pris avec succès",
icon: "success",
buttonsStyling: false,
confirmButtonText: "Ok",
heightAuto: false,
customClass: {
  confirmButton: "btn fw-semobold btn-light-primary",
},
}).then(() => {
    router.push({ path: '/appointements' });
});
      console.log(JSON.stringify(response.data));
     
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
    });



}


 
  },
  setup() {
    let services: any[] =[];
    let propertyValues:any[] =[];
    let employeeHoursPerDay:any[] =[];
    let employeeFilteredTimes:any[] =[];
    let employees:any[] =[];
    let categories:any[] = [];
    let employeeLeaveIds:any[] =[];
    let disabledDays1: any = [];
    let leaveDateList: any = [];
    let leaveDateList1: any = [];
    let leaveDateList2: any = [];
    let holidaysStart: any = [];
    let holidaysEnd: any = [];

    

    disabledDays1 =[ new Date("2023/05/09"), new Date("2023/05/10") ]
    const _stepperObj = ref<StepperComponent | null>(null);
    const createAccountRef = ref<HTMLElement | null>(null);
    const createAccountModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    var tomorrow = new Date();
    const formData = ref<KTCreateApp>({
      Category: "",
      ressources: "",
      services: "",
      hours: "",
    });

    onMounted(() => {



tomorrow.setDate(tomorrow.getDate()+1);

// console.log("+1111111", tomorrow.toLocaleDateString())
      _stepperObj.value = StepperComponent.createInsance(
        createAccountRef.value as HTMLElement
      );
    });

    const createAppSchema = [
      Yup.object({
        Category: Yup.string().required().label(' Choix de la categories'),
      }),
      Yup.object({
        ressources: Yup.string().required().label('Choix Du Coiffeur'),
      }),
      Yup.object({
        services: Yup.string().required().label('Choix du service'),
      }),
      Yup.object({
        hours: Yup.string().required().label('Heur et Date du Rendez-Vous'),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const { resetForm, handleSubmit } = useForm<Step1 | Step2 | Step3 | Step4>({
      validationSchema: currentSchema,
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const handleStep = handleSubmit((values) => {
      resetForm({
        values: {
          ...formData.value,
        },
      });

      formData.value = {
        ...values,
      };

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });


    return {
      propertyValues,
      createAccountRef,
      totalSteps,
      previousStep,
      handleStep,
      currentStepIndex,
      formData,
      createAccountModalRef,
      getAssetPath,
      services,
      employeeHoursPerDay,
      employees,
      categories,
      tomorrow,
      employeeLeaveIds,
      disabledDays1,
      leaveDateList,
      employeeFilteredTimes,
      leaveDateList1,
      leaveDateList2,
      holidaysStart,
      holidaysEnd

    };
  },
});
</script>
<style lang="scss" scoped>



@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");
.row:after {
  content: "";
  display: table;
  clear: both;
  opacity: 2;
}
.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-family: sans-serif;
  font-size: 20px;
  color: #fff000;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #fff000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
.ring:before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #fff000;
  border-right: 3px solid #fff000;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}
pan {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}
pan:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff000;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px #fff000;
}
@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

body {
  margin: 0 auto;
  width: 70%;
  background: rgb(214, 109, 117);
  background: linear-gradient(
    87deg,
    rgba(214, 109, 117, 1) 0%,
    rgba(226, 149, 135, 1) 100%
  );
}
h1 {
  font-family: "Roboto Condensed", sans-serif;
}
.main-container {
}
.card {
  width: 100%;
  padding: 0rem 1rem;
  display: grid;
  background-color: #fff;
  border-radius: 5px;
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(5px);
  cursor: pointer;
}
img {
  width: 30%;
  border-radius: 50%;
  margin-left: 25px;
  margin: 15px 0 15px 0px;
}
.content {
  margin-right: 25px;
}
.inside {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 16rem;
  max-width: 100%;
  margin: 0 auto;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  background: rgba(100, 100, 100, 0.4);
}
.overlay-card {
  background: rgb(255, 216, 155);
  background: linear-gradient(
    87deg,
    rgba(255, 216, 155, 1) 0%,
    rgba(25, 84, 123, 1) 100%
  );
  width: 20%;
  border-radius: 5px;
  margin: 11% auto auto;
}
.overlay-img {
  width: 30%;
  margin-top: 40px;
}
.overlay-inside {
  text-align: center;
  position: relative;
}


@import url('https://fonts.googleapis.com/css?family=Oswald');


.card1
{
    
  background-color: #97e3ff;
  width: 90%;
  text-transform: uppercase;
  border-radius: 4px;
  margin: 0 3rem;
}


.date
{
  display: table-cell;
  width: 40%;
  position: relative;
  text-align: center;
  border-right: 2px dashed #dadde6
}

.date:before,
.date:after
{
  content: "";
  display: block;
  width: 30px;
  height: 30px;
  background-color: #DADDE6;
  position: absolute;
  top: -15px ;
  right: -15px;
  z-index: 1;
  border-radius: 50%
}

.date:after
{
  top: auto;
  bottom: -15px
}

.date time
{
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%)
}

.date time span{display: block}

.date time span:first-child
{
  color: #2b2b2b;
  font-weight: 600;
  font-size: 250%
}

.date time span:last-child
{
  text-transform: uppercase;
  font-weight: 600;
  margin-top: -10px
}

.card-cont
{
  display: table-cell;
  width: 75%;
  font-size: 100%;
  padding: 10px 10px 30px 30px
}

.card-cont h3
{
  color: #3C3C3C;
  font-size: 130%
}

.row:last-child .card:last-of-type .card-cont h3
{
  text-decoration: line-through
}

.card-cont > div
{
  display: table-row
}

.card-cont .even-date i,
.card-cont .even-info i,
.card-cont .even-date time,
.card-cont .even-info p
{
  display: table-cell
}

.card-cont .even-date i,
.card-cont .even-info i
{
    
  padding: 4% 3% 0 0
}

.card-cont .even-info p
{
  padding: 30px 50px 0 0
}

.card-cont .even-date time span
{
  display: block
}

.card-cont a
{
  display: block;
  text-decoration: none;
  width: 80px;
  height: 30px;
  background-color: #D8DDE0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 2px;
  position: absolute;
  right: 10px;
  bottom: 10px
}

.row:last-child .card:first-child .card-cont a
{
  background-color: #037FDD
}

.row:last-child .card:last-child .card-cont a
{
  background-color: #F8504C
}

@media screen and (max-width: 860px)
{
  .card1
  {
    display: block;
    float: none;
    width: 100%;
    margin-bottom: 10px
  }
  
  .card1 + .card{margin-left: 0}
  
  .card-cont .even-date,
  .card-cont .even-info
  {
    font-size: 75%
  }
}


</style>
