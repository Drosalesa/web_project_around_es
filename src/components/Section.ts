type RendererFunction<T> = (item: T) => void;

export class Section<T> {
    private renderedItems: T[];
    private container: HTMLElement;
    private renderer: RendererFunction<T>;

    constructor (
        {items, renderer}: {items: T[], renderer: RendererFunction<T>},
        containerSelector: string
        ) {
            this.container = document.querySelector(containerSelector) as HTMLElement;
            this.renderedItems = items;
            this.renderer = renderer;
    }

    renderItems(): void {
        this.renderedItems.forEach((item) => {
            this.renderer(item);
        })
    }

    addItem(element: HTMLElement): void {
        this.container.prepend(element);
    }

}