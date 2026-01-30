import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function updateAcme() {
  await sql`UPDATE integrations SET priority = 'Highest' WHERE account = 'Acme Healthcare'`;
  console.log('Updated Acme Healthcare to Highest priority');
}

updateAcme().catch(console.error);
