export class Constant {
    public static readonly PATTERN = {
        NUMBER: /^[0-9]*$/,
        DATE: /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
        EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        PASSWORD: /^[a-zA-Z]\w{4,30}$/,
    };

    public static readonly DEGREEORDERS = [
        { name: 'Trên Đại học', id: 1 },
        { name: 'Tốt nghiệp đại học', id: 2 },
        { name: 'Đang học đại học', id: 3 },
        { name: 'Tốt nghiệp cấp 3', id: 4 },
        { name: 'Chưa tốt nghiệp cấp 3', id: 5 },
    ];

    public static readonly SALARYORDERS = [
        { name: 'Trên 2000$', id: 1 },
        { name: 'Trên 1000$', id: 2 },
        { name: 'Trên 500$', id: 3 },
        { name: 'Trên 100$', id: 4 },
        { name: 'Chưa có lương cố định', id: 5 },
    ];

    public static readonly SKILLSORDERS = [
        { name: 'HTML', id: 1 },
        { name: 'CSS', id: 2 },
        { name: 'JAVASCRIPT', id: 2 },
        { name: 'NODE JS', id: 3 },
        { name: 'PHP', id: 4 },
        { name: 'ANGULAR', id: 5 },
        { name: 'REACT JS', id: 6 },
        { name: 'VUE JS', id: 7 },
        { name: 'NO-SQL', id: 8 },
        { name: 'SQL', id: 9 }
    ];

    public static readonly WORKSORDERS = [
        { value: 'Nông dân', id: 1, comment: '' },
        { value: 'Kỹ sư', id: 2, comment: '' },
        { value: 'kinh doanh', id: 3, comment: '' },
        { value: 'Công nhân', id: 4, comment: '' },
        { value: 'Quản lý', id: 5, comment: '' },
        { value: 'An ninh', id: 6, comment: '' },
        { value: 'Y tế', id: 7, comment: '' },
        { value: 'Giáo viên', id: 8, comment: '' },
        { value: 'Học sinh, Sinh viên', id: 9, comment: '' },
        { value: 'Khác', id: 10, comment: '' }
      ];
}
