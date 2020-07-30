import User from '../models/User';
import File from '../models/File';

class ProviderController {
    async index(request, response) {
        const providers = await User.findAll({
            where: { provider: true },
            attributes: ['id', 'name', 'email', 'avatar_id'],//enxugar os dados que interessam
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url']
            }],//poder incluir dados do arquivo
        });

        return response.json(providers)
    }
}

export default new ProviderController()