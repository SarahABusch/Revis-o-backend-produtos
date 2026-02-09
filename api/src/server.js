import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app = express()

app.use(express.json())
app.use(cors())

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'benserverplex.ddns.net',
  user: 'aluno',
  password: 'senhaAlunos',
  database: 'web_03tb'
})

app.post('/products', (req, res) => {
  const { name, price, category, description } = req.body
  
  const query = 'INSERT INTO products (name, price, category, description) VALUES (?, ?, ?, ?)'
  
  pool.query(query, [name, price, category, description], (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erro ao cadastrar produto' })
    }
    
    res.status(201).json({ success: true, message: 'Produto cadastrado com sucesso', productId: results.insertId })
  })
})

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products ORDER BY id DESC'
  
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erro ao buscar produtos' })
    }
    
    res.status(200).json({ success: true, data: results })
  })
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
