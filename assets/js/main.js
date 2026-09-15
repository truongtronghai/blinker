const itervalId = setInterval(() => {
  const left = document.getElementById("left");
  const right = document.getElementById("right");

  if (left.classList.contains("on")) {
    left.classList.remove("on");
    right.classList.add("on");
  } else {
    left.classList.add("on");
    right.classList.remove("on");
  }
}, 500);
