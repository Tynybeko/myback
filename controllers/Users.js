import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from '../models/User.js';


export const register = async (req, res) => {
    try {
        const myPassword = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(myPassword, salt)

        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            sex: req.body.sex,
            phonenumber: req.body.phonenumber,
            private: req.body.private,
            password: hash,
        })

        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        })

        const { phonenumber, password, ...userData } = user._doc;

        res.status(200).json({
            ...userData,
            token,
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

export const userUpdate = async (req, res) => {
    try {
        const userId = req.params.id;

        UserModel.findOneAndReplace(
            {
                _id: userId,
            },
            {
                ...req.body,
                avatar: req.body.file.buffer
            }
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Не удалось обновить пользователя!'
                })
            }
            res.json({
                message: 'Пользователь обнавлен!'
            })
        },)
    } catch (err) {
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(403).json({
                message: 'Неверный логин или пароль'
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(403).json({
                message: 'Неверный логин или пароль!'
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        })

        const { passwordHash, ...userData } = user._doc;


        res.json({
            ...userData,
            token,
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось авторизоваться!'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        const data = user._doc;

        res.status(200).json({
            ...data,
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Нету доступа'
        })
    }
}