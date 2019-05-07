export class Constant {
    public static readonly PATTERN =  {
        NUMBER: /^[0-9]*$/,
        DATE: /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
        EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        PASSWORD: /^[a-zA-Z]\w{4,30}$/,
    };
}
