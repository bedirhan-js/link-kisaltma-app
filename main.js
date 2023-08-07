const btn = document.getElementById("kisalt");
const input = document.getElementById("original-link");
const shortLinkText = document.getElementById("short-link");
const kisaltilanlarDiv = document.getElementById("kisaltilanlar");

let kisaltilanlar = JSON.parse(localStorage.getItem("kisaltilanlar")) || [];

function shortLink(url) {
  return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then((response) => response.json())
    .then((data) => (data.ok ? data.result.short_link2 : ""));
}

btn.addEventListener("click", () => {
  const url = input.value;
  shortLink(url).then((shortLink) => {
    if (shortLink) {
      kisaltilanlar.push({ originalLink: url, shortLink: shortLink });

      localStorage.setItem("kisaltilanlar", JSON.stringify(kisaltilanlar));
      showKisaltilanlar();
      url = "";
    } else {
      alert("Link kısaltma başarısız oldu");
    }
  });
});

function showKisaltilanlar() {
  kisaltilanlarDiv.innerHTML = "";
  kisaltilanlar.forEach((link, index) => {
    const linkDiv = document.createElement("div");
    linkDiv.classList.add("kisaltilan-link");
    linkDiv.innerHTML = `        
          <p class="link-text">
            <a href="javascript:void(0);"
              >Eski link:
              <span>${link.originalLink}</span></a
            >
          </p>
          <p class="link-text"><a href="${link.shortLink}" target="_blank">Yeni link: <span>${link.shortLink}</span></a></p>     <p> <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path onClick="copyLink(${index})" d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg></p>
      <p><svg class="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path onClick="deleteLink(${index})" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></p>
    `;
    kisaltilanlarDiv.appendChild(linkDiv);
  });
  kisaltilanlarDiv.style.opacity = 1;
}

function copyLink(index) {
  const shortLink = kisaltilanlar[index].shortLink;

  navigator.clipboard
    .writeText(shortLink)
    .then(() => {
      alert("Link kopyalandı: " + shortLink);
    })
    .catch(() => {
      console.log("kopyalanamadı");
    });
}

function deleteLink(index) {
  kisaltilanlar.splice(index, 1);
  localStorage.setItem("kisaltilanlar", JSON.stringify(kisaltilanlar));
  showKisaltilanlar();
}

document.addEventListener("DOMContentLoaded", () => {
  showKisaltilanlar();
});
