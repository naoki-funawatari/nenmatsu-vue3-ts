# プロジェクト概要

筆者がおそらく 5 年以上 (?) 前に作ったであろう生命保険料控除を計算するアプリ。（[コレ](https://github.com/naoki-funawatari/nenmatsu/blob/main/index.html)）  
ただの HTML に CDN で読み込まれた Vue。  
JavaScript で書かれ文字列と数値の入り混じったロジック。
Bootstrap 臭のプンプンに漂った UI。  
このお世辞にもイケているとは言い難いアプリをみて、正直嫉妬した。

溢あふれているッ  
　　　創作意欲にッッ･･･!!!

負けていられない。  
打ち克たねば、過去の自分にッ  
圧倒的な技術力を以てッッ･･･!!!

このプロジェクトは―――筆者がこれまで培ってきた経験を活用し、[コレ](https://github.com/naoki-funawatari/nenmatsu/blob/main/index.html)を Vue3 にてリプレイスするものである。

# 技術スタック

## 5 年前版

- JavaScript
  - Vue2（CDN 版）
    - Options API
  - jQuery（ツールチップ表示）
- CSS
  - Bootstrap
- HTML

## リプレイス版

- Vite
- Vue3
  - Composition API
  - Vuetify
  - Pinia
  - TypeScript
- ~~JavaScript~~
  - ~~jQuery（ツールチップ表示）~~
    - ~~あとで消したい~~
- CSS
  - ~~Bootstrap~~
    - ~~あとで消したい~~

# 機能

## 生命保険料控除の算出

生命保険料控除の算出を行う。  
以上。

# リプレイスの流れ

- とりあえず Vue3 アプリに置き換える。  
  動けばよいというスタンス。
- UI コンポーネントとして Vuetify を導入。
- データ、ロジックを Store に移動。
- ストアのロジックを整理中。
