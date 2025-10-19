const prisma = new PrismaClient();
async function testDatabaseConnection() {
    try {
        console.log('🔌 Testing database connection...');
        // Test connection
        await prisma.$connect();
        console.log('✅ Database connection successful!');
        // Test queries
        const userCount = await prisma.user.count();
        const quoteCount = await prisma.quote.count();
        const roleCount = await prisma.role.count();
        console.log('📊 Database statistics:');
        console.log(`   • Users: ${userCount}`);
        console.log(`   • Quotes: ${quoteCount}`);
        console.log(`   • Roles: ${roleCount}`);
        // Test latest quote
        const latestQuote = await prisma.quote.findFirst({
            orderBy: { submittedAt: 'desc' }
        });
        if (latestQuote) {
            console.log('📋 Latest quote:');
            console.log(`   • From: ${latestQuote.firstName} ${latestQuote.lastName}`);
            console.log(`   • Type: ${latestQuote.insuranceType}`);
            console.log(`   • Date: ${latestQuote.submittedAt.toLocaleDateString()}`);
        }
        return true;
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    testDatabaseConnection().then((success) => {
        process.exit(success ? 0 : 1);
    });
}
export { testDatabaseConnection };
