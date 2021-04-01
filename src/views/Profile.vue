<template>
  <div class="app-page profile-page">
    <div class="content row no-wrap">
      <div class="col-auto">
        <logo-card />
        <avatar-card :user="currentUser" />
        <out-card @logout-click="$store.dispatch('users/destroyToken')" />
      </div>
      <div class="col-auto">
        <div class="row no-wrap ">
          <user-card
            :user="currentUser"
            @card-click="form = 'user'" 
          />
          <pin-card @card-click="form = 'pin'" />
          <event-card @card-click="form = 'event'" />
        </div>
        <forms-profile :form="form" />
      </div>
      <div class="col-auto">
        <events-profile />
        <pins-profile />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "../components/UserCard.vue";
import EventCard from "../components/EventCard.vue";
import PinCard from "../components/PinCard.vue";
import AvatarCard from "../components/AvatarCard.vue";
import OutCard from "../components/OutCard.vue";
import EventsProfile from "../components/EventsProfile.vue";
import FormsProfile from "../components/FormsProfile.vue";
import PinsProfile from "../components/PinsProfile.vue";


export default {
  name: "ProfilePage",
  components: {
    EventCard,
    UserCard,
    PinCard,
    AvatarCard,
    OutCard,
    EventsProfile,
    FormsProfile,
    PinsProfile,
  },
  data() {
    return {
      form: 'user',
      theme: {
        label: "none",
        value: "0",
        color: "#AD3B3B",
      },
      userImg: "../assets/statics/avatar01.jpg",
      thumbStyle: {
        right: "0px",
        borderRadius: "0px",
        backgroundColor: "#111111",
        width: "9px",
        heigth: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "0px",
        borderRadius: "0px",
        backgroundColor: "#f5f5f5",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "users/getCurrentUser",
      myPin: "users/getMyPin",
      myPinState: "users/getMyPinState",
      myEvents: "users/getMyEvents",
    }),
  },
  created() {},
  beforeMounted() {
    this.getPageTheme();
  },
  methods: {
    logout() {
      this.$store
        .dispatch("users/destroyToken")
        .then(this.$router.push({ name: "Home" }))
        .catch((error) => {
          console.log(error);
        });
    },
    setNewkey() {
      this.$store.dispatch("setKey");
      console.log("setNewKey");
    },
    showEditInfo() {
      this.opemEditInfo = !this.opemEditInfo;
    },
    async getPageTheme() {
      const id = this.currentUser.categoryId;
      console.log("id", id);
      this.theme = await this.$store.dispatch("categories/getCategoryTheme", {
        id,
      });
      console.log("theme", this.theme);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
@import "../styles/typo.scss";

* {
  font-family: "Helvetica-Bold";
  box-sizing: border-box;
}

.margin{
  margin: 2px;
}

.show {
  position: absolute;
  top: 500px;
  left: 24px;
  width: 400px;
  background-color: #000;

  .status {
    color: red;
    font-size: 0.9rem;
  }

  .pin-status {
    color: white;
    font-size: 0.9rem;
  }
}

.profile-page {
  padding: 16px;
}

.content {
  width: 100%;
  height: 100%;
}

span {
  font-family: "Helvetica-Normal";
  font-weight: bolder;
  font-size: 2em;
  color: white;
  margin: 16px;
}

// ------------------------- components -----------------------------------------------------

.profile-brand {
  // height: 200px;
  // width: 400px;
  margin: 2px;
  overflow: hidden;
}

.user-info {
  margin: 2px;
}

.pin {
  // max-width: 350px;
  margin: 2px;
  overflow: hidden;
}

.event {
  margin: 2px;
}

.events {
  height: 100%;
  // max-width: 410px;
  margin: 2px;
  position: relative;

  .scrollArea {
    height: 600px;
    width: 212px;
  }

  .event-item {
    width: 200px;
    height: 200px;
    margin-bottom: 4px;
    margin-right: 4px;
  }
}

// ---------------------------------- others ---------------------------------------------
.edit-info {
  height: 0px;
  width: 100%;
  margin-top: 8px;
  background-color: $edit;
  transition: 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 1;
}

.active-edit-info {
  height: 50px;
}

// --------------------------------- start container components --------------------------
.context {
  margin-top: 8px;
  width: 100%;
  height: 100%;
  padding: 0px;
}
</style>
