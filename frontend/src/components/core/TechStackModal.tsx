import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
  Badge,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import styles from './TechStackModal.module.css';

interface TechStackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TechResource {
  name: string;
  description: string;
  badge?: string;
  details?: Array<{ label: string; value: string }>;
  disabled?: boolean;
}

interface TechSection {
  title: string;
  resources: TechResource[];
}

const sections: TechSection[] = [
  {
    title: 'AI Stack',
    resources: [
      {
        name: 'console-sense-ai',
        description: 'AI Foundry agent specialised in Nureva products and company knowledge. Configured to always run a web search before responding to ensure answers are current and grounded in real content.',
        badge: 'Agent',
        details: [
          { label: 'Model', value: 'gpt-4.1' },
          { label: 'Instructions', value: `You are an expert on Nureva and its products.\n\n**Behavior**\n- Always run a web search before answering\n- Lead with the answer — no preamble, no summary, no filler\n- Use no more than 4 sources per response\n\n**Formatting**\n- Output GitHub Flavored Markdown only\n- Use **bold**, *italic*, \`code\`, \`\`\`code blocks\`\`\`, # headings, bullet lists, numbered lists, > blockquotes\n- No HTML tags\n- No trailing period (.) on bullet points\n- For source citations: inline reference at the end of the sentence only — never mid-sentence or at the start\n- Do not repeat the same URL as both an inline reference and a markdown link. Use only inline references.` },
        ],
      },
      {
        name: 'Web Search Tool',
        description: 'Bing Custom Search tool attached to the agent that restricts live web searches to Nureva-owned domains, ensuring retrieved content is authoritative and on-topic.',
        badge: 'Tool',
        details: [
          { label: 'Scope', value: 'Nureva websites only' },
          { label: 'Provider', value: 'Azure Bing Custom Search' },
        ],
      },
      {
        name: 'Knowledge Base',
        description: "Vector knowledge base that indexes content crawled from Nureva's websites, enabling fast semantic retrieval to supplement the agent's live search responses.",
        badge: 'Knowledge',
        disabled: true,
        details: [
          { label: 'Data source', value: 'Web search (Nureva domains)' },
          { label: 'Search type', value: 'Hybrid (vector + keyword)' },
        ],
      },
    ],
  },
  {
    title: 'Azure AI Infrastructure',
    resources: [
      {
        name: 'Microsoft AI Foundry',
        description: 'Hosts and orchestrates the AI agent. Provides the agent runtime, tool integrations, and management plane for the conversational AI workload.',
        badge: 'Agent Runtime',
      },
      {
        name: 'Azure OpenAI',
        description: 'Powers the large language model that drives agent reasoning, response generation, and tool-use decisions.',
        badge: 'LLM',
      },
      {
        name: 'Azure AI Search',
        description: 'Enables retrieval-augmented generation (RAG) by indexing knowledge sources and performing vector and hybrid searches at query time.',
        badge: 'RAG / Search',
      },
      {
        name: 'Azure Bing Custom Search',
        description: 'Extends the agent with real-time web search over a curated set of domains, allowing up-to-date answers beyond the training data.',
        badge: 'Web Search',
      },
      {
        name: 'Application Insights',
        description: 'Captures distributed traces, custom events, and telemetry from both the agent service and the web application for observability and diagnostics.',
        badge: 'Observability',
      },
    ],
  },
  {
    title: 'Web Application',
    resources: [
      {
        name: 'Azure Container Apps',
        description: 'Runs the containerised .NET backend as a serverless container, with built-in ingress, scaling, and managed identity support.',
        badge: 'Hosting',
      },
      {
        name: 'Azure Container Registry',
        description: 'Stores and serves the container image for the web application, integrated with the Container Apps deployment pipeline.',
        badge: 'Registry',
      },
      {
        name: 'Microsoft Entra ID',
        description: 'Secures the application with OAuth 2.0 / MSAL authentication. Supports On-Behalf-Of (OBO) flow for delegated access to the AI agent service.',
        badge: 'Auth',
      },
    ],
  },
  {
    title: 'Backend',
    resources: [
      {
        name: 'ASP.NET Core (.NET 9)',
        description: 'REST and server-sent events (SSE) API that proxies requests to AI Foundry, handles authentication, and streams agent responses to the client.',
        badge: 'API',
      },
      {
        name: 'Azure AI Projects SDK',
        description: 'Official Microsoft SDK used by the backend to communicate with the AI Foundry agent service for conversation management and streaming.',
        badge: 'SDK',
      },
    ],
  },
  {
    title: 'Frontend',
    resources: [
      {
        name: 'React 19',
        description: 'Single-page application framework providing component-based UI rendering, hooks-based state management, and streaming message handling.',
        badge: 'UI Framework',
      },
      {
        name: 'Fluent UI v9',
        description: "Microsoft's design system providing accessible components (buttons, dialogs, menus) and design tokens that ensure a consistent look and feel.",
        badge: 'Design System',
      },
      {
        name: 'MSAL Browser',
        description: 'Microsoft Authentication Library used on the frontend to acquire tokens from Entra ID and authenticate API requests to the backend.',
        badge: 'Auth',
      },
    ],
  },
];

export const TechStackModal: React.FC<TechStackModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={(_e, data) => onOpenChange(data.open)}>
      <DialogSurface className={styles.surface} style={{ maxHeight: '80vh', height: 'fit-content', alignSelf: 'center', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className={styles.header}>
          <DialogTitle className={styles.title}>Tech Stack</DialogTitle>
          <Button
            appearance="subtle"
            icon={<Dismiss24Regular />}
            onClick={() => onOpenChange(false)}
            aria-label="Close tech stack"
            className={styles.closeButton}
          />
        </div>
        <DialogBody className={styles.body} style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <DialogContent className={styles.content} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
            <div className={styles.sectionsGrid}>
            {sections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <div className={styles.resourceList}>
                  {section.resources.map((resource) => (
                    <div key={resource.name} className={`${styles.resource}${resource.disabled ? ` ${styles.resourceDisabled}` : ''}`}>
                      <div className={styles.resourceHeader}>
                        <span className={styles.resourceName}>{resource.name}</span>
                        {resource.badge && (
                          <Badge appearance="tint" color="brand" className={styles.badge}>
                            {resource.badge}
                          </Badge>
                        )}
                      </div>
                      <p className={styles.resourceDescription}>{resource.description}</p>
                      {resource.details && resource.details.length > 0 && (
                        <dl className={styles.detailList}>
                          {resource.details.map(({ label, value }) => (
                            <div key={label} className={styles.detailRow}>
                              <dt className={styles.detailLabel}>{label}</dt>
                              <dd className={styles.detailValue}>{value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
            </div>
          </DialogContent>
          <DialogActions className={styles.actions}>
            <Button appearance="primary" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
