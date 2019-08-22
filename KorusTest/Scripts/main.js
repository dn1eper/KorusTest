$(document).ready(function () {
    // Загрузка и отображение таблицы
    $('#table').bootstrapTable({
        columns: [
            { title: '№', field: 'ContactID', sortable: true },
            { title: 'Фамилия', field: 'SurName', sortable: true},
            { title: 'Имя', field: 'FirstName', sortable: true },
            { title: 'Отчество', field: 'Patronymic', sortable: true },
            { title: 'Адрес', field: 'Address' },
            { title: 'Телефон', field: 'Telephone.Number', formatter: FormatTelephone },
            { title: 'Управление' }
        ],
        ajax: function (params) {
            $.getJSON('api/contacts').done(function (data) {
                console.debug(data);
                params.success({
                    'rows': data,
                    'total': data.length
                });
            });
        },
    });

    
});

function FormatTelephone(value) {
    return value.replace(/(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1($2)$3-$4-$5');
}