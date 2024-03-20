import { defineStore } from "pinia";

export const language = defineStore("language", {
  state: () => ({
    nowLanguage: "en",
    pages: {
      register: {
        zh: {
          title: "欢迎！！！",
          tipChangeTheme: "主题",
          tipMusicControl: "音乐",
          tipChangeLanguage: "语言",
          tipChangeScreen: "全屏",
          tipSex: "性别",
          tipRandom: "随机",
          tipStart: "开始",
        },
        en: {
          title: "Welcome!",
          tipChangeTheme: "Theme",
          tipMusicControl: "Music",
          tipChangeLanguage: "Language",
          tipChangeScreen: "Full Screen",
          tipSex: "Sex",
          tipRandom: "Random",
          tipStart: "Start",
        },
        fr: {
          title: "Bonjour!",
          tipChangeTheme: "Thème",
          tipMusicControl: "Musique",
          tipChangeLanguage: "Langue",
          tipChangeScreen: "Plein Écran",
          tipSex: "Sexe",
          tipRandom: "Aléatoire",
          tipStart: "Démarrer",
        },
        jp: {
          title: "ようこそ！",
          tipChangeTheme: "テーマ",
          tipMusicControl: "音楽",
          tipChangeLanguage: "言語",
          tipChangeScreen: "全画面表示",
          tipSex: "性別",
          tipRandom: "ランダム",
          tipStart: "スタート",
        },
      },
      chat: {
        cn: {},
        en: {},
      },
    },
  }),
  getters: {},
  actions: {
    changeLanguage(language = "en") {
      if (language == "zh") {
        this.nowLanguage = "zh";
        console.log("zh", this.nowLanguage);
      } else if (language == "en") {
        this.nowLanguage = "en";
        console.log("zh", this.nowLanguage);
      } else if (language == "fr") {
        this.nowLanguage = "fr";
        console.log("zh", this.nowLanguage);
      } else if (language == "jp") {
        this.nowLanguage = "jp";
        console.log("zh", this.nowLanguage);
      }
    },
  },
});
