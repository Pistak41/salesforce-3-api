import express, { json } from 'express'

const app = express()

app.use([json()]);

app.get('/', ({ query: { fecha, ammount = 1 } }, res) => {
    if (fecha) {
        const formattedDate = new Date(fecha);

        if (isNaN(formattedDate)) return res.status(400).json({ error: 'Fecha invalida, se requiere una fecha con formato yyyy-mm-dd' })

        res.json({
            price: formattedDate.getFullYear() * (formattedDate.getMonth() + 1) * (formattedDate.getDay() + 1) * 12 * ammount,
            ammount
        })
    } else {
        res.status(400).json({ error: 'Fecha requerida' })
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Puerto escuchado');
})