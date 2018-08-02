const Prefetch = {
    store: [],
    request: function() {
        return m.request("data.json").then(userData => {
            return Prefetch.store = userData.details;
        });
    }
}

const App = {
    oninit: Prefetch.request,
    view: function(vNode) {
        if (Prefetch.store.length !== 0) {
            return [
                m(Header, Prefetch.store.header),
                m(Body, Prefetch.store.body)
            ]
        }
    }
}

const Header = {
    view: function(passedData) {
        return m("header", [
            m("h1", passedData.attrs.name),
            m("section", [
                m("aside", [
                    m("a.link[href=/][title=Printer friendly version][target=_blank]", "Download PDF"),
                    m("br"),
                    m("br"),
                    m.trust(`Native Tongue : <b>${passedData.attrs.native_lang}</b><br/>Also fluent in : <b>${passedData.attrs.fluent_langs.join(", ")}</b>`)

                ]),
                m("", `${passedData.attrs.city}, ${passedData.attrs.country}`),
                m.trust(`Mobile : <b>${passedData.attrs.mobile}</b><br/>
                Email : <a href="mailto:${passedData.attrs.email}" target="_blank" title="Contact Email">${passedData.attrs.email}</a><br />
                Website : <a href="${passedData.attrs.website}" target="_blank" title="Personal Website">${passedData.attrs.website}</a><br />`)
            ])
        ])
    }
}

const Body = {
    view: function(passedData) {
        return m("article", Object.keys(passedData.attrs).map(section => {
            return [
                m("section", [
                    m("h3", section),
                    m("hr"),
                    m("", passedData.attrs[section].map(item => {
                        return [
                            m("h4", item.title),
                            m("h5", item.subtitle),
                            m.trust(`<p>${item.description}</p>`)
                        ]
                    })),
                ]),
                m("br", { class: "pagebreak" })
            ]
        }))
    }
}

m.mount(document.body, App);