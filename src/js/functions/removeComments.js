function removeHtmlComments(html) {
    var pattern = /<!--[\s\S]*?-->/g;
    return html.replace(pattern, "");
}