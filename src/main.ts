import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const pinia = createPinia();
const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#0d6efd",
          secondary: "#6c757d",
        },
      },
    },
  },
  components,
  directives,
});

const app = createApp(App);
app.use(pinia);
app.use(vuetify);
app.mount("#app");
