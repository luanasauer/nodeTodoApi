import { Request, Response } from 'express'; 
import { Todo } from '../models/Todo';

export const allTasks = async (req: Request, res: Response) => {    
    
    const list = await Todo.findAll();
    res.json({list});
}

export const addTask = async (req: Request, res: Response) => {  
    //enviar os dados através do corpo da requisição

    if(req.body.title) {

        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });
        // atualiza o status para o código de dado inserido com sucesso
        res.status(201).json({item: newTodo});

    } else {
        res.json({ error: 'Dados não enviados.'});
    }    
}

export const updateTask = async (req: Request, res: Response) => {  

    //diferente do app nodeApiB7Web desta form vai atualizar os dados de forma independente

    const id: string = req.params.id;

    //deve ser usado let para q permita fazer as alterações
    let todo = await Todo.findByPk(id);

    if(todo) {

        if(req.body.title){
            todo.title = req.body.title; //já vem como string
        }
        if(req.body.done) { //este tbm vem como string, todos os campos de body vem como string

            switch(req.body.done.toLowerCase()) { //transforma em minuscula para o caso de vir por exemplo:TRUE
                case 'true':
                case '1':
                    todo.done = true;
                    break;
                case 'false':
                case '0':
                    todo.done = false;
                    break;
            }
        }

        await todo.save();
        res.json({item:todo});

    } else {
        res.json({error: 'Item não encontrado'});
    }

    res.json({ });
}

export const removeTask = async (req: Request, res: Response) => { 

    let id: string = req.params.id;
    let todo = await Todo.findByPk(id);
    if(todo) {
        await todo.destroy();
    }

    res.json({});
}

