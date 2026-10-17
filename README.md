# 館林ベースボールクラブ HP

## 公開方法（GitHub Pages・無料）
1. GitHubで新しいリポジトリを作成し、このフォルダの中身をすべてアップロード
2. Settings → Pages → Branch を `main` / `/(root)` にして Save
3. 数分後に `https://ユーザー名.github.io/リポジトリ名/` で公開されます

## 写真・動画の入れ方（assets フォルダにアップロード）
| ファイル名 | 場所 |
|---|---|
| hero.mp4 | 最初の画面の動画（10〜20秒・音なし・5MB前後推奨） |
| hero-poster.jpg | 動画が読み込まれるまでの画像 |
| logo-white.png | 白ロゴ（透過PNG） |
| about-policy.jpg / about-facility.jpg / about-recruit.jpg | チームについての3枚 |
| policy.jpg / facility.jpg / recruit.jpg | 各ページ上部の写真 |
| news-bg.jpg | 活動報告の見出し背景 |
| news-1.jpg など | 活動報告のサムネイル |

## 活動報告の更新（本文つき）
`news.json` をGitHub上で開き、鉛筆アイコンで編集。一番上に1件追加してCommit。
```
{"id":"20261020-a","date":"2026-10-20","title":"練習試合\nvs〇〇","image":"assets/news-4.jpg","images":["assets/news-4-a.jpg"],"body":"本文1段落目\n本文2段落目"},
```
- id：他と重ならない半角英数字（日付＋a など）
- image：一覧のサムネイル / images：記事ページに並べる写真（省略可）
- body：本文。改行は `\n`。bodyが空だと記事ページは作られません
- url：入れるとInstagramなど外部リンクに飛びます（bodyより優先）
- 最後の1件以外は行末にカンマ、`"` は消さない

## ページ構成
index.html(TOP) / policy.html(指導方針) / facility.html(施設) / recruit.html(募集要項) / partner.html(パートナー) / news.html(活動報告一覧)
各ページの文章は、HTMLファイルを開いて「ここに入力」の部分を書き換えます。

## フォントの変更
`style.css` の一番上を編集します（Google Fontsで好きなフォントを選び、@importのURLと --font-display（英字）/ --font-head（日本語見出し）/ --font-body（本文）の名前を差し替え）。

## 書き換えるところ
- `script.js` の一番上の `INSTAGRAM_URL` と `CONTACT_URL`（Googleフォーム等）を実際のURLに置換（全ページに反映）
- メニュー項目も `script.js` の上部で変更できます

## 追加した画像・データ
- `assets/message.jpg`：「人生の主人公は君だ」の下の大きな写真（横長・1600px以上推奨）
- `partners.json`：協賛・パートナーのロゴ一覧。`assets/partner-1.png`（透過PNG・横長）を入れ、name / logo / url を編集。1社増やすときは1行コピー

## 背景画像
- `bg-message.jpg`：「人生の主人公は君だ」の背景（黒い膜が自動でかかります）
- `bg-cta.jpg`：一番下「JOIN US」の背景（任意）
横長1600px以上、1枚500KB前後を推奨。無い間は黒背景です。

## 各ページの写真（タイトルの黒背景に入ります。無いときは黒）
- `recruit.jpg`（募集要項・とくに大きく表示）/ `policy.jpg` / `facility.jpg` / `partner.jpg` / `news-page.jpg`
- `bg-partners.jpg`：TOPの協賛・パートナーズの背景
- 「人生の主人公は君だ」の文末には `logo-white.png` が表示されます

## デザインの調整のしかた（style.css）
GitHubで `style.css` を開き、鉛筆アイコンで編集 → Commit。ファイルの一番上にも同じ早見表があります。

### フォントを変える
1. https://fonts.google.com で好きなフォントを選ぶ → 「Get font」→「Get embed code」→「@import」を選ぶ
2. 表示された `@import url(...)` を、style.css の `@import` の行と差し替える
3. `:root` の中の名前を、選んだフォント名に変える
   - `--font-display`：英字・数字の見出し（例：Barlow Condensed）
   - `--font-head`：日本語の見出し（例：Noto Sans JP）
   - `--font-body`：本文
   日本語の候補：Zen Kaku Gothic New / M PLUS 1p / Shippori Mincho（明朝）など

### 文字の大きさ
`font-size:clamp(最小, 画面幅に比例, 最大)` の3つの数字を変えます。
例）`.h2` の `clamp(26px,4vw,44px)` → スマホは26px、PCは最大44px。大きくしたいなら `clamp(30px,5vw,56px)` など。
| 場所 | クラス名 |
|---|---|
| 各見出し | `.h2` |
| 人生の主人公は君だ | `.message h1` |
| 動画の上の英字 | `.hero-copy .en` |
| 下層ページの本文 | `.content p`（15px） |
| 理念の本文 | `.message p`（14px） |

### 文字間・行間・太さ
- 文字間：`letter-spacing`。`.02em`＝ほんの少し／`.1em`＝広め／`.2em`＝かなり広い／`-.01em`＝詰める
  見出しは `.h2` `.message h1`、小さな英字ラベルは `.eyebrow`、ボタンは `.btn`
- 行間：`line-height`。全体は `body`（1.9）、本文は `.message p` `.content p`（2.1）。大きいほどゆったり
- 太さ：`font-weight`。900＝極太／700＝太い／500＝やや太い／400＝標準

### 色・余白
- 色：`:root` の `--accent`（赤）`--black` `--paper`（薄グレー）
- 余白：各セクションの `padding:clamp(...)`（`.about` `.news` `.partners` `.message` `.cta`）

## ロゴの場所と大きさ
ロゴは2か所あり、ファイルも別です。どちらも透過PNG（白）で、無いときは表示されません。
| 場所 | ファイル | style.css のクラス |
|---|---|---|
| 動画の上（最初の画面） | `assets/hero-logo.png` | `.hero-logo` |
| 「人生の主人公は君だ」の文末 | `assets/logo-white.png` | `.msg-logo` |

### 動画の上のロゴ（.hero-logo）
```
.hero-logo{ left:50%; top:44%; transform:translate(-50%,-50%); width:clamp(70px,12vw,120px); }
```
- 位置：`left`（横）と `top`（縦）の%。`top:44%` を `30%` にすると上へ、`60%` にすると下へ
- 大きさ：`width` の3つの数字（スマホ最小・画面幅比例・PC最大）
- 左上に置きたいとき：`left:20px; top:90px; transform:none;` に書き換える
- 動画の上にロゴを出したくないとき：`hero-logo.png` をアップロードしない（または index.html の `<img class="hero-logo" ...>` の行を消す）

### 文末のロゴ（.msg-logo）
```
.msg-logo{ width:clamp(90px,13vw,140px); margin-top:36px; }
```
- 大きさ：`width`／上の文章との間隔：`margin-top`
- 中央に置く：`margin-left:auto; margin-right:auto;` を足す
- 右に置く：`margin-left:auto;` を足す

## 追加：戦績・選手ページ / 手描き文字
- メニューに「戦績」`results.html`「選手」`players.html` を追加。文章・行は各HTMLの「ここに入力」を書き換え、`<li>` の1行（または1枚）をコピーして増やします
- 選手の写真：`assets/player-1.jpg` 〜（縦長 3:4 推奨）。ページ上部の写真は `results.jpg` / `players.jpg`
- 「人生の主人公は君だ」の手描き文字：`assets/title-message.png`（白文字・透過PNG・横長）を入れると文字の代わりに表示。大きさは `style.css` の `.title-img` の `width:min(100%,clamp(300px,50vw,620px))`（最小・画面比例・最大）を調整。画像が無い間は通常の文字が出ます
- 下層ページのタイトル帯の高さは全ページ共通：`.phero` の `min-height`

## 戦績（年ごと）・選手（学年ごと）
- どちらも上にタブ（2026年／2025年…、1年生／2年生／3年生）が出て、タップで切り替わります。`results.html#y2025` `players.html#g2` のように、各タブへ直接リンクもできます。
- **戦績**：`results.json` に1試合ずつ追加。年は日付から自動でタブになり、年ごとの勝敗数も出ます。
  `{"date":"2026-10-11","title":"大会名","vs":"vs 相手","result":"win","score":"5-3"}`　result は win / lose / draw
- **選手**：`players.json` に1人ずつ追加。学年は grade（1〜3）でタブに自動で分かれます。
  `{"grade":1,"no":10,"name":"山田太郎","pos":"投手","photo":"assets/player-1-10.jpg"}`
- 行の間は `,`（カンマ）。最後の1行だけカンマなし。

## タイトル帯と本文の背景（画像の入れ方）
| ページ | タイトル帯の写真 | 本文の背景写真 |
|---|---|---|
| 指導方針 | policy.jpg | body-policy.jpg |
| 活動施設 | facility.jpg | body-facility.jpg |
| 6期生募集 | recruit.jpg | body-recruit.jpg |
| 戦績 | results.jpg | body-results.jpg |
| 選手 | players.jpg | body-players.jpg |
| パートナー | partner.jpg | body-partner.jpg |
| 活動報告一覧 | news-page.jpg | body-news.jpg |
- 活動報告の記事ページは、その記事の `image`（サムネイル）が自動でタイトル背景になります。
- 本文の背景は、写真が無いときは黒です。写真の上には黒い膜がかかり、文字は白になります。

## 練習生募集ページ（trainee.html / trainee.css）
- メニュー「練習生募集」から開きます。ページ専用のCSSは `trainee.css`（他のページには影響しません）
- 写真（assets に入れる。無いときは黒＋数字のデザインで表示されます）：
  `trainee.jpg`（最初の大きな写真）/ `trainee-1.jpg` `trainee-2.jpg` `trainee-3.jpg`（魅力の3枚・横長4:3）/ `trainee-next.jpg`（入団・背番号の背景）/ `trainee-cta.jpg`（最後の背景）
- 問い合わせボタンのリンク先は `script.js` の `CONTACT_URL`。未設定（初期値のまま）の間は、ボタンの下に注意書きが出ます
- 料金・活動日・文章は `trainee.html` の該当箇所を書き換えます
