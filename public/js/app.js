$('document').ready(function () { //скрипти будуть виконуватись коли завантажені всі елементи


    //об"єкт контроллер містить в собі функції, пов"язані з отриманням даних, та їх відображенням
    var controller = {
        getData: function () {
            return {
                "phrase": $('form').find('#newEnter').val() //функція, яка повертає об"єкт з новою кодовою фразою
            }
        },
        sendRequest: function (data) {
            $.post("/newphrase", data) //нарсилання post запиту на сервер на роут /newphrase з данними про нову кодову фразу
                .done(function (data) {//дія буде виконана коли HTTP запит закінчить успішно
                    loginView.init(data);//побудова нових елементів на сторінці базуючись на отриманих данних
                })
        }
    }

    var loginView = { //об"єкт містить собі функції, для створення та маніпуляції DOM елементами
        init: function (data) {//функція яка створює вигляд головної сторіки
            $('.border').empty();//знищує існуючі елементи в блоці з класом border
            $('.border').html(this.createFragment(data));//додає новий елемент
            $('#myModal').modal('hide');//ховає модальне вікно
        },
        text: function (data) {//функція для створення заголовка
            var text = document.createElement('h3');//створюється елемент
            text.innerText = "Your code phrase: " + data;//в елемент додається текст з фразою отриманою від сервера
            return text//повертає новостворений елемент
        },
        changeButton: function () {//функція для створення кнопки, яка дозволяє змінити кодову фразу
            var change = document.createElement('button');//створення кнопки
            change.innerText = "Change";//текст кнопки
            change.className = 'btn btn-info'//кнопка отримує клас

            return change//повертає новостворений елемент
        },
        exit: function () {//функція для виходу з аккаунта
            var exit = document.createElement('button');//створення кнопки
            exit.innerText = "Exit";//текст кнопки
            exit.className = 'btn btn-warning'//кнопка отримує клас
            $(exit).on('click', function (e) {//створення event lister типу 'click' на кнопці
                window.location.reload();//функція приймає елемент по якому було клікнуто, як параметр. Дія функції - перезавантажити сторінку
            })
            return exit//повертає новостворений елемент
        },
        createFragment(data) {//функція для створення контейнера, який тримає в собі нові елементи
        var button = this.changeButton();
        var header = this.text(data);

        $(button).on('click', function (e) {//створення event lister типу 'click' на кнопці
            showChange(header);//створення нового поля вводу
        })

        var element = document.createDocumentFragment();//створення порожнього DOM елементу
        element.appendChild(header);//в порожній елемент додається заголовок
        element.appendChild(button);//в порожній елемент додається кнопка зміни фрази
        element.appendChild(this.exit());//в порожній елемент додається кнопка виходу
        return element//елемент вставляється в DOM дерево
    }
}


    //функція логінізації
    $('#login').on('click', function (e) {//створення event lister типу 'click' на кнопці
        e.preventDefault();//запобігається звична поведінка браузера, в данному випадку відсилання данних та перезавантаження сторінки.
        //функції аналогічні описаним в loginView та controller але не структуровані, як результат - код який важко читати і зрозуміти
        var data = {
            "phrase": $('form').find('#enter').val()
        };

        $.post("/login", data)
            .done(function (res) {
                $('.border').empty();
                var text = document.createElement('h3');
                text.innerText = "Your code phrase: " + res;
                var element = document.createDocumentFragment();
                element.appendChild(text);
                var change = document.createElement('button');
                change.innerText = "Change";
                change.className = 'btn btn-info'
                $(change).on('click', function (e) {
                    showChange(text);
                })
                element.appendChild(change);
                var exit = document.createElement('button');
                exit.innerText = "Exit";
                exit.className = 'btn btn-warning'
                $(exit).on('click', function (e) {
                    window.location.reload();
                })
                element.appendChild(exit);
                $('.border').html(element);
            })
            .fail(function () {//функція яка буде виконуватись у випадку невдачі запиту
                alert('Wrong code phrase')
            });

    })

    //функція для редагування кодової фрази, викликається при кліку на кнопку Change
    function showChange(el) {//приймає елемент як параметр
        $(el).hide();
        var text = $(el).text(),
            value = text.replace('Your code phrase: ', ""); //створення зміної для відображення існуючої фрази в полі вводу
        $('.btn-info').parent().prepend('<form class="form-group"><input type="text" class="form-control" value="' + value + '"/><button class="btn btn-primary" id="done">Done</button></form>');// в DOM дереві відюувається пошук елементу з класом .btn-info,
        //вираховується його батьківський елемент, і в його вміст додається форма з кнопкою
        $('#done').on('click', function (e) {
            e.preventDefault();
            $('form.form-group').hide();
            var newPhrase = $('h3').text();
            $.post("/changephrase", {//надсилання даних до сервера
                    oldphrase: { "phrase": newPhrase.replace('Your code phrase: ', "") },// об"єкт з старою фразою яку потрібно замінити
                    newphrase: { "phrase": $('form.form-group input').val() }// об"єкт з новою фразою
                })
                .done(function (data) {
                    $(el).text('Your code phrase: ' + data).show();
                })
        })
    }

    $('#register').on('click', function (e) {
        e.preventDefault();
    })

    $('#createNewPhase').on('click', function (e) {
        e.preventDefault();
        controller.sendRequest(controller.getData());
    })
})
/**
 * Created by Славік Олена on 05.12.2015.
 */
