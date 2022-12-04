import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

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

createApp(App).use(vuetify).mount("#app");
