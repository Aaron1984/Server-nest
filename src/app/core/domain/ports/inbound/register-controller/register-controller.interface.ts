export interface IRegisterController<P, R> {
    signup(body: P): Promise<R>;
}
