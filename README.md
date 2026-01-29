# Customer Success Dashboard

A comprehensive dashboard for managing customer integrations after deals are marked as closed won on Attio.

## Features

- **Integration Management**: Track and manage customer integrations from closed won deals
- **Task Tracking**: Create, assign, and monitor tasks for each integration
- **Team Collaboration**: Assign tasks to different teams (Sales, Operations, Legal, Finance, Product)
- **Priority Management**: Set and filter by integration priority (High, Medium, Low)
- **Integration Types Support**:
  - AI Automated Prior Authorizations
  - AI Automation for DME
  - Full Service DME RCM
  - AI Population Health Analytics
- **Document Linking**: Link Google Docs for integration scope documentation
- **Real-time Updates**: Track progress with task completion metrics
- **Attio Integration**: Fetch closed won deals directly from Attio CRM

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Attio API key (optional, for syncing closed won deals)

### Installation

1. Clone or navigate to the project directory:

```bash
cd customer-success-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

4. Add your Attio API key to `.env.local`:

```
ATTIO_API_KEY=your_attio_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Dashboard Overview

The main dashboard displays:
- Total integration count
- Priority breakdown (High, Medium, Low)
- Task statistics (total and completed)
- Searchable integration cards

### Creating an Integration

1. Click the "New Integration" button in the header
2. Fill in the required fields:
   - Account Name
   - Account Owner
   - Integration Type
   - Integration Scope Document URL (Google Docs link)
   - Priority
   - Kickoff Date
3. Click "Create Integration"

### Managing Tasks

1. Click on an integration card to open the detail modal
2. Click "Add Task" to create a new task
3. Fill in task details:
   - Title
   - Assigned team member
   - Team (Sales, Operations, Legal, Finance, Product)
   - Deadline
   - Status (Not Started, In Progress, Completed, Blocked)
   - Description (optional)
4. Update task status directly from the dropdown in each task card

### Filtering and Search

- Use the search bar to filter by account name or owner
- Use the priority dropdown to filter by priority level
- Click "Refresh" to reload data

## Data Storage

The application currently uses in-memory storage with demo data for demonstration purposes. For production use, you should:

1. Replace the `storageService` in `lib/storage.ts` with a real database implementation (PostgreSQL, MongoDB, etc.)
2. Set up proper authentication and authorization
3. Implement data persistence

## Attio Integration

To fetch closed won deals from Attio:

1. Ensure your `ATTIO_API_KEY` is set in `.env.local`
2. The API endpoint `/api/attio/deals` will fetch all deals with status "Won 🎉"
3. You can extend this to automatically create integrations from closed won deals

## Project Structure

```
customer-success-dashboard/
├── app/
│   ├── api/                  # API routes
│   │   ├── integrations/     # Integration CRUD endpoints
│   │   └── attio/            # Attio API integration
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main dashboard page
├── components/               # React components
│   ├── IntegrationCard.tsx   # Integration summary card
│   └── IntegrationModal.tsx  # Integration detail modal
├── lib/                      # Utility libraries
│   ├── attio.ts             # Attio API client
│   └── storage.ts           # Data storage service
├── types/                    # TypeScript type definitions
│   └── integration.ts        # Integration and task types
└── package.json
```

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Real-time notifications
- [ ] Email reminders for upcoming deadlines
- [ ] Advanced analytics and reporting
- [ ] Automatic sync with Attio closed won deals
- [ ] File attachments for tasks
- [ ] Comments and activity log
- [ ] Export to CSV/Excel
- [ ] Mobile responsive improvements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
