import express from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

/**
 * logic for our api will go here
 */
export default {
  path: '/',
  handler: app,
}

app.post(`/device`, async (req, res) => {
  console.log('post device called', req.body)
  try {
    const result = await prisma.device.create({
      data: {
        hostname: req.body.hostname,
        name: req.body.name,
      },
    })
    res.json(result)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new device cannot be created with this hostname'
        )
        res.sendStatus(409)
      }
    }
    res.status(500)
    throw e
  }
})

app.get('/device', async (req, res) => {
  const posts = await prisma.device.findMany()
  res.json(posts)
})

app.get('/device/:hostname', async (req, res) => {
  const { hostname } = req.params
  const device = await prisma.device.findUnique({
    where: {
      hostname,
    },
    include: { data: true },
  })
  res.json(device)
})

app.post('/datapoint', async (req, res) => {
  console.log(req.body)
  const { humidity, light, temperature, hostname } = req.body
  console.log(humidity, light, temperature, hostname)
  if (!(humidity && light && temperature && hostname)) {
    return res.send(500)
  }
  try {
    const result = await prisma.datapoint.create({
      data: {
        humidity,
        light,
        temperature,
        device: {
          connect: {
            hostname,
          },
        },
      },
    })
    res.json(result)
  } catch (e) {
    console.log(e)
    res.send(500)
  }
})
