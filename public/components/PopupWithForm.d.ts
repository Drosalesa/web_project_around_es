import { Popup } from "./Popup.js";
import type { FormValues } from "../types/types.js";
import type { UserValues } from "../types/types.js";
export declare class PopupWithForm extends Popup {
    private handleFormSubmit;
    private inputList;
    private popupForm;
    constructor(handleFormSubmit: (data: FormValues) => void, popupSelector: string);
    private getInputValues;
    private handleSubmit;
    setEventListeners(): void;
    getForm(): HTMLFormElement;
    close: () => void;
    fillForm(values: UserValues): void;
}
//# sourceMappingURL=PopupWithForm.d.ts.map