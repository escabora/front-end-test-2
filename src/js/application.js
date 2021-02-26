const init = () => {
  handleChangeSelect();
};

function handleChangeSelect() {
  const selects = document.querySelectorAll(".js--select");

  const checkSelects = () => {
    let count = 0;
    const params = [];
    selects.forEach((select) =>
      select.value === "Select..." ? count++ : params.push(select.value)
    );
    if (count === 0) fetchProducts(params);
  };

  selects.forEach((select) =>
    select.addEventListener("change", () => checkSelects())
  );
}

function fetchProducts(params) {
  loading("search");

  fetch(
    `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${params[0]}&water=${params[1]}&pets=${params[2]}`
  )
    .then((resp) => resp.json())
    .then((res) => {
      if (res.error) {
        loading("not-found");
        console.log("ERRO: ", res);
      } else {
        buildProducts(res);
      }
    });
}

function buildProducts(response) {
  const contentInsert = document.querySelector(".js--result");

  const products = response.map(
    (item, index) =>
      `<div class="ge-product-card ${
        index === 0 ? "ge-product-card--feature" : "ge-product-card--" + index
      }">
                <div class="ge-product-card__flag ${
                  item.staff_favorite === true ? "" : "is--hide"
                }">✨ Staff favorite</div>
                <div class="ge-product-card__image"><img src="${
                  item.url
                }" alt="${item.name}" /></div>
                <div class="ge-product-card__description">
                    <div>
                        <h2 class="ge-product-card__name">${item.name}</h2>
                    </div>
                    <div><ins class="ge-product-card__price">$${
                      item.price
                    }</ins>
                        <div class="ge-product-card__status"><svg>
                                <use xlink:href="#${
                                  item.toxicity === false ? "pet" : "toxic"
                                }"></use>
                            </svg><svg>
                                <use xlink:href="#${item.sun}"></use>
                            </svg><svg>
                                <use xlink:href="#${item.water}"></use>
                            </svg></div>
                    </div>
                </div>
            </div>`
  );

  contentInsert.innerHTML = "";
  contentInsert.insertAdjacentHTML("beforeend", products.join(""));
  loading("products-finish");
}

function loading(type) {
  const products = document.querySelector(".js--content-result");
  const notFound = document.querySelector(".js--not-found");

  setTimeout(() => {
    window.scrollTo(
      0,
      document.querySelector(".ge-selects").offsetHeight +
        document.querySelector(".ge-banner").offsetHeight
    );
  }, 100);

  switch (type) {
    case "search":
      products.classList.contains("is--hide")
        ? products.classList.remove("is--hide")
        : null;
      notFound.classList.contains("is--hide")
        ? null
        : notFound.classList.add("is--hide");
      break;
    case "products-finish":
      products.classList.contains("is--hide")
        ? products.classList.remove("is--hide")
        : null;
      notFound.classList.contains("is--hide")
        ? null
        : notFound.classList.add("is--hide");
      break;
    case "not-found":
      products.classList.contains("is--hide")
        ? null
        : products.classList.add("is--hide");
      notFound.classList.contains("is--hide")
        ? notFound.classList.remove("is--hide")
        : null;
      break;
    default:
      products.classList.contains("is--hide")
        ? null
        : products.classList.add("is--hide");
      notFound.classList.contains("is--hide")
        ? null
        : notFound.classList.add("is--hide");
  }
}

export default {
  init: init,
};
