export interface ILoginController<P, R> {
    signin(body: P): Promise<R>;
}
