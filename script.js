// お知らせはここを書き換えるだけで更新できます。
// date: 表示日付 / category: タグ / title: お知らせ本文 / url: 詳細リンク（不要なら空欄）
const newsItems = [
  { date: "YYYY.MM.DD", category: "INFO", title: "最新のお知らせをこちらに掲載します", url: "" },
  { date: "YYYY.MM.DD", category: "GAME", title: "試合結果・活動報告をこちらに掲載します", url: "" },
  { date: "YYYY.MM.DD", category: "JOIN", title: "体験参加・入団に関する情報をこちらに掲載します", url: "" }
];

const newsList = document.getElementById("news-list");
newsList.innerHTML = newsItems.map(item => {
  const title = item.url
    ? `<a class="news-title" href="${item.url}" target="_blank" rel="noopener">${item.title}</a>`
    : `<span class="news-title">${item.title}</span>`;
  return `<article class="news-item"><time class="news-date">${item.date}</time><span class="news-tag">${item.category}</span>${title}<span class="news-arrow">↗</span></article>`;
}).join("");

document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  nav.classList.toggle("open", open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
}));
