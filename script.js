const images = [
  "https://picsum.photos/500/350?random=1",
  "https://picsum.photos/500/350?random=2",
  "https://picsum.photos/500/350?random=3",
  "https://picsum.photos/500/350?random=4",
  "https://picsum.photos/500/350?random=5",
  "https://picsum.photos/500/350?random=6",
  "https://picsum.photos/500/350?random=7",
  "https://picsum.photos/500/350?random=8",
  "https://picsum.photos/500/350?random=9",
  "https://picsum.photos/500/350?random=10"
];

const captions = [
  "🌈 Life is colorful","🔥 Feeling awesome","✨ Enjoy every moment",
  "💫 Dream big","💖 Spread happiness","😎 Chill vibes only",
  "🚀 Level up","🎉 Smile more","🌸 Peace & love","⚡ Energy mode ON"
];

function login() {
  const u = document.getElementById("username").value;
  if (!u) return alert("Enter username");
  localStorage.setItem("user", u);
  window.location = "home.html";
}

if(document.getElementById("welcome")){
  document.getElementById("welcome").innerText = 
    "Welcome " + localStorage.getItem("user") + " 🌟";

  if(!localStorage.getItem("posts")){
    let autoPosts = [];
    for(let i=0;i<8;i++){
      autoPosts.push({
        text: captions[Math.floor(Math.random()*captions.length)],
        image: images[Math.floor(Math.random()*images.length)],
        likes: Math.floor(Math.random()*50)
      });
    }
    localStorage.setItem("posts", JSON.stringify(autoPosts));
  }
}

function addPost(){
  const t = document.getElementById("postText").value;
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.unshift({
    text: t || captions[Math.floor(Math.random()*captions.length)],
    image: images[Math.floor(Math.random()*images.length)],
    likes:0
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  document.getElementById("postText").value = "";
  showPosts();
}

function showPosts(){
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  document.getElementById("posts").innerHTML = posts.map((p,i)=>`
    <div class="post">
      <p>${p.text}</p>
      <img src="${p.image}">
      <div class="like" onclick="likePost(${i})">❤️ ${p.likes}</div>
    </div>
  `).join("");
}

function likePost(i){
  const posts = JSON.parse(localStorage.getItem("posts"));
  posts[i].likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

showPosts();
