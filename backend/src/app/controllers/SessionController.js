import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Validation fails' });
        };

        const { email, password } = request.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            response.status(401).json({ error: "User not found" });
        }

        if (!(await user.checkPassword(password))) {//se as senhas n baterem
            return response.status(401).json({ error: 'Password does not match' });
        }

        const { id, name } = user;

        return response.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        })
    }
}

export default new SessionController();