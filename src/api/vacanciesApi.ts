import { IVacancy } from "@ts/entities";
import { IVacanciesFilters } from "@ts/types";
import { $instance } from ".";

export class VacanciesApi {
  static async create(payload: any) {
    const { data } = await $instance.post<IVacancy>("/vacancies/create", payload);
    return data;
  }

  static async getAll(payload: IVacanciesFilters) {
    const { data } = await $instance.get<IVacancy[]>("/vacancies/", { params: payload });
    return data;
  }
}
