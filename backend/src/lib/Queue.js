import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
    constructor() {
        this.queues = {};
        this.init();
    }

    init() {
        //Pra cada um desses jobs eu crio uma fila
        //Dentro dessa fila eu armazeno o bee, que conecta com o redis e armazena e recupera valores do banco de daados
        //e armazeno o handle que processa a fila
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig
                }),
                handle,
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    //Pega cada um desses jobs e processa em tempo real
    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.on('failed', this.handleFailure).process(handle);
        });
    }

    handleFailure(job, error) {
        console.log(`Queue${job.queue.name}: FAILED`, error);
    }
}

export default new Queue();