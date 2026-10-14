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

## 活動報告の更新
`news.json` をGitHub上で開き、鉛筆アイコンで編集。先頭に1件追加してCommitするだけ。
```
{"date":"2026-10-20","title":"練習試合\nvs〇〇","image":"assets/news-4.jpg","url":""},
```
- 改行は `\n`、最後の1件以外は行末にカンマ
- url に Instagram 投稿などのリンクを入れるとタップで開きます

## ページ構成
index.html(TOP) / policy.html(指導方針) / facility.html(施設) / recruit.html(募集要項) / partner.html(パートナー) / news.html(活動報告一覧)
各ページの文章は、HTMLファイルを開いて「ここに入力」の部分を書き換えます。

## フォントの変更
`style.css` の一番上を編集します（Google Fontsで好きなフォントを選び、@importのURLと --font-display / --font-body の名前を差し替え）。

## 書き換えるところ
- `script.js` の一番上の `INSTAGRAM_URL` と `CONTACT_URL`（Googleフォーム等）を実際のURLに置換（全ページに反映）
- メニュー項目も `script.js` の上部で変更できます
