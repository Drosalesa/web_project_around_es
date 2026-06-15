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

export interface ApiCard {
    isLiked: boolean,
    _id: string,
    name: string,
    link: string,
    owner: string,
    createdAt: string
}

export interface ApiUserInfo {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}
