import axios from 'axios';
import { AttioDeal } from '@/types/integration';

const ATTIO_API_BASE = 'https://api.attio.com/v2';

export class AttioClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async getClosedWonDeals(): Promise<AttioDeal[]> {
    try {
      const response = await axios.post(
        `${ATTIO_API_BASE}/objects/deals/records/query`,
        {
          filter: {
            attribute: 'stage',
            operator: 'equals',
            value: 'Won 🎉'
          },
          sorts: [
            {
              attribute: 'created_at',
              direction: 'desc'
            }
          ]
        },
        {
          headers: this.getHeaders()
        }
      );

      return response.data.data.map((record: any) => ({
        id: record.id.record_id,
        name: record.values.name?.[0]?.value || 'Untitled Deal',
        stage: record.values.stage?.[0]?.value || 'Unknown',
        value: record.values.deal_value?.[0]?.value || 0,
        owner: {
          id: record.values.deal_owner?.[0]?.referenced_actor_id || '',
          name: record.values.deal_owner?.[0]?.referenced_actor_name || 'Unassigned',
          email: record.values.deal_owner?.[0]?.email || ''
        },
        associatedCompany: record.values.associated_company?.[0]?.target_record_id || undefined
      }));
    } catch (error) {
      console.error('Error fetching closed won deals from Attio:', error);
      throw new Error('Failed to fetch deals from Attio');
    }
  }

  async getDealById(dealId: string): Promise<AttioDeal | null> {
    try {
      const response = await axios.get(
        `${ATTIO_API_BASE}/objects/deals/records/${dealId}`,
        {
          headers: this.getHeaders()
        }
      );

      const record = response.data.data;
      return {
        id: record.id.record_id,
        name: record.values.name?.[0]?.value || 'Untitled Deal',
        stage: record.values.stage?.[0]?.value || 'Unknown',
        value: record.values.deal_value?.[0]?.value || 0,
        owner: {
          id: record.values.deal_owner?.[0]?.referenced_actor_id || '',
          name: record.values.deal_owner?.[0]?.referenced_actor_name || 'Unassigned',
          email: record.values.deal_owner?.[0]?.email || ''
        },
        associatedCompany: record.values.associated_company?.[0]?.target_record_id || undefined
      };
    } catch (error) {
      console.error(`Error fetching deal ${dealId} from Attio:`, error);
      return null;
    }
  }
}
