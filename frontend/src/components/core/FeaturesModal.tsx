import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';
import {
  Dismiss24Regular,
  LinkRegular,
  AttachRegular,
  ThumbLikeRegular,
  ChatSparkleRegular,
  DocumentArrowDownRegular,
} from '@fluentui/react-icons';
import styles from './FeaturesModal.module.css';

interface FeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const features = [
  {
    icon: <ChatSparkleRegular />,
    title: 'Streaming responses',
    description: 'Agent replies stream token-by-token in real time with retry and recovery on connection drops.',
  },
  {
    icon: <LinkRegular />,
    title: 'Inline citations',
    description: 'Web search results surface as numbered [N] citation markers that link directly to the source URL.',
  },
  {
    icon: <AttachRegular />,
    title: 'File attachments',
    description: 'Attach images, PDFs, and text files to your message. The agent reads and reasons over the content.',
  },
  {
    icon: <ThumbLikeRegular />,
    title: 'Feedback telemetry',
    description: 'Thumbs up / down on any response is logged as a custom event in Application Insights for quality tracking.',
  },
  {
    icon: <DocumentArrowDownRegular />,
    title: 'Export conversation',
    description: 'Download any conversation as a Markdown file for sharing or archiving.',
  },
];

export const FeaturesModal: React.FC<FeaturesModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={(_e, data) => onOpenChange(data.open)}>
      <DialogSurface className={styles.surface}>
        <div className={styles.header}>
          <DialogTitle className={styles.title}>Features</DialogTitle>
          <Button
            appearance="subtle"
            icon={<Dismiss24Regular />}
            onClick={() => onOpenChange(false)}
            aria-label="Close features"
          />
        </div>
        <DialogBody>
          <DialogContent className={styles.content}>
            <ul className={styles.list}>
              {features.map((f) => (
                <li key={f.title} className={styles.item}>
                  <span className={styles.icon}>{f.icon}</span>
                  <div>
                    <span className={styles.featureTitle}>{f.title}</span>
                    <span className={styles.separator}> — </span>
                    <span className={styles.description}>{f.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions className={styles.actions}>
            <Button appearance="primary" onClick={() => onOpenChange(false)}>Close</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
