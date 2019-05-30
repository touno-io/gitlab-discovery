
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us.json';
import ptBR from './pt-br.json';

Vue.use(VueI18n);

const locale = 'enUS';

const messages = {
  enUS,
  ptBR,
};

const i18n = new VueI18n({
  locale,
  messages,
});

export default i18n;
