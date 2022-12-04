<script setup lang="ts">
import { reactive, ref } from 'vue'

type Hokenryo = {
  [key: string]: {
    kubun: number,
    kingaku: string
  }
}

const seimeiIsShow = ref(false)
const kaigoIsShow = ref(false)
const nenkinIsShow = ref(false)
const seimei = reactive<Hokenryo>({
  seimei0: { kubun: 0, kingaku: "0" },
  seimei1: { kubun: 0, kingaku: "0" },
  seimei2: { kubun: 0, kingaku: "0" },
  seimei3: { kubun: 0, kingaku: "0" },
})
const kaigo = reactive<Hokenryo>({
  kaigo0: { kubun: 0, kingaku: "0" },
  kaigo1: { kubun: 0, kingaku: "0" },
})
const nenkin = reactive<Hokenryo>({
  nenkin0: { kubun: 0, kingaku: "0" },
  nenkin1: { kubun: 0, kingaku: "0" },
  nenkin2: { kubun: 0, kingaku: "0" },
  nenkin3: { kubun: 0, kingaku: "0" },
})
const seimeiAsum = ref("0")
const seimeiBsum = ref("0")
const seimeiAformula = ref("0")
const seimeiBformula = ref("0")
const seimeiTotal = ref("0")
const seimeiAnswer = ref("0")
const kaigoCsum = ref("0")
const kaigoAnswer = ref("0")
const nenkinDsum = ref("0")
const nenkinEsum = ref("0")
const nenkinDformula = ref("0")
const nenkinEformula = ref("0")
const nenkinTotal = ref("0")
const nenkinAnswer = ref("0")
const koujo = ref("0")

//数字のみ入力可能
function no(val: string) {
  const kingaku = String(val).replace(/\D/g, "");
  return kingaku === "" ? ""
    : `${parseInt(kingaku, 10)}`;
}
//空文字をゼロに変換
function no2(val: string) {
  const kingaku = String(val).replace(/\D/g, "");
  return kingaku === "" ? 0
    : parseInt(kingaku, 10);
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

  const seimeiTotalTemp = seimeiAformulaTemp + seimeiBformulaTemp > 40000 ? 40000 : seimeiAformulaTemp + seimeiBformulaTemp;
  const seimeiAnswerTemp = seimeiTotalTemp > seimeiBformulaTemp ? seimeiTotalTemp : seimeiBformulaTemp;
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

  const nenkinTotalTemp = nenkinDformulaTemp + nenkinEformulaTemp > 40000 ? 40000 : nenkinDformulaTemp + nenkinEformulaTemp;
  const nenkinAnswerTemp = nenkinTotalTemp > nenkinEformulaTemp ? nenkinTotalTemp : nenkinEformulaTemp;
  nenkinTotal.value = nenkinTotalTemp.toLocaleString("ja-JP");
  nenkinAnswer.value = nenkinAnswerTemp.toLocaleString("ja-JP");

  //生命保険料控除額
  const koujoTemp = seimeiAnswerTemp + kaigoAnswerTemp + nenkinAnswerTemp
  koujo.value = (koujoTemp > 120000 ? 120000 : koujoTemp).toLocaleString("ja-JP");
}
</script>

<template>
  <h1 class="title">生命保険料控除</h1>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="table-header-cell">#</th>
          <th colspan="6" class="cursorh table-header-cell">
            <span>区分</span>
            <v-tooltip activator="parent" location="top">
              新・旧の区分
            </v-tooltip>
          </th>
          <th colspan="6" class="cursorh table-header-cell">
            <span>保険料(a)</span>
            <v-tooltip activator="parent" location="top">
              あなたが本年中に支払った保険料等の金額(分配を受けた剰余金等の控除後の金額)
            </v-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 一般の生命保険料 -->
        <tr v-for="(item, label, idx) in seimei">
          <th v-if="idx === 0" v-bind:rowspan="seimeiIsShow ? Object.keys(seimei).length : 1"
            v-on:click="seimeiIsShow = !seimeiIsShow" class="hokenname">
            {{ seimeiIsShow ? '－' : '＋' }}　一般の生命保険料
          </th>
          <td colspan="6" v-if="seimeiIsShow || idx === 0">
            <v-card flat>
              <v-card-text :class="'v-card-text'">
                <v-row :align="'center'" justify="center">
                  <v-btn-toggle v-model="item.kubun" mandatory>
                    <v-btn :active="(item.kubun == 0)" v-on:click="item.kubun = 0">
                      新
                    </v-btn>
                    <v-btn :active="(item.kubun == 1)" v-on:click="item.kubun = 1">
                      旧
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
              </v-card-text>
            </v-card>
          </td>
          <td colspan="6" v-if="seimeiIsShow || idx === 0" class="text-right">
            <v-text-field solo type="tel" size="10" v-model="item.kingaku" v-on:keyup="item.kingaku = no(item.kingaku)"
              hide-details></v-text-field>
          </td>
        </tr>
        <tr>
          <td>新保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>A</span>
            <v-tooltip activator="parent" location="top">
              (a)のうち新保険料等の金額の合計額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ seimeiAsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>①</span>
            <v-tooltip activator="parent" location="top">
              Aの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ seimeiAformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>③</span>
            <v-tooltip activator="parent" location="top">
              計（①＋②）
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ seimeiTotal }}円</span></td>
        </tr>
        <tr>
          <td>旧保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>B</span>
            <v-tooltip activator="parent" location="top">
              (a)のうち旧保険料等の金額の合計額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ seimeiBsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>②</span>
            <v-tooltip activator="parent" location="top">
              Bの金額を計算式Ⅱ(旧保険料等用)に当てはめて計算した金額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ seimeiBformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>イ</span>
            <v-tooltip activator="parent" location="top">
              ②と③のいずれか大きい金額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ seimeiAnswer }}円</span></td>
        </tr>
        <!-- 介護医療保険料 -->
        <tr v-for="(item, label, idx) in kaigo">
          <th v-if="idx === 0" v-bind:rowspan="kaigoIsShow ? Object.keys(kaigo).length : 1"
            v-on:click="kaigoIsShow = !kaigoIsShow" class="hokenname">
            {{ kaigoIsShow ? '－' : '＋' }}　介護医療保険料
          </th>
          <td colspan="6" v-if="kaigoIsShow || idx === 0"></td>
          <td colspan="6" v-if="kaigoIsShow || idx === 0">
            <v-text-field solo type="tel" size="10" v-model="item.kingaku" v-on:keyup="item.kingaku = no(item.kingaku)"
              hide-details></v-text-field>
          </td>
        </tr>
        <tr>
          <td>保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>C</span>
            <v-tooltip activator="parent" location="top">
              (a)の金額の合計額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ kaigoCsum }}円</span></td>
          <td colspan="2"></td>
          <td colspan="2"></td>
          <td colspan="2" class="cursorh">
            <span>ロ</span>
            <v-tooltip activator="parent" location="top">
              Cの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ kaigoAnswer }}円</span></td>
        </tr>
        <!-- 個人年金保険料 -->
        <tr v-for="(item, label, idx) in nenkin">
          <th v-if="idx === 0" v-bind:rowspan="nenkinIsShow ? Object.keys(nenkin).length : 1"
            v-on:click="nenkinIsShow = !nenkinIsShow" class="hokenname">
            {{ nenkinIsShow ? '－' : '＋' }}　個人年金保険料
          </th>
          <td colspan="6" v-if="nenkinIsShow || idx === 0">
            <v-card flat>
              <v-card-text :class="'v-card-text'">
                <v-row :align="'center'" justify="center">
                  <v-btn-toggle v-model="item.kubun" mandatory>
                    <v-btn :active="(item.kubun == 0)" v-on:click="item.kubun = 0">
                      新
                    </v-btn>
                    <v-btn :active="(item.kubun == 1)" v-on:click="item.kubun = 1">
                      旧
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
              </v-card-text>
            </v-card>
          </td>
          <td colspan="6" v-if="nenkinIsShow || idx === 0">
            <v-text-field solo type="tel" size="10" v-model="item.kingaku" v-on:keyup="item.kingaku = no(item.kingaku)"
              hide-details></v-text-field>
          </td>
        </tr>
        <tr>
          <td>新保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>D</span>
            <v-tooltip activator="parent" location="top">
              (a)のうち新保険料等の金額の合計額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ nenkinDsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>④</span>
            <v-tooltip activator="parent" location="top">
              Dの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ nenkinDformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>⑥</span>
            <v-tooltip activator="parent" location="top">
              計（④＋⑤）
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ nenkinTotal }}円</span></td>
        </tr>
        <tr>
          <td>旧保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>E</span>
            <v-tooltip activator="parent" location="top">
              (a)のうち旧保険料等の金額の合計額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ nenkinEsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>⑤</span>
            <v-tooltip activator="parent" location="top">
              Eの金額を計算式Ⅱ(旧保険料等用)に当てはめて計算した金額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ nenkinEformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>ハ</span>
            <v-tooltip activator="parent" location="top">
              ⑤と⑥のいずれか大きい金額
            </v-tooltip>
          </td>
          <td colspan="2"><span>{{ nenkinAnswer }}円</span></td>
        </tr>
        <tr>
          <th class="cursorh">
            <span>生命保険料控除額</span>
            <v-tooltip activator="parent" location="top">
              生命保険料控除額計(イ＋ロ＋ハ)&#13;&#10;最高120,000円
            </v-tooltip>
          </th>
          <td colspan="11"></td>
          <td>
            <span>{{ koujo }}円</span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="13" class="px-0">
            <div class="d-flex flex-column">
              <v-btn v-on:click="calc" variant="outlined" color="secondary">
                計算する
              </v-btn>
            </div>
          </td>
        </tr>
      </tfoot>
    </template>
  </v-table>
</template>

<style scoped lang="scss">
.title,
.v-table {
  width: 650px;
}

.title {
  text-align: center;
}

.table-header-cell {
  color: #fff;
  background-color: #212529;
}

.cursorh {
  cursor: help;
}

:deep(input) {
  &[type="tel"] {
    text-align: right;
  }
}
</style>
