import { IPostik } from "@components/TestPage/TestPage";
import { $instance } from ".";

export class TestApi {
  static async createPost(post: Omit<IPostik, "id">) {
    const { data } = await $instance.post<IPostik>("https://jsonplaceholder.typicode.com/posts", post);
    return data;
  }

  static async getPosts() {
    const { data } = await $instance.get<IPostik[]>("https://jsonplaceholder.typicode.com/posts");
    return data;
  }

  static async getPost(id: number) {
    const { data } = await $instance.get<IPostik>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return data;
  }

  static async updatePost(post: IPostik) {
    const { data } = await $instance.put<IPostik>(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
    return data;
  }

  static async getError(id: number) {
    console.log("get error");
    throw new Error("err0r");
  }
}
