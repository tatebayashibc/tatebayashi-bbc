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
