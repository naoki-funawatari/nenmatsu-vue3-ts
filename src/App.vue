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
  <main role="main" class="container">
    <div id="nenmatsu" class="main">
      <div class="sub">
        <h3>生命保険料控除</h3>
        <table class="table table-hover table-relative">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th colspan="6" class="cursorh" data-toggle="tooltip" data-placement="top" title="新・旧の区分">区分
              </th>
              <th colspan="6" class="cursorh" data-toggle="tooltip" data-placement="top"
                title="あなたが本年中に支払った保険料等の金額(分配を受けた剰余金等の控除後の金額)">保険料(a)</th>
            </tr>
          </thead>
          <tbody>
            <!-- 一般の生命保険料 -->
            <tr v-for="(item, label, idx) in seimei">
              <th v-if="idx === 0" v-bind:rowspan="seimeiIsShow ? Object.keys(seimei).length : 1"
                v-on:click="seimeiIsShow = !seimeiIsShow" class="hokenname align-middle">
                {{ seimeiIsShow ? '－' : '＋' }}　一般の生命保険料
              </th>
              <td colspan="6" v-if="seimeiIsShow || idx === 0">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label v-bind:class="'btn btn-outline-secondary' + (item.kubun === 0 ? ' active' : '')"
                    v-on:click="item.kubun = 0">
                    <input type="radio" value="0" autocomplete="off" />新
                  </label>
                  <label v-bind:class="'btn btn-outline-secondary' + (item.kubun === 1 ? ' active' : '')"
                    v-on:click="item.kubun = 1">
                    <input type="radio" value="1" autocomplete="off" />旧
                  </label>
                </div>
              </td>
              <td colspan="6" v-if="seimeiIsShow || idx === 0">
                <input type="tel" size="10" class="form-control" v-model="item.kingaku"
                  v-on:keyup="item.kingaku = no(item.kingaku)" />
              </td>
            </tr>
            <tr>
              <td>新保険料合計</td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="(a)のうち新保険料等の金額の合計額">A
              </td>
              <td colspan="2"><span>{{ seimeiAsum }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top"
                title="Aの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額">①</td>
              <td colspan="2"><span>{{ seimeiAformula }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="計（①＋②）">③
              </td>
              <td colspan="2"><span>{{ seimeiTotal }}円</span></td>
            </tr>
            <tr>
              <td>旧保険料合計</td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="(a)のうち旧保険料等の金額の合計額">B
              </td>
              <td colspan="2"><span>{{ seimeiBsum }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top"
                title="Bの金額を計算式Ⅱ(旧保険料等用)に当てはめて計算した金額">②</td>
              <td colspan="2"><span>{{ seimeiBformula }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="②と③のいずれか大きい金額">イ</td>
              <td colspan="2"><span>{{ seimeiAnswer }}円</span></td>
            </tr>
            <!-- 介護医療保険料 -->
            <tr v-for="(item, label, idx) in kaigo">
              <th v-if="idx === 0" v-bind:rowspan="kaigoIsShow ? Object.keys(kaigo).length : 1"
                v-on:click="kaigoIsShow = !kaigoIsShow" class="hokenname align-middle">
                {{ kaigoIsShow ? '－' : '＋' }}　介護医療保険料
              </th>
              <td colspan="6" v-if="kaigoIsShow || idx === 0"></td>
              <td colspan="6" v-if="kaigoIsShow || idx === 0">
                <input type="tel" size="10" class="form-control" v-model="item.kingaku"
                  v-on:keyup="item.kingaku = no(item.kingaku)" />
              </td>
            </tr>
            <tr>
              <td>保険料合計</td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="(a)の金額の合計額">C</td>
              <td colspan="2"><span>{{ kaigoCsum }}円</span></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top"
                title="Cの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額">ロ</td>
              <td colspan="2"><span>{{ kaigoAnswer }}円</span></td>
            </tr>
            <!-- 個人年金保険料 -->
            <tr v-for="(item, label, idx) in nenkin">
              <th v-if="idx === 0" v-bind:rowspan="nenkinIsShow ? Object.keys(nenkin).length : 1"
                v-on:click="nenkinIsShow = !nenkinIsShow" class="hokenname align-middle">
                {{ nenkinIsShow ? '－' : '＋' }}　個人年金保険料
              </th>
              <td colspan="6" v-if="nenkinIsShow || idx === 0">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label v-bind:class="'btn btn-outline-secondary' + (item.kubun === 0 ? ' active' : '')"
                    v-on:click="item.kubun = 0">
                    <input type="radio" value="0" autocomplete="off" />新
                  </label>
                  <label v-bind:class="'btn btn-outline-secondary' + (item.kubun === 1 ? ' active' : '')"
                    v-on:click="item.kubun = 1">
                    <input type="radio" value="1" autocomplete="off" />旧
                  </label>
                </div>
              </td>
              <td colspan="6" v-if="nenkinIsShow || idx === 0">
                <input type="tel" size="10" class="form-control" v-model="item.kingaku"
                  v-on:keyup="item.kingaku = no(item.kingaku)" />
              </td>
            </tr>
            <tr>
              <td>新保険料合計</td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="(a)のうち新保険料等の金額の合計額">D
              </td>
              <td colspan="2"><span>{{ nenkinDsum }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top"
                title="Dの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額">④</td>
              <td colspan="2"><span>{{ nenkinDformula }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="計（④＋⑤）">⑥
              </td>
              <td colspan="2"><span>{{ nenkinTotal }}円</span></td>
            </tr>
            <tr>
              <td>旧保険料合計</td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="(a)のうち旧保険料等の金額の合計額">E
              </td>
              <td colspan="2"><span>{{ nenkinEsum }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top"
                title="Eの金額を計算式Ⅱ(旧保険料等用)に当てはめて計算した金額">⑤</td>
              <td colspan="2"><span>{{ nenkinEformula }}円</span></td>
              <td colspan="2" class="cursorh" data-toggle="tooltip" data-placement="top" title="⑤と⑥のいずれか大きい金額">ハ</td>
              <td colspan="2"><span>{{ nenkinAnswer }}円</span></td>
            </tr>
            <tr>
              <th class="cursorh" data-toggle="tooltip" data-placement="top"
                title="生命保険料控除額計(イ＋ロ＋ハ)&#13;&#10;最高120,000円">生命保険料控除額</th>
              <td colspan="11"></td>
              <td>
                <span>{{ koujo }}円</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="13">
                <button type="button" class="btn btn-outline-secondary btn-lg btn-block" v-on:click="calc">計算する</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped lang="css">
.main {
  text-align: center;
}

.sub {
  display: inline-block;
}

.table {
  width: 650px;
}

input[type=tel] {
  text-align: right;
}

.cursorh {
  cursor: help;
}

.hokenname {
  cursor: pointer;
  text-align: left;
}
</style>
