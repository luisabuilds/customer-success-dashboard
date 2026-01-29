import { NextResponse } from 'next/server';
import { AttioClient } from '@/lib/attio';

export async function GET() {
  try {
    const apiKey = process.env.ATTIO_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Attio API key not configured' },
        { status: 500 }
      );
    }

    const client = new AttioClient(apiKey);
    const deals = await client.getClosedWonDeals();

    return NextResponse.json({ data: deals });
  } catch (error) {
    console.error('Error fetching Attio deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals from Attio' },
      { status: 500 }
    );
  }
}
