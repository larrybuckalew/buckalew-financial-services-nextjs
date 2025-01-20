import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample user
  const user = await prisma.user.create({
    data: {
      email: 'demo@buckalew.com',
      name: 'Demo User',
      investments: {
        create: {
          initialAmount: 10000,
          monthlyContribution: 500,
          interestRate: 7,
          years: 20
        }
      },
      mortgages: {
        create: {
          loanAmount: 250000,
          interestRate: 4.5,
          loanTerm: 30,
          downPayment: 50000
        }
      },
      retirement: {
        create: {
          currentAge: 35,
          retirementAge: 65,
          currentSavings: 50000,
          monthlyContribution: 1000,
          expectedReturn: 6
        }
      }
    }
  })

  console.log({ user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
