import { body } from "express-validator";

export const register = [
    body('email', 'Неверный формат Email').isEmail(),
    body('password', 'Пароль должен быть не менее 6 символов').isLength({ min: 6 }),
    body('name', 'Укажите имя').isLength({ min: 3 }),
    body('surname', 'Укажите фамилию').isLength({ min: 3 }),
    body('phonenumber', 'Указан не правильный номер телефона!').isMobilePhone("any"),
    body('sex', 'Укажите пол').isString({ min: 3 }),
]
export const updateUser = [
    body('email', 'Неверный формат Email').isEmail(),
    body('name', 'Укажите имя').isLength({ min: 3 }),
    body('surname', 'Укажите фамилию').isLength({ min: 3 }),
    body('phonenumber', 'Указан не правильный номер телефона!').isMobilePhone("any"),
    body('sex', 'Укажите пол').isString({ min: 3 }),
]

export const login = [
    body('email', 'Неверный формат Email').isEmail(),
    body('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 }),
]


export const changePassword = [
    body('password', 'Пароль должен быть не менее 6 символов').isLength({ min: 6 }),
]