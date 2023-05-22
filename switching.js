(()=>{
    "use strict";
    var t = {
        630: (t,e,s)=>{
            s.r(e)
        }
        ,
        554: function(t, e, s) {
            var i = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            const n = i(s(660));
            e.default = class {
                constructor(t, e, s) {
                    this.category = t,
                    this.startIndex = e,
                    this.maxResults = s,
                    this.setParams(t, e, s),
                    this.apiUrl = "https://www.googleapis.com/books/v1/volumes?"
                }
                setParams(t, e, s) {
                    const i = new URLSearchParams;
                    return i.append("q", `"subject:${t}"`),
                    i.append("key", n.default.BOOKS_API_KEY),
                    i.append("printType", "books"),
                    i.append("startIndex", e.toString()),
                    i.append("maxResults", s.toString()),
                    this.params = i,
                    i
                }
                async getBooks() {
                    return (await fetch(`${this.apiUrl}${this.params ? this.params : ""}`)).json()
                }
            }
        },
        407: function(t, e, s) {
            var i = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            const n = i(s(554))
              , o = s(755)
              , r = i(s(515))
              , a = i(s(821))
              , d = JSON.parse(window.localStorage.getItem("cart") ?? "[]")
              , l = new r.default(d)
              , c = document.getElementById("bookList")
              , h = document.getElementById("sidebar")
              , u = (0,
            o.getCategory)(h)
              , m = new n.default(u,0,6)
              , _ = document.getElementById("loadMoreBtn");
            _.addEventListener("click", (()=>{
                const t = parseInt(_.dataset.startIndex ? _.dataset.startIndex : "0");
                m.setParams((0,
                o.getCategory)(h), t, 6),
                m.getBooks().then((e=>{
                    (0,
                    o.bookListRender)(e, c, l),
                    _.dataset.startIndex = (t + 6).toString()
                }
                ))
            }
            )),
            m.getBooks().then((t=>{
                (0,
                o.bookListRender)(t, c, l),
                _.dataset.startIndex = "6"
            }
            )),
            new a.default(m,c,l).render()
        },
        821: (t,e,s)=>{
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            const i = s(755);
            e.default = class {
                constructor(t, e, s) {
                    this.links = ["Architecture", "Art & Fashion", "Biography", "Business", "Crafts & Hobbies", "Drama", "Fiction", "Food & Drink", "Health & Wellbeing", "History & Politics", "Humor", "Poetry", "Psychology", "Science", "Technology", "Travel & Maps"],
                    this.active = 0,
                    this.loader = t,
                    this.bookList = e,
                    this.cart = s
                }
                render() {
                    const t = document.getElementById("sidebar");
                    t.innerHTML = "";
                    const e = document.getElementById("loadMoreBtn");
                    for (let s = 0; s < this.links.length; s++) {
                        const n = document.createElement("li");
                        n.classList.add("sidebar__link"),
                        n.innerText = this.links[s],
                        s === this.active ? (n.classList.add("sidebar__link__active"),
                        t.dataset.category = this.links[s]) : (this.bookList.innerHTML = "",
                        n.addEventListener("click", (t=>{
                            this.loader.setParams(this.links[s], 0, 6),
                            this.loader.getBooks().then((t=>{
                                (0,
                                i.bookListRender)(t, this.bookList, this.cart),
                                e.dataset.startIndex = "6"
                            }
                            )),
                            this.active = s,
                            this.render()
                        }
                        ))),
                        t.appendChild(n)
                    }
                }
            }
        }
        ,
        466: ()=>{
            const t = document.getElementById("sliderImg")
              , e = document.getElementById("sliderControls");
            new class {
                constructor(t, e, s) {
                    this.items = t,
                    this.currentItem = this.items[0],
                    this.element = e,
                    this.controls = s,
                    this.initControls(),
                    this.setImage(),
                    this.intervalId = setInterval((()=>{
                        this.switchItem()
                    }
                    ), 5e3)
                }
                getNextItem(t) {
                    t || (t = this.currentItem.id + 1);
                    return this.items.find((e=>e.id === t)) || this.items[0]
                }
                initControls() {
                    for (let t of this.items) {
                        const e = document.createElement("a");
                        e.classList.add("slider__control"),
                        e.id = `slide-${t.id}`,
                        e.addEventListener("click", (()=>{
                            this.switchItem(t.id),
                            clearInterval(this.intervalId),
                            this.intervalId = setInterval((()=>{
                                this.switchItem()
                            }
                            ), 5e3)
                        }
                        )),
                        this.controls.appendChild(e)
                    }
                    this.controls.firstElementChild?.classList.add("slider__control__active")
                }
                switchItem(t) {
                    const e = this.getNextItem(t);
                    document.getElementById(`slide-${this.currentItem.id}`).classList.remove("slider__control__active"),
                    this.currentItem = e,
                    document.getElementById(`slide-${this.currentItem.id}`).classList.add("slider__control__active"),
                    this.setImage()
                }
                setImage() {
                    this.element.src = this.currentItem.src,
                    this.element.style.animation = "none",
                    this.element.offsetHeight,
                    this.element.style.animation = "fade-in 2s"
                }
            }
            ([{
                id: 1,
                src: "./static/img/slider/banner.png"
            }, {
                id: 2,
                src: "./static/img/slider/banner 2.png"
            }, {
                id: 3,
                src: "./static/img/slider/banner 3.png"
            }],t,e)
        }
        ,
        545: (t,e)=>{
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Book = void 0,
            e.Book = class {
                constructor(t, e, s, i, n, o, r, a, d, l, c) {
                    this.isInCart = !1,
                    this.id = t,
                    this.authors = o ? o.join(", ") : "",
                    this.title = e,
                    this.description = n || "",
                    this.imgSrc = i,
                    this.saleability = "FOR_SALE" === s,
                    s && l && c && (this.price = l,
                    this.currency = c),
                    this.rating = r,
                    this.ratingsCount = a,
                    this.cart = d,
                    this.isInCart = d.isInCart(this.id)
                }
                render() {
                    const t = document.createElement("div");
                    t.innerHTML = `\n    <div class="book">\n            <div class="book__poster">\n              <img\n                src="${this.imgSrc}"\n                alt="${this.title}"\n                width="212"\n                height="auto"\n              />\n            </div>\n            <div class="book__details">\n              <div class="book__author">${this.authors}</div>\n              <div class="book__title">${this.title}</div>\n              <div class="book__rating">\n                <div class="book__rating__stars" style="--rating: ${this.rating ? this.rating : 0}"></div>\n                <div class="book__rating__reviews">${this.ratingsCount ? this.ratingsCount : 0} review</div>\n              </div>\n              <div class="book__description">\n              ${this.description.substring(0, 100)}${this.description.length > 100 ? "..." : ""}\n              </div>\n              <div class="book__price">${this.saleability ? [this.price, this.currency].join(" ") : "NOT FOR SALE"}</div>\n              <button class="btn ${this.isInCart ? "btn__secondary" : "btn__primary"}" id="book__${this.id}" ${this.saleability ? "" : "disabled"}>${this.isInCart ? "In the cart" : "Buy now"}</button>\n            </div>\n          </div>\n    `;
                    const e = t.querySelector(`#book__${this.id}`);
                    return this.addToCartClick(e),
                    t
                }
                addToCartClick(t) {
                    t?.addEventListener("click", (()=>{
                        const t = document.getElementById(`book__${this.id}`);
                        this.isInCart ? (this.removeFromCart(),
                        t.classList.replace("btn__secondary", "btn__primary"),
                        t.innerText = "Buy now") : (this.addToCart(),
                        t.classList.replace("btn__primary", "btn__secondary"),
                        t.innerText = "In the cart")
                    }
                    ))
                }
                addToCart() {
                    this.cart.isInCart(this.id) || this.cart.add(this.id),
                    this.isInCart = !0
                }
                removeFromCart() {
                    this.cart.remove(this.id),
                    this.isInCart = !1
                }
            }
        }
        ,
        515: (t,e)=>{
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = class {
                constructor(t) {
                    this.bookIds = [],
                    this.bookIds = t,
                    this.itemsElement = document.getElementById("basketItems"),
                    this.updateStorage()
                }
                isInCart(t) {
                    return this.bookIds.includes(t)
                }
                add(t) {
                    this.bookIds.push(t),
                    this.updateStorage()
                }
                remove(t) {
                    const e = this.bookIds.indexOf(t);
                    e > -1 && (this.bookIds.splice(e, 1),
                    this.updateStorage())
                }
                updateStorage() {
                    window.localStorage.setItem("cart", JSON.stringify(this.bookIds));
                    const t = this.bookIds.length;
                    t ? (this.itemsElement.setAttribute("style", "display: flex;"),
                    this.itemsElement.innerText = t.toString()) : (this.itemsElement.setAttribute("style", "display: none;"),
                    this.itemsElement.innerText = "")
                }
            }
        }
        ,
        660: (t,e)=>{
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = {
                BOOKS_API_KEY: ""
            }
        }
        ,
        755: (t,e,s)=>{
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.getCategory = e.bookListRender = void 0;
            const i = s(545);
            e.bookListRender = function(t, e, s) {
                const n = t.items;
                if (n && n.length) {
                    const t = [];
                    for (let e of n) {
                        let n = e.volumeInfo.imageLinks ? e.volumeInfo.imageLinks.thumbnail : "https://picsum.photos/220/340";
                        t.push(new i.Book(e.id,e.volumeInfo.title,e.saleInfo.saleability,n,e.volumeInfo.description,e.volumeInfo.authors,e.volumeInfo.averageRating,e.volumeInfo.ratingsCount,s,e.saleInfo.listPrice?.amount,e.saleInfo.listPrice?.currencyCode))
                    }
                    for (let s of t)
                        e.appendChild(s.render())
                }
            }
            ,
            e.getCategory = function(t) {
                return t.dataset.category ? t.dataset.category : "Architecture"
            }
        }
        ,
        519: (t,e,s)=>{
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            s(466),
            s(407)
        }
    }
      , e = {};
    function s(i) {
        var n = e[i];
        if (void 0 !== n)
            return n.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, s),
        o.exports
    }
    s.r = t=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    s(519),
    s(630)
}
)();
