<template>
  <section>
    <carousel :title="'Top Products'"></carousel>
    <carousel :title="'Weekly offers'"></carousel>
    <carousel :title="'Blogs'"></carousel>

    <section class="d-flex flex-column col-12">
      <div v-if="!mobileVersion" class="h4 d-flex justify-content-center minor-heading">Brands</div>
      <div v-if="!mobileVersion" class="d-flex flex-row justify-content-between my-4 col-12">
        <router-link :to="{name: ''}" class="mx-2">
          <i class="fab fa-windows microsoft-icon mega-icon"></i>
        </router-link>
        <router-link :to="{name: ''}" class="mx-1">
          <i class="fab fa-apple mega-icon"></i>
        </router-link>
        <router-link :to="{name: ''}" class="mx-1">
          <img src="https://img.icons8.com/color/100/000000/dell.png">
        </router-link>
        <router-link :to="{name: ''}" class="mx-1">
          <img src="https://img.icons8.com/color/96/000000/hp.png">
        </router-link>
        <router-link :to="{name: ''}" class="mx-1">
          <img width="100" src="../assets/Lenovo.png">
        </router-link>
        <router-link :to="{name: ''}" class="mx-1">
          <img class="mt-4" width="100" src="../assets/msi.png">
        </router-link>
        <router-link :to="{name: ''}" class="mx-1">
          <img width="100" src="../assets/samsung.png">
        </router-link>
      </div>

      <div class="d-flex flex-row justify-content-between my-4 col-12">
        <div class="d-flex flex-column col-4">
          <span class="minor-heading justify-content-center d-flex">Fast Delivery</span>
          <div>
            <router-link :to="{name: ''}" class="mx-2">
              <img width="70" src="../assets/dhl.png">
            </router-link>
            <router-link :to="{name: ''}" class="my-3">
              <img width="70" src="../assets/hermes.png">
            </router-link>
            <router-link :to="{name: ''}" class="ml-1 mt-2">
              <img width="50" src="../assets/ups.png">
            </router-link>
          </div>
        </div>

        <div class="d-flex flex-column col-4 order-2">
          <span class="minor-heading justify-content-center d-flex">Payment Options</span>
          <div>
            <router-link :to="{name: ''}" class="mx-2">
              <img width="70" src="../assets/paypal.png">
            </router-link>
            <router-link :to="{name: ''}" class="mx-1">
              <img width="70" src="../assets/mastercard.png">
            </router-link>
            <router-link :to="{name: ''}" class="mx-1">
              <img width="70" src="../assets/visa.png">
            </router-link>
            <router-link :to="{name: ''}" class="mx-1 mt-1">
              <img width="60" src="../assets/amex.png">
            </router-link>
            <router-link :to="{name: ''}" class="mx-1 my-3">
              <img width="70" src="../assets/sepa.png">
            </router-link>
          </div>
        </div>

        <div class="d-flex flex-column col-4 order-3">
          <span class="minor-heading justify-content-center d-flex">Follow us</span>
          <div class="mt-3">
            <router-link :to="{name: ''}" class="mx-2">
              <i class="fab fa-facebook facebook-icon follow-icon"></i>
            </router-link>
            <router-link :to="{name: ''}" class="mx-1">
              <i class="fab fa-twitter twitter-icon follow-icon"></i>
            </router-link>
            <router-link :to="{name: ''}" class="mx-1">
              <i class="fab fa-instagram instagram-icon follow-icon"></i>
            </router-link>
            <router-link :to="{name: ''}" class="mx-1">
              <i class="fab fa-snapchat-square snapchat-icon follow-icon"></i>
            </router-link>
            <router-link :to="{name: ''}" class="mx-1">
              <i class="fab fa-youtube youtube-icon follow-icon"></i>
            </router-link>
          </div>
        </div>
      </div>

      <lowernavbar></lowernavbar>
      <div class="footer-text d-flex flex-column">
        <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        <span>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</span>
        <span>
          Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          1914 translation by H. Rackham
          "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        </span>
      </div>
    </section>
  </section>
</template>

<script>
import carousel from "@/components/custom-carousel/carousel";
import lowernavbar from "@/components/navBar/lower_nav_bar";
import { eventMixin } from "@/js/mixins";

export default {
  name: "front-layout",
  components: {
    carousel,
    lowernavbar
  },
  computed: {
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  }
};
</script>
<style>
.follow-icon {
  font-size: 28px;
  color: lightgrey;
}
.facebook-icon {
  color: #3b5998;
}
.youtube-icon {
  color: #e52d27;
}
.twitter-icon {
  color: #55acee;
}
.snapchat-icon {
  color: #fffc00;
}
.instagram-icon {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
  -webkit-background-clip: text;
  /* Also define standard property for compatibility */
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-text {
  font-size: small;
  color: darkgray;
  text-align: justify;
  text-justify: inter-word;
}
.mega-icon {
  font-size: 96px;
}

.microsoft-icon {
  color: dodgerblue;
}
.minor-heading {
  color: darkgray;
}
</style>
