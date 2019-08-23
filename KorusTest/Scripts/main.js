var $table, $createModal, $removeModal, $editModal, selectedContact;

function InitTable() {
    $table.bootstrapTable({
        columns: [
            {
                title: '№',
                field: 'ContactID',
                align: 'center',
                width: 60,
                sortable: true,
                searchable: false
            },
            {
                title: 'Фамилия',
                field: 'SurName',
                sortable: true
            },
            {
                title: 'Имя',
                field: 'FirstName',
                sortable: true
            },
            {
                title: 'Отчество',
                field: 'Patronymic',
                sortable: true
            },
            {
                title: 'Адрес',
                field: 'Address'
            },
            {
                title: 'Телефон',
                field: 'Telephone.Number',
                formatter: (value) => value.replace(/(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1($2)$3-$4-$5')
            },
            {
                title: 'Управление',
                searchable: false,
                align: 'center',
                width: 80,
                events: {
                    'click .edit': OnEditContactShow,
                    'click .remove': OnRemoveContactShow
                },
                formatter: () => [
                    '<a class="edit" href="javascript:void(0)" title="Изменить">',
                    '<i class="fa fa-edit"></i>',
                    '</a>',
                    '<a class="remove" href="javascript:void(0)" title="Удалить">',
                    '<i class="fa fa-trash"></i>',
                    '</a>'
                ].join('')
            }
        ],
        ajax: function (params) {
            $.getJSON('api/contacts').done(function (data) {
                params.success({
                    'rows': data,
                    'total': data.length
                });
            });
        },
        search: true,
        pagination: true,
        toolbar: '.toolbar',
    });
}

function OnCreateContactShow() {
    $createModal.modal('show');
}

function OnCreateContactRequest() {
    var newContact = {
        FirstName: $('#createFirstName').val(),
        SurName: $('#createSurName').val(),
        Patronymic: $('#createPatronymic').val(),
        Address: $('#createAddress').val(),
        Telephone: {
            Number: $('#createTelephone').val().replace(/(\(|\)|\-)/g, '')
        }
    };
    $.ajax({
        url: '/api/contacts/',
        type: 'POST',
        data: JSON.stringify(newContact),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            Notify('Контакт успешно сохранен', 'success');
            $table.bootstrapTable('append', data);
        },
        error: function (x, y, z) {
            Notify('Произошла ошибка при сохранении контакта (' + z + ')', 'danger');
        },
        complete: function () {
            $createModal.modal('hide');
            $('#createContactForm')[0].reset();
        }
    });
    return false;
}

function OnEditContactShow(e, value, row, index) {
    selectedContact = row;
    $('#editFirstName').val(row.FirstName);
    $('#editSurName').val(row.SurName);
    $('#editPatronymic').val(row.Patronymic);
    $('#editAddress').val(row.Address);
    $('#editTelephone').val(row.Telephone.Number);
    $editModal.modal('show');
}

function OnEditContactRequest() {
    selectedContact.FirstName = $('#editFirstName').val();
    selectedContact.SurName = $('#editSurName').val();
    selectedContact.Patronymic = $('#editPatronymic').val();
    selectedContact.Address = $('#editAddress').val();
    selectedContact.Telephone.Number = $('#editTelephone').val().replace(/(\(|\)|\-)/g, '');
    
    $.ajax({
        url: '/api/contacts/' + selectedContact.ContactID,
        type: 'PUT',
        data: JSON.stringify(selectedContact),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            Notify('Контакт успешно сохранен', 'success');
            $table.bootstrapTable('updateByUniqueId', {
                id: selectedContact.$id,
                row: selectedContact
            });
        },
        error: function (x, y, z) {
            Notify('Произошла ошибка при сохранении контакта (' + z + ')', 'danger');
        },
        complete: function () {
            $editModal.modal('hide');
        }
    });
    return false;
}

function OnRemoveContactShow(e, value, row, index) {
    selectedContact = row;
    $removeModal.find('.modal-body').html(['Подтвердите удаление контакта: <b>', row.SurName, ' ', row.FirstName, ' ', row.Patronymic, '</b>?'].join(''));
    $removeModal.modal('show');
}

function OnRemoveContactRequest() {
    $.ajax({
        url: '/api/contacts/' + selectedContact.ContactID,
        type: 'DELETE',
        success: function (data) {
            Notify('Контакт успешно удален', 'success');
            $table.bootstrapTable('remove', {
                field: 'ContactID',
                values: [selectedContact.ContactID]
            });
        },
        error: function (x, y, z) {
            Notify('Произошла ошибка при удалении контакта (' + z + ')', 'danger');
        },
        complete: function () {
            $removeModal.modal('hide');
        }
    });
}

function Notify(message, type) {
    $.notify({
        message: message
    }, {
        type: type,
        placement: {
            from: "top",
            align: "center"
        },
    });
}

$(document).ready(function () {
    $table = $('#contactsTable');
    $createModal = $('#createContactModal');
    $removeModal = $('#removeContactModal');
    $editModal = $('#editContactModal');

    InitTable();

    $('#createContactBtn').click(OnCreateContactShow);
    $('#createContactForm').submit(OnCreateContactRequest);
    $('#editContactForm').submit(OnEditContactRequest);
    $('#removeContactConfirmBtn').click(OnRemoveContactRequest);
    $("#createTelephone, #editTelephone").inputmask({ mask: "+9(999)999-99-99" });
});

