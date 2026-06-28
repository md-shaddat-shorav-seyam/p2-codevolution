export type AlertVariant = "default" | "destructive" | "warning";

export interface AlertConfig {
  readonly title: string;
  readonly description: string;
  readonly variant: AlertVariant;
  readonly duration: number;
}

export interface UseAlertOptions {
  initialConfig?: Partial<AlertConfig>;
}

export interface UseAlertReturn {
  isVisible: boolean;
  alertConfig: AlertConfig;
  show: (overrides?: Partial<AlertConfig>) => void;
  dismiss: () => void;
}

export interface CounterAlertProps {
  isVisible: boolean;
  config: AlertConfig;
  onDismiss?: () => void;
}
