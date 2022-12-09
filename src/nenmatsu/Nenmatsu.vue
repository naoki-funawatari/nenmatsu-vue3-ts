<script setup lang="ts">
import { useNenmatsuStore } from './nenmatsu.store'
import MyNumberField from '../components/my-number-field.vue'
import { ref } from 'vue';

const seimeiIsShow = ref(true);
const kaigoIsShow = ref(false);
const nenkinIsShow = ref(false);
const nenmatsuStore = useNenmatsuStore()
</script>

<template>
  <h1 class="title">生命保険料控除</h1>
  <VTable>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="table-header-cell">#</th>
          <th colspan="6" class="cursorh table-header-cell">
            <span>区分</span>
            <VTooltip activator="parent" location="top">
              新・旧の区分
            </VTooltip>
          </th>
          <th colspan="6" class="cursorh table-header-cell">
            <span>保険料(a)</span>
            <VTooltip activator="parent" location="top">
              あなたが本年中に支払った保険料等の金額(分配を受けた剰余金等の控除後の金額)
            </VTooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 一般の生命保険料 -->
        <tr v-for="(item, index) in nenmatsuStore.seimei">
          <th v-if="index === 0" v-bind:rowspan="seimeiIsShow ? nenmatsuStore.seimei.length : 1"
            v-on:click="seimeiIsShow = !seimeiIsShow" class="hokenname">
            {{ seimeiIsShow ? '－' : '＋' }}　一般の生命保険料
          </th>
          <td colspan="6" v-if="seimeiIsShow || index === 0">
            <VCard flat>
              <VCardText>
                <VRow>
                  <VBtnToggle>
                    <VBtn :active="(item.kubun == 0)" v-on:click="item.kubun = 0">
                      新
                    </VBtn>
                    <VBtn :active="(item.kubun == 1)" v-on:click="item.kubun = 1">
                      旧
                    </VBtn>
                  </VBtnToggle>
                </VRow>
              </VCardText>
            </VCard>
          </td>
          <td colspan="6" v-if="seimeiIsShow || index === 0">
            <MyNumberField v-model="item.kingaku" />
          </td>
        </tr>
        <tr>
          <td>新保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>A</span>
            <VTooltip activator="parent" location="top">
              (a)のうち新保険料等の金額の合計額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.seimeiAsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>①</span>
            <VTooltip activator="parent" location="top">
              Aの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.seimeiAformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>③</span>
            <VTooltip activator="parent" location="top">
              計（①＋②）
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.seimeiTotal }}円</span></td>
        </tr>
        <tr>
          <td>旧保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>B</span>
            <VTooltip activator="parent" location="top">
              (a)のうち旧保険料等の金額の合計額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.seimeiBsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>②</span>
            <VTooltip activator="parent" location="top">
              Bの金額を計算式Ⅱ(旧保険料等用)に当てはめて計算した金額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.seimeiBformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>イ</span>
            <VTooltip activator="parent" location="top">
              ②と③のいずれか大きい金額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.seimeiAnswer }}円</span></td>
        </tr>
        <!-- 介護医療保険料 -->
        <tr v-for="(item, index) in nenmatsuStore.kaigo">
          <th v-if="index === 0" v-bind:rowspan="kaigoIsShow ? nenmatsuStore.kaigo.length : 1"
            v-on:click="kaigoIsShow = !kaigoIsShow" class="hokenname">
            {{ kaigoIsShow ? '－' : '＋' }}　介護医療保険料
          </th>
          <td colspan="6" v-if="kaigoIsShow || index === 0"></td>
          <td colspan="6" v-if="kaigoIsShow || index === 0">
            <MyNumberField v-model="item.kingaku" />
          </td>
        </tr>
        <tr>
          <td>保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>C</span>
            <VTooltip activator="parent" location="top">
              (a)の金額の合計額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.kaigoCsum }}円</span></td>
          <td colspan="2"></td>
          <td colspan="2"></td>
          <td colspan="2" class="cursorh">
            <span>ロ</span>
            <VTooltip activator="parent" location="top">
              Cの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.kaigoAnswer }}円</span></td>
        </tr>
        <!-- 個人年金保険料 -->
        <tr v-for="(item, index) in nenmatsuStore.nenkin">
          <th v-if="index === 0" v-bind:rowspan="nenkinIsShow ? nenmatsuStore.nenkin.length : 1"
            v-on:click="nenkinIsShow = !nenkinIsShow" class="hokenname">
            {{ nenkinIsShow ? '－' : '＋' }}　個人年金保険料
          </th>
          <td colspan="6" v-if="nenkinIsShow || index === 0">
            <VCard flat>
              <VCardText :class="'v-card-text'">
                <VRow :align="'center'" justify="center">
                  <VBtnToggle v-model="item.kubun" mandatory>
                    <VBtn :active="(item.kubun == 0)" v-on:click="item.kubun = 0">
                      新
                    </VBtn>
                    <VBtn :active="(item.kubun == 1)" v-on:click="item.kubun = 1">
                      旧
                    </VBtn>
                  </VBtnToggle>
                </VRow>
              </VCardText>
            </VCard>
          </td>
          <td colspan="6" v-if="nenkinIsShow || index === 0">
            <MyNumberField v-model="item.kingaku" />
          </td>
        </tr>
        <tr>
          <td>新保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>D</span>
            <VTooltip activator="parent" location="top">
              (a)のうち新保険料等の金額の合計額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.nenkinDsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>④</span>
            <VTooltip activator="parent" location="top">
              Dの金額を計算式Ⅰ(新保険料等用)に当てはめて計算した金額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.nenkinDformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>⑥</span>
            <VTooltip activator="parent" location="top">
              計（④＋⑤）
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.nenkinTotal }}円</span></td>
        </tr>
        <tr>
          <td>旧保険料合計</td>
          <td colspan="2" class="cursorh">
            <span>E</span>
            <VTooltip activator="parent" location="top">
              (a)のうち旧保険料等の金額の合計額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.nenkinEsum }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>⑤</span>
            <VTooltip activator="parent" location="top">
              Eの金額を計算式Ⅱ(旧保険料等用)に当てはめて計算した金額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.nenkinEformula }}円</span></td>
          <td colspan="2" class="cursorh">
            <span>ハ</span>
            <VTooltip activator="parent" location="top">
              ⑤と⑥のいずれか大きい金額
            </VTooltip>
          </td>
          <td colspan="2"><span>{{ nenmatsuStore.nenkinAnswer }}円</span></td>
        </tr>
        <tr>
          <th class="cursorh">
            <span>生命保険料控除額</span>
            <VTooltip activator="parent" location="top">
              生命保険料控除額計(イ＋ロ＋ハ)&#13;&#10;最高120,000円
            </VTooltip>
          </th>
          <td colspan="11"></td>
          <td>
            <span>{{ nenmatsuStore.koujo }}円</span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="13" class="px-0">
            <div class="d-flex flex-column">
              <VBtn v-on:click="nenmatsuStore.calc" variant="outlined" color="secondary">
                計算する
              </VBtn>
            </div>
          </td>
        </tr>
      </tfoot>
    </template>
  </VTable>
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
</style>
