import { PrismaClient } from "@prisma/client"
import type { GetServerSideProps, NextPage } from "next"

const UrlPage: NextPage = () => {
  return <></>
}
export default UrlPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prisma = new PrismaClient()

  const { url } = ctx.params!

  const custom = await prisma.url.findUnique({
    where: {
      custom: url?.toString(),
    },
  })

  if (!custom) {
    const generated = await prisma.url.findUnique({
      where: {
        generated: url?.toString(),
      },
    })

    if (!generated) return { redirect: { destination: "/", permanent: false } }

    return {
      redirect: {
        destination: generated.original,
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: custom.original,
      permanent: false,
    },
  }
}
