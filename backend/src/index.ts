import epxress from 'express'
import cors from 'cors'
import { db } from "./prisma/db";

const app = epxress()

app.use(epxress.json())
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))

app.post('/employees',async(req,res)=>{

   const {name,email,role} = req.body
   const employees = await db.orm.public.Employee.create({
    email,
    name: name,
    role
  });

  res.status(200).json({
    message : "Employee created"
  })

})

app.get('/employees', async (req, res) => {
  const employees = await db.orm.public.Employee.all()

  res.status(200).json(employees)
})

app.put('/employees/:id', async (req, res) => {
  const { name, email, role } = req.body

  try {
    const employee = await db.orm.public.Employee
    .where({ id: Number(req.params.id) })
    .update({ name, email, role })

    res.status(200).json({ message: "Employee updated", employee })
  } catch (e: any) {
    if (e.code === "P2025") return res.status(404).json({ error: "Not found" })
    res.status(400).json({ error: e.message })
  }
})


app.delete('/employees/:id', async (req, res) => {
  await db.orm.public.Employee
    .where({ id: Number(req.params.id) })
    .delete()

  res.status(200).json({ message: "Employee deleted" })
})

app.listen(3000)