# Supermarket

# suka mog hotya BbI sozdat' main

# Вертска, сделать компоненты страницы (возможно при помощи ui), страница пользователя, редакс, scss...

# Создание БД, endpoint, написать конфиг, настройка подключения к БД

1. Слайдер
2. Карточки товаров по скидкам
3. Карточки из предложки
4. Страница каталога с фильтрами
5. Страница корзины
6. Личный кабинет
7. Хлебные крошки
8. Кнопка проскролла наверх

CARD (get)
id:
title:
price:
img:
category: { (тут вопросики конечно)
    male: {
        categoryId:
        categoryName:
    },
    female: {
        categoryId:
        categoryName:
    }
}
sale: NULL | ...
quentity: ...
description: {
    material: 
    ...
}
new: true | false

CATEGORY
category: {
    male: {
        categoryId:
        categoryName:
    },
    female: {
        categoryId:
        categoryName:
    }
}

GALERY (get)
id:
img:

USER (get, post)
id?:
role: guest | user
email?:
name?:
password?:
reviewId: (мб потом можно добавить)

REVIEW (get, post)
id: 
stars: number
description: ...
cardId:
