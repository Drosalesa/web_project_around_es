export declare class Popup {
    protected popupElement: HTMLElement;
    constructor(popupSelector: string);
    open(): void;
    close: () => void;
    protected handleEscClose: (evt: KeyboardEvent) => void;
    setEventListeners(): void;
}
//# sourceMappingURL=Popup.d.ts.map