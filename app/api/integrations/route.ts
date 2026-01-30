import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/lib/storage';
import { CustomerIntegration } from '@/types/integration';

export async function GET() {
  try {
    const integrations = await storageService.getAllIntegrations();
    return NextResponse.json({ data: integrations });
  } catch (error) {
    console.error('Error fetching integrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch integrations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newIntegration: CustomerIntegration = {
      id: Date.now().toString(),
      account: body.account,
      contact: body.contact,
      accountExecutive: body.accountExecutive,
      integrationType: body.integrationType,
      integrationScopeDocUrl: body.integrationScopeDocUrl || '',
      priority: body.priority || 'Medium',
      tasks: body.tasks || [],
      kickoffDate: body.kickoffDate,
      stage: body.stage || 'New Integrations',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attioRecordId: body.attioRecordId,
      attioAccountUrl: body.attioAccountUrl
    };

    const created = await storageService.createIntegration(newIntegration);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating integration:', error);
    return NextResponse.json(
      { error: 'Failed to create integration' },
      { status: 500 }
    );
  }
}
