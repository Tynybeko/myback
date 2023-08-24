import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123')
            req.userId = decoded._id;
            next()
        } catch (err) {
            return res.status(403).json({
                message: 'ERROR'
            })
        }
    } else {
        return res.status(404).json({
            message: 'Нет доступа!!!'
        })
    }
}