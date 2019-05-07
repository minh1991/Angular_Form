export class Constant {
    public static readonly PATTERN = {
        NUMBER: /^[0-9]*$/,
        DATE: /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
        EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        PASSWORD: /^[a-zA-Z]\w{4,30}$/,
    };

    public readonly degreeOrders = [
        { name: 'Trên Đại học', id: 1 },
        { name: 'Tốt nghiệp đại học', id: 2 },
        { name: 'Đang học đại học', id: 2 },
        { name: 'Tốt nghiệp cấp 3', id: 3 },
        { name: 'Chưa tốt nghiệp cấp 3', id: 4 },
    ];
}
