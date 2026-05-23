import type { CardData } from "../types/types";
type EventFunction = (evt: Event) => void;
export declare class Card {
    private cardTitle;
    private cardImage;
    private cardTemplate;
    private cardElement;
    private cardLikeBtn;
    private cardDeleteBtn;
    private handleCardClick;
    constructor(card: CardData, cardTemplateSelector: string, handleCardClick: EventFunction);
    private setEventListeners;
    private toggleLikeBtn;
    private removeCard;
    getCardElement(): HTMLElement;
}
export {};
//# sourceMappingURL=Card.d.ts.map