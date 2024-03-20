import { defineStore } from "pinia";

export const music = defineStore("music", {
  state: () => ({
    nowMusic: 0,
    play: false,
    playList: [
      {
        title: "I Hear a Rhapsody",
        img: "/music/Bill Evans _Jim Hall - I Hear a Rhapsody/Bill Evans _Jim Hall - I Hear a Rhapsody.jpg",
        sound:
          "/music/Bill Evans _Jim Hall - I Hear a Rhapsody/Bill Evans _ Jim Hall - I Hear a Rhapsody.mp3",
        introduce: "None",
      },
      {
        title: "Love at First Sight",
        img: "/music/iwamizu - Love at First Sight/iwamizu - Love at First Sight.jpg",
        sound:
          "/music/iwamizu - Love at First Sight/iwamizu - Love at First Sight.mp3",
        introduce: "None",
      },
      {
        title: "february",
        img: "/music/luvbird - february/luvbird - february.jpg",
        sound: "/music/luvbird - february/luvbird - february.mp3",
        introduce: "None",
      },
      {
        title: "デート",
        img: "/music/RADWIMPS - デート/RADWIMPS - デート.jpg",
        sound: "/music/RADWIMPS - デート/RADWIMPS - デート.mp3",
        introduce: "None",
      },
      {
        title: "海の見える街",
        img: "/music/Rasmus Faber - 海の見える街/Rasmus Faber - 海の見える街.jpg",
        sound:
          "/music/Rasmus Faber - 海の見える街/Rasmus Faber - 海の見える街.mp3",
        introduce: "None",
      },
      {
        title: "銀河鉄道999",
        img: "/music/Rasmus Faber - 銀河鉄道999 (银河铁道999)/Rasmus Faber - 銀河鉄道999 (银河铁道999).jpg",
        sound:
          "/music/Rasmus Faber - 銀河鉄道999 (银河铁道999)/Rasmus Faber - 銀河鉄道999 (银河铁道999).mp3",
        introduce: "None",
      },
      {
        title: "Ágúst",
        img: "/music/Ólafur Arnalds - Ágúst/Ólafur Arnalds - Ágúst.jpg",
        sound: "/music/Ólafur Arnalds - Ágúst/Ólafur Arnalds - Ágúst.mp3",
        introduce: "None",
      },
      {
        title: "Merry Christmas Mr_ Lawrence",
        img: "/music/坂本龙一 - Merry Christmas Mr_ Lawrence (劳伦斯先生圣诞快乐_圣诞快乐，劳伦斯先生) (Inst_)/坂本龙一 - Merry Christmas Mr_ Lawrence (劳伦斯先生圣诞快乐_圣诞快乐，劳伦斯先生) (Inst_).jpg",
        sound:
          "/music/坂本龙一 - Merry Christmas Mr_ Lawrence (劳伦斯先生圣诞快乐_圣诞快乐，劳伦斯先生) (Inst_)/坂本龙一 - Merry Christmas Mr_ Lawrence (劳伦斯先生圣诞快乐_圣诞快乐，劳伦斯先生) (Inst_).mp3",
        introduce: "圣诞快乐🎄",
      },
      {
        title: "Sweet Rumors",
        img: "/music/麗美 (Remedios) - Sweet Rumors/麗美 (Remedios) - Sweet Rumors.jpg",
        sound:
          "/music/麗美 (Remedios) - Sweet Rumors//麗美 (Remedios) - Sweet Rumors.mp3",
        introduce: "None",
      },
    ],
  }),
  actions: {
    next() {
      const arrLength = this.playList.length;
      console.log(arrLength);
      if (this.nowMusic === arrLength - 1) {
        this.nowMusic = 0;
      } else {
        this.nowMusic++;
      }
    },
    previous() {
      const arrLength = this.playList.length;
      if (this.nowMusic === 0) {
        this.nowMusic = arrLength - 1;
      } else {
        this.nowMusic--;
      }
    },
  },
});
