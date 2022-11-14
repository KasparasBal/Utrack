const thumbnails = document.querySelector(".article__thumbnails");
console.log(thumbnails);

const handleThumbnailHover = function (e) {
  if (e.target !== thumbnails) {
    //find the closest article thumbnail to the event
    const thumbnail = e.target.closest(".article__thumbnail");

    //get an array of children
    const thumbnailChildren = Array.from(thumbnail.children);

    //check which child has the desired class and give it effects
    thumbnailChildren.forEach((el) => {
      if (el.classList.contains("article__thumbnail-img-container")) {
        el.classList.contains("img_filter-none")
          ? el.classList.remove("img_filter-none")
          : el.classList.add("img_filter-none");
      }
    });
    thumbnail.classList.contains("lift")
      ? thumbnail.classList.remove("lift")
      : thumbnail.classList.add("lift");
  }
};

thumbnails.addEventListener("mouseover", handleThumbnailHover);
thumbnails.addEventListener("mouseout", handleThumbnailHover);
