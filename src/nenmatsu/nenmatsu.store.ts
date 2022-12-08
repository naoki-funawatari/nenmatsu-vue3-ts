import { reactive, ref } from "vue";
import { defineStore } from "pinia";

type Hokenryo = {
  [key: string]: {
    kubun: number;
    kingaku: string;
  };
};

export const useNenmatsuStore = defineStore("nenmatsuStore", () => {
  const seimei = reactive<Hokenryo>({
    seimei0: { kubun: 0, kingaku: "35000" },
    seimei1: { kubun: 1, kingaku: "36000" },
    seimei2: { kubun: 0, kingaku: "37000" },
    seimei3: { kubun: 1, kingaku: "38000" },
  });
  const kaigo = reactive<Hokenryo>({
    kaigo0: { kubun: 0, kingaku: "0" },
    kaigo1: { kubun: 0, kingaku: "0" },
  });
  const nenkin = reactive<Hokenryo>({
    nenkin0: { kubun: 0, kingaku: "0" },
    nenkin1: { kubun: 0, kingaku: "0" },
    nenkin2: { kubun: 0, kingaku: "0" },
    nenkin3: { kubun: 0, kingaku: "0" },
  });
  const seimeiAsum = ref("0");
  const seimeiBsum = ref("0");
  const seimeiAformula = ref("0");
  const seimeiBformula = ref("0");
  const seimeiTotal = ref("0");
  const seimeiAnswer = ref("0");
  const kaigoCsum = ref("0");
  const kaigoAnswer = ref("0");
  const nenkinDsum = ref("0");
  const nenkinEsum = ref("0");
  const nenkinDformula = ref("0");
  const nenkinEformula = ref("0");
  const nenkinTotal = ref("0");
  const nenkinAnswer = ref("0");
  const koujo = ref("0");

  //空文字をゼロに変換
  function no2(val: string) {
    const kingaku = String(val).replace(/\D/g, "");
    return kingaku === "" ? 0 : parseInt(kingaku, 10);
  }
  //計算式Ⅰ
  function formula1(val: number) {
    if (val <= 20000) {
      return +val;
    } else if (val <= 40000) {
      return Math.ceil(val / 2 + 10000);
    } else if (val <= 80000) {
      return Math.ceil(val / 4 + 20000);
    } else {
      return 40000;
    }
  }
  //計算式Ⅱ
  function formula2(val: number) {
    if (val <= 25000) {
      return +val;
    } else if (val <= 50000) {
      return Math.ceil(val / 2 + 12500);
    } else if (val <= 100000) {
      return Math.ceil(val / 4 + 25000);
    } else {
      return 50000;
    }
  }
  //控除額を計算する
  function calc() {
    //生命保険料
    let seimeiAsumTemp = 0;
    let seimeiBsumTemp = 0;
    for (let item in seimei) {
      if (seimei[item].kubun === 0) {
        seimeiAsumTemp += no2(seimei[item].kingaku);
      } else {
        seimeiBsumTemp += no2(seimei[item].kingaku);
      }
    }
    seimeiAsum.value = seimeiAsumTemp.toLocaleString("ja-JP");
    seimeiBsum.value = seimeiBsumTemp.toLocaleString("ja-JP");

    const seimeiAformulaTemp = formula1(seimeiAsumTemp);
    const seimeiBformulaTemp = formula2(seimeiBsumTemp);
    seimeiAformula.value = seimeiAformulaTemp.toLocaleString("ja-JP");
    seimeiBformula.value = seimeiBformulaTemp.toLocaleString("ja-JP");

    const seimeiTotalTemp =
      seimeiAformulaTemp + seimeiBformulaTemp > 40000
        ? 40000
        : seimeiAformulaTemp + seimeiBformulaTemp;
    const seimeiAnswerTemp =
      seimeiTotalTemp > seimeiBformulaTemp
        ? seimeiTotalTemp
        : seimeiBformulaTemp;
    seimeiTotal.value = seimeiTotalTemp.toLocaleString("ja-JP");
    seimeiAnswer.value = seimeiAnswerTemp.toLocaleString("ja-JP");

    //介護保険料
    let kaigoCsumTemp = 0;
    for (let item in kaigo) {
      if (kaigo[item].kubun === 0) {
        kaigoCsumTemp += no2(kaigo[item].kingaku);
      } else {
        kaigoCsumTemp += no2(kaigo[item].kingaku);
      }
    }
    kaigoCsum.value = kaigoCsumTemp.toLocaleString("ja-JP");

    const kaigoAnswerTemp = formula1(kaigoCsumTemp);
    kaigoAnswer.value = kaigoAnswerTemp.toLocaleString("ja-JP");

    //個人年金保険料
    let nenkinDsumTemp = 0;
    let nenkinEsumTemp = 0;
    for (let item in nenkin) {
      if (nenkin[item].kubun === 0) {
        nenkinDsumTemp += no2(nenkin[item].kingaku);
      } else {
        nenkinEsumTemp += no2(nenkin[item].kingaku);
      }
    }
    nenkinDsum.value = nenkinDsumTemp.toLocaleString("ja-JP");
    nenkinEsum.value = nenkinEsumTemp.toLocaleString("ja-JP");

    const nenkinDformulaTemp = formula1(nenkinDsumTemp);
    const nenkinEformulaTemp = formula2(nenkinEsumTemp);
    nenkinDformula.value = nenkinDformulaTemp.toLocaleString("ja-JP");
    nenkinEformula.value = nenkinEformulaTemp.toLocaleString("ja-JP");

    const nenkinTotalTemp =
      nenkinDformulaTemp + nenkinEformulaTemp > 40000
        ? 40000
        : nenkinDformulaTemp + nenkinEformulaTemp;
    const nenkinAnswerTemp =
      nenkinTotalTemp > nenkinEformulaTemp
        ? nenkinTotalTemp
        : nenkinEformulaTemp;
    nenkinTotal.value = nenkinTotalTemp.toLocaleString("ja-JP");
    nenkinAnswer.value = nenkinAnswerTemp.toLocaleString("ja-JP");

    //生命保険料控除額
    const koujoTemp = seimeiAnswerTemp + kaigoAnswerTemp + nenkinAnswerTemp;
    koujo.value = (koujoTemp > 120000 ? 120000 : koujoTemp).toLocaleString(
      "ja-JP"
    );
  }

  return {
    seimei,
    kaigo,
    nenkin,
    seimeiAsum,
    seimeiBsum,
    seimeiAformula,
    seimeiBformula,
    seimeiTotal,
    seimeiAnswer,
    kaigoCsum,
    kaigoAnswer,
    nenkinDsum,
    nenkinEsum,
    nenkinDformula,
    nenkinEformula,
    nenkinTotal,
    nenkinAnswer,
    koujo,
    calc,
  };
});
