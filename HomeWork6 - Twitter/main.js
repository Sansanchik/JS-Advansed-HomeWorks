renderPosts(getUsers(), getPosts());

function getUsers() {
  let users = fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json());
  return users;
};

function getPosts() {
  let posts = fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json());
  return posts;
}

function renderPosts(users, posts) {
  Promise.all([users, posts])
    .then(([users, posts]) => {
      console.log(users);
      console.log(posts);
      for (let post of posts) {
        let user = users.find(user => user.id === post.userId);
        renderPost({
          name: user.name,
          email: user.email,
          title: post.title,
          text: post.body,
          postId: post.id
        });
      }
    });
};

function renderPost({ name, title, text, postId, email }) {
  let post = document.createElement("div");
  post.classList.add("post");
  post.setAttribute("id", postId);
  post.innerHTML = `
      <div class="post-action-buttons">
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash-alt"></i>
      </div>
      <div class="post-avatar">
        <img src="http://pngimg.com/uploads/darth_vader/darth_vader_PNG3.png" alt="User">
      </div>
      <div class="post-body">
        <div class="post-name">${name}</div>
        <div class="post-email">${email}</div>
        <div class="post-title">${title}</div>
        <div class="post-text">${text}</div>
      </div>`;
  let container = document.querySelector(".container");
  container.prepend(post);
}

function showModal({ postTitle = "", postText = "", modalTitle = "Add post", buttonText = "Add post", actionType = "add", postId = "" }) {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("data-postId", postId);
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <form action="#" class="modal-form">
        <p class="modal-title">${modalTitle}</p>
        <ul class="flex-outer">
          <li>
            <label for="title">Post title</label>
            <input name="title" id="title" type="text">
          </li>
          <li>
            <label for="text">Post text</label>
            <textarea name="text" id="text" cols="30" rows="10">${postText}</textarea>
          </li>
        </ul>        
        <button type="submit" id="${actionType === "add" ? "add-post-btn" : "edit-post-btn"}">${buttonText}</button>
      </form>
    </div>`;
  document.body.append(modal);
  modal.querySelector("#title").value = postTitle;
}

// show modal
document.querySelector(".add-post-button").addEventListener("click", showModal);

// remove modal
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.closest(".modal").remove();
  }
});
// remove modal
window.addEventListener("click", (e) => {
  modal = document.querySelector(".modal");
  if (e.target == modal) {
    document.querySelector(".modal").remove();
  }
});

// add new post
window.addEventListener("click", (e) => {
  addPostBtn = document.querySelector("#add-post-btn");
  if (e.target == addPostBtn) {
    e.preventDefault();
    let post = {
      name: "Alexander",
      email: "Alexander@emaila.net",
      title: document.querySelector("#title").value,
      text: document.querySelector("#text").value
    };
    console.log(post);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          console.log(response.json());
          renderPost(post);
        }
      });
    e.target.closest(".modal").remove();
  }
});

// edit post
window.addEventListener("click", (e) => {
  let editPostBtn = document.querySelector("#edit-post-btn");
  if (e.target == editPostBtn) {
    e.preventDefault();
    let postId = e.target.closest(".modal").getAttribute("data-postId");
    console.log("TCL: postId", postId)
    let post = {
      name: "Alexander",
      title: document.querySelector("#title").value,
      text: document.querySelector("#text").value
    };
    console.log(post);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        console.log(response.json());
        if (response.ok) {
          // read value from inputs
          let postTitleText = document.querySelector("#title").value;
          let postTextText = document.querySelector("#text").value;
          e.target.closest(".modal").remove();

          //change existed post content
          let post = document.getElementById(`${postId}`);
          let postTitle = post.querySelector(`.post-title`);
          let postText = post.querySelector(`.post-text`);
          postTitle.innerHTML = postTitleText;
          postText.innerHTML = postTextText;
        }
      });
  }
});

// show edit post modal on button click
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-edit")) {
    let postId = e.target.closest(".post").getAttribute("id");
    console.log(postId);
    showModal({
      postTitle: e.target.closest(".post").querySelector(".post-title").innerHTML,
      postText: e.target.closest(".post").querySelector(".post-text").innerHTML,
      modalTitle: "Edit post",
      buttonText: "Edit post",
      actionType: "edit",
      postId
    })
  }
});

// delete post
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-alt")) {
    let postId = e.target.closest(".post").getAttribute("id");
    let post = document.getElementById(`${postId}`);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE'
    })
    .then (response => {
      if (response.ok) {
        post.remove();
      }
    })    
  }
})