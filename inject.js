(() => {

    console.log("DocViewer> Running");

    // options for MutationObserver
    const options = {
        childList: true,
        attributes: true,
        subtree: true
    };

    // node to listen for DOM changes
    const docLink = document.querySelector(".file_preview_link");

    const observer = new MutationObserver(async (mutationsList) => {

        for (let mutation of mutationsList) {

            // when "Show file preview" icon disappears
            if (mutation.type === "attributes") {

                console.log("DocViewer> Adding expand option...");

                // wait until file preview appears
                while(!document.querySelector(".hide_file_preview_link")) {
                    await new Promise(r => setTimeout(r, 500));
                }

                // get DocViewer API's link
                const url = document.querySelector(".hide_file_preview_link").parentNode.querySelector("iframe").getAttribute("src");

                const expand = document.createElement("div");
                expand.innerHTML = `<button onClick="window.open('${url}')">Expand File Preview</button>`;

                // draw "expand" button on screen
                document.querySelector(".instructure_file_holder.link_holder").appendChild(expand);

                console.log("DocViewer> Done");
            }

        }

    });

    // start MutationObserver
    observer.observe(docLink, options);

})();