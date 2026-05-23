export class Section {
    renderedItems;
    container;
    renderer;
    constructor({ items, renderer }, containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.renderedItems = items;
        this.renderer = renderer;
    }
    renderItems() {
        this.renderedItems.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.container.prepend(element);
    }
}
//# sourceMappingURL=Section.js.map