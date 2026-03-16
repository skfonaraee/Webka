const id=localStorage.getItem("currentDrama");
const drama=dramas.find(d=>d.id==id);
const c=document.getElementById("dramaContainer");

c.innerHTML=`
<h1>${drama.title} (${drama.year})</h1>
<img src="${drama.img}" style="width:300px">
<p>${drama.desc}</p>
<div class="tags">
${drama.genres.map(g=>`<span>${g}</span>`).join("")}
</div>
<button class="btn" onclick="addBookmark(${drama.id})">В закладки</button>
`;

function addBookmark(id){
  let b=JSON.parse(localStorage.getItem("bookmarks")||"[]");
  if(!b.includes(id)) b.push(id);
  localStorage.setItem("bookmarks",JSON.stringify(b));
}
