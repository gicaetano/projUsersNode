const router = require('express').Router()

const Person = require('../models/Person')

// ============ CREATE - Criação de dados (POST)============
router.post('/', async (req, res) => {

    //req.body
    // desestructure {name:"Matheus", salary: 5000, approved: false}
    const { name, salary, approved } = req.body

    if(!name) {
        res.status(422).json({error: 'O Nome é obrigatório'})
        return
    }

    //Método chamado person
    const person = {
        name,
        salary,
        approved,
    }

    try {
        //criando dados
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// ============ READ - Leitura de dados (GET) ============
router.get('/', async (req, res) => {
    try {

        const people = await Person.find()
        res.status(200).json(people)

    }catch {
        res.status(500).json({ error: error })
    }
})

               // Rota ver usuario
router.get('/:id', async (req, res) => {

    //extrair dado da requisição, pela url = req.params
    const id = req.params.id

    try{

        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'O usuáro não foi encontrado'})
            return
        }

        res.status(200).json(person)

    } catch {
        res.status(500).json({ error: error })
    }
})

// ============ UPDADE - Atualização de dados (PUT, PATCH) ============
router.patch('/:id', async(req, res) => {

    const id = req.params.id

    const { name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Usuário não foi encontrado'})
            return
        } 

        res.status(200).json(person)

    }catch(error) {
        res.status(500).json({ error: error})
    }
})

// ============ DELETE - Deletar dados (DELETE) ============
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if (!person) {
        res.status(422).json({ message: 'O usuário não foi encontrado!' })
        return
    }

    try{

        await Person.deleteOne({_id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    }catch (error) {
        res.status(500).json({ error: error })
    }

})


module.exports = router