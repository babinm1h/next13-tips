export interface IBaseEntity {
  id: number;
  createdAt: Date;
}

export interface IUser extends IBaseEntity {
  email: string;
  name: string;
}

export interface IItem extends IBaseEntity {
  price: number;
  name: string;
  inStock: boolean;
  hasRestoraunt: boolean;
  hasWifi: boolean;
  roomsCount: number;
  starsCount: number;
  description: string;
  images: string[];
  avgRating: number;
}

//
export enum EXPIRIENCE_TYPES {
  null = "Нет опыта",
  junior = "1-3 года",
  middle = "3-6 лет",
  expert = "Более 6 лет",
}

export enum WORK_FORMATS {
  hybrid = "Гибридный",
  remote = "Удаленно",
  office = "Оффис",
}

export interface IVacancy extends IBaseEntity {
  description: string;
  salary: number;
  expirience: EXPIRIENCE_TYPES;
  format: WORK_FORMATS;
  company: string;
  reactionsCount: number;
  address: string;
  crucial_skills: string[];
  name: string;
  country: string;
}
