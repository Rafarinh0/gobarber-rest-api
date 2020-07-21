import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL, // nunca vai existir no database, só no código
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        //hook -> trechos de código que são automaticamente executados baseado em ações que acontecem no model
        //nesse caso, antes de um usuário ser salvo no database...
        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }//ver se as senhas batem
}

export default User;