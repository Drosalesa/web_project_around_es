export declare class FormValidator {
    private inputList;
    private submitFormButton;
    private formElement;
    private inputErrorClass;
    private inputErrorMessageClass;
    constructor({ inputSelector, buttonSelector, inputErrorClass, inputErrorMessageClass }: {
        inputSelector: string;
        buttonSelector: string;
        inputErrorClass: string;
        inputErrorMessageClass: string;
    }, formElement: HTMLFormElement);
    private showInputError;
    private hideInputError;
    private toggleFormButton;
    private validateForm;
    private setEventListeners;
    resetValidation(): void;
    enableValidation(): void;
}
//# sourceMappingURL=FormValidator.d.ts.map