import { Prisma, PrismaClient, url } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data =
  | {
      message: string
    }
  | url

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const prisma = new PrismaClient()
    let generated = null
    const { original, custom } = req.body

    if (!original || original.trim() === "")
      return res.status(400).json({ message: "Ingresa una url válida" })

    if (!custom) {
      generated = Math.random().toString(36).slice(2, 9)
    } else {
      const check = await prisma.url.findUnique({
        where: { generated: custom },
      })

      if (check) {
        return res.status(400).json({
          message: "Ya existe ese enlace, prueba otro.",
        })
      }
    }

    const url = await prisma.url.create({
      data: {
        original,
        custom,
        generated,
      },
    })

    return res.status(200).json(url)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return res.status(400).json({
          message: "Ya existe ese enlace, prueba otro.",
        })
    }
    return res
      .status(500)
      .json({ message: "Error al finalizar la solicitud, vuelve a intentar" })
  }
}
