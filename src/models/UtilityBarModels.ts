interface SelectOption {
  value: string;
  label: string;
}

interface UtilityBarConfig {
  selectOptions: SelectOption[];
  buttonConfig?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}
