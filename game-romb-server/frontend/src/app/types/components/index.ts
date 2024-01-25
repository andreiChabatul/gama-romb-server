import { ACTIONS_BUTTON } from "src/app/const/enum";

export interface OptionSelect {
    value: number | string;
    option: string;
}

export interface InputTextFormOption {
    nameForm: string;
    type: string;
    defaultValue?: string;
}

export interface Button {
    action: ACTIONS_BUTTON;
    width: string;
}

export interface SelectFormOption {
    nameForm: string;
    optionSelect: OptionSelect[];
}