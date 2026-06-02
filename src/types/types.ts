export interface FormValues {
    [key: string]: string;
}

export interface CardData {
    name: string;
    link: string;
};

export interface UserValues extends FormValues{
    name: string,
    description: string,
    avatar: string,
}
